import { describe, it, expect } from "bun:test";
import { BlackJack } from "../blackjack";
import type { Deck } from "../types";

/* Behavioural tests following TDD approach */

describe("GameCoordinator", () => {
  describe("game", () => {
    it("finishes the game and makes the dealer winner if both get blackjack", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "K" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "K" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("dealer");
      expect(blackjack.getPlayer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHand()).toHaveLength(2);
      expect(blackjack.getPlayer().getHandValue()).toBe(21);
      expect(blackjack.getDealer().getHandValue()).toBe(21);
    });

    it("finishes the game and makes the player winner if the player gets blackjack and the dealer does not have blackjack after the first 2 card draws", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "K" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "9" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("player");
      expect(blackjack.getPlayer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHand()).toHaveLength(2);
      expect(blackjack.getPlayer().getHandValue()).toBe(21);
      expect(blackjack.getDealer().getHandValue()).toBeLessThan(21);
    });

    it.each(["dealer", "player"])(
      "finishes the game and makes the %s winner if it has less than 21 but the %s has higher than 21 during the first 2 card draws ",
      (winner) => {
        // Given
        const deck: Deck =
          winner === "player"
            ? [
                { suit: "HEARTS", value: "A" },
                { suit: "CLUBS", value: "7" },
                { suit: "DIAMONDS", value: "A" },
                { suit: "SPADES", value: "A" },
              ]
            : [
                { suit: "HEARTS", value: "A" },
                { suit: "CLUBS", value: "A" },
                { suit: "DIAMONDS", value: "A" },
                { suit: "SPADES", value: "7" },
              ];
        const blackjack = new BlackJack(deck);
        const winnerPlayer =
          winner === "player" ? blackjack.getPlayer() : blackjack.getDealer();
        const loserPlayer =
          winner === "player" ? blackjack.getDealer() : blackjack.getPlayer();

        // When
        const result = blackjack.game();

        // Then
        expect(result).toBe(winner);
        expect(winnerPlayer.getHand()).toHaveLength(2);
        expect(loserPlayer.getHand()).toHaveLength(2);
        expect(winnerPlayer.getHandValue()).toBeLessThanOrEqual(21);
        expect(loserPlayer.getHandValue()).toBeGreaterThan(21);
      },
    );

    it("finishes the game and makes the dealer winner if it has blackjack and the player does not have blackjack after the first 2 card draws", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "5" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "K" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("dealer");
      expect(blackjack.getPlayer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHand()).toHaveLength(2);
      expect(blackjack.getPlayer().getHandValue()).toBeLessThan(21);
      expect(blackjack.getDealer().getHandValue()).toBe(21);
    });

    it("continues the game if neither have blackjack after the first 2 card draws", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "5" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "5" },
        { suit: "HEARTS", value: "2" },
        { suit: "CLUBS", value: "3" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "A" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      blackjack.game();

      // Then
      expect(blackjack.getPlayer().getHand().length).toBeGreaterThan(2);
      expect(blackjack.getDealer().getHand().length).toBeGreaterThan(2);
    });

    it("finishes the game and makes the dealer winner if the player draws over 21", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "5" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "5" },
        { suit: "HEARTS", value: "6" },
        { suit: "CLUBS", value: "2" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("dealer");
      expect(blackjack.getPlayer().getHand().length).toBeGreaterThan(2);
      expect(blackjack.getPlayer().getHandValue()).toBeGreaterThan(21);
      expect(blackjack.getDealer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHandValue()).toBeLessThanOrEqual(21);
    });

    it("finishes the game if the dealer draws higher than the player and makes it the winner", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "6" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "6" },
        { suit: "CLUBS", value: "2" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("dealer");
      expect(blackjack.getPlayer().getHand()).toHaveLength(2);
      expect(blackjack.getPlayer().getHandValue()).toBeLessThanOrEqual(21);
      expect(blackjack.getDealer().getHand().length).toBeGreaterThan(2);
      expect(blackjack.getDealer().getHandValue()).toBeGreaterThanOrEqual(
        blackjack.getPlayer().getHandValue(),
      );
    });

    it("finishes the game and makes the player winner if the dealer draws over 21", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "5" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "5" },
        { suit: "HEARTS", value: "2" },
        { suit: "CLUBS", value: "6" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("player");
      expect(blackjack.getPlayer().getHand().length).toBeGreaterThanOrEqual(2);
      expect(blackjack.getDealer().getHand().length).toBeGreaterThan(2);
      expect(blackjack.getPlayer().getHandValue()).toBeLessThan(21);
      expect(blackjack.getDealer().getHandValue()).toBeGreaterThan(21);
    });

    it("finishes the game and makes the dealer winner if the dealer already has a higher value than the player after the first 2 card draws", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "6" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "8" },
      ];
      const blackjack = new BlackJack(deck);

      // When
      const result = blackjack.game();

      // Then
      expect(result).toBe("dealer");
      expect(blackjack.getPlayer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHand()).toHaveLength(2);
      expect(blackjack.getDealer().getHandValue()).toBeGreaterThan(
        blackjack.getPlayer().getHandValue(),
      );
    });

    it("throws an error if there are no more cards in the deck", () => {
      // Given
      const deck: Deck = [
        { suit: "HEARTS", value: "A" },
        { suit: "CLUBS", value: "6" },
        { suit: "DIAMONDS", value: "A" },
        { suit: "SPADES", value: "4" },
      ];
      const blackjack = new BlackJack(deck);

      // When - Then
      expect(() => blackjack.game()).toThrow("No card from deck");
    });
  });
});
