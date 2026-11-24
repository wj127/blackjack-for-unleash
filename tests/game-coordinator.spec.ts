import { describe, it, expect } from 'bun:test';
import { GameCoordinator } from '../game-coordinator';
import type { Deck } from '../types';

/*
  Behaviours to test (so far):
   - When both get blackjack, the dealer wins after the first 2 card draws ✅
   - When the player gets blackjack, the player wins if the dealer does not have blackjack after the first 2 card draws ✅
   - Edge case: what happens if any have blackjack after the first 2 card draws but either one has a higher value than 21? ✅
*/

describe('GameCoordinator', () => {
    it('finishes the game and makes the dealer winner if both get blackjack', () => {
        // Given
        const deck: Deck = [{ suit: 'HEARTS', value: 'A' }, { suit: 'CLUBS', value: 'K' }, { suit: 'DIAMONDS', value: 'A' }, { suit: 'SPADES', value: 'K' }];
        const gameCoordinator = new GameCoordinator(deck);

        // When
        const result = gameCoordinator.startGame();

        // Then
        expect(result).toBe('dealer');
    });

    it('finishes the game and makes the player winner if the player gets blackjack and the dealer does not have blackjack after the first 2 card draws', () => {
        // Given
        const deck: Deck = [{ suit: 'HEARTS', value: 'A' }, { suit: 'CLUBS', value: 'K' }, { suit: 'DIAMONDS', value: 'A' }, { suit: 'SPADES', value: '9' }];
        const gameCoordinator = new GameCoordinator(deck);

        // When
        const result = gameCoordinator.startGame();

        // Then
        expect(result).toBe('player');
    });

    it.each(['dealer', 'player'])('finishes the game and makes the %s winner if it has less than 21 but the %s has higher than 21 during the first 2 card draws ', (winner) => {
        // Given
        const deck: Deck = winner === 'player' ? [{ suit: 'HEARTS', value: 'A' }, { suit: 'CLUBS', value: '7' }, { suit: 'DIAMONDS', value: 'A' }, { suit: 'SPADES', value: 'A' }] : [{ suit: 'HEARTS', value: 'A' }, { suit: 'CLUBS', value: 'A' }, { suit: 'DIAMONDS', value: 'A' }, { suit: 'SPADES', value: '7' }];
        const gameCoordinator = new GameCoordinator(deck);

        // When
        const result = gameCoordinator.startGame();

        // Then
        expect(result).toBe(winner);
    });
});