import { describe, it, expect, afterEach, spyOn, afterAll, mock } from "bun:test";
import { main } from "../index";
import { BlackJack } from "../blackjack";
import type { Deck } from "../types";
import { ZodError } from "zod";

/* Implementation details test that add value */

describe('main', () => {
    let gameSpy: ReturnType<typeof spyOn>;

    afterEach(() => {
        if (gameSpy) gameSpy.mockRestore();
        spyOn(globalThis, "fetch").mockRestore();
    });

    afterAll(() => {
        mock.restore();
    });

    it("should not allow to start a game without a deck throwing an error", async () => {
        // Given
        spyOn(globalThis, "fetch").mockRejectedValue(new Error('No deck found'));
        const gameSpy = spyOn(BlackJack.prototype, "game");
        // When - Then
        await expect(main()).rejects.toThrow('No deck found');
        expect(gameSpy).not.toHaveBeenCalled();
    });

    it("should not allow to start a game if the response is not ok", async () => {
        // Given
        spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
            statusText: 'Not found',
        } as unknown as Response);
        const gameSpy = spyOn(BlackJack.prototype, "game");

        // When - Then
        await expect(main()).rejects.toThrow('Failed to get deck: Not found');
        expect(gameSpy).not.toHaveBeenCalled();
    });

    it("should not allow to start a game if the deck is invalid", async () => {
        // Given
        spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({} as unknown as Deck),
        } as unknown as Response);
        const gameSpy = spyOn(BlackJack.prototype, "game");
        const zodError = new ZodError([{
            expected: "array",
            code: "invalid_type",
            path: [],
            message: "Invalid input: expected array, received object",
        }]);

        // When - Then
        await expect(main()).rejects.toThrow(zodError);
        expect(gameSpy).not.toHaveBeenCalled();
    });

    it("should not allow to start a game if the deck does not contain at least 52 cards", async () => {
        // Given
        spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([{
                value: 'A',
                suit: 'HEARTS',
            }] as unknown as Deck),
        } as unknown as Response);
        const gameSpy = spyOn(BlackJack.prototype, "game");
        const zodError = new ZodError([{
            origin: "array",
            code: "too_small",
            minimum: 52,
            inclusive: true,
            exact: true,
            path: [],
            message: "Too small: expected array to have exactly 52 items",
        }]);

        // When - Then
        await expect(main()).rejects.toThrow(zodError);
        expect(gameSpy).not.toHaveBeenCalled();
    });

    it("should run the game successfully", async () => {
        const deck = [{
            value: 'A',
            suit: 'HEARTS',
        },
        {
            value: 'K',
            suit: 'HEARTS',
        },
        {
            value: 'Q',
            suit: 'HEARTS',
        },
        {
            value: 'J',
            suit: 'HEARTS',
        },
        {
            value: '10',
            suit: 'HEARTS',
        },
        {
            value: '9',
            suit: 'HEARTS',
        },
    ];
        // Given
        mock.module('../types', () => ({
            DeckSchema: {
                parse: () => deck as Deck,
            },
        }));
        spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        } as unknown as Response);
        const gameSpy = spyOn(BlackJack.prototype, "game");
        gameSpy.mockReturnValue('player');
        const consoleSpy = spyOn(globalThis.console, "log");

        // When
        await main();

        // Then
        expect(gameSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`
        Winner: Player\n\n
        Dealer | 20 | HQ, HJ\n
        Player | 21 | HA, HK`));
    });
});