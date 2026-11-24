import { describe, it, expect } from 'bun:test';
import { GameCoordinator } from '../game-coordinator';
import type { Deck } from '../types';

/*
  Behaviours to test (so far):
   - When both get blackjack, the dealer wins after the first 2 card draws
   - When the player gets blackjack, the player wins if the dealer does not have blackjack after the first 2 card draws
*/

describe('GameCoordinator', () => {
    it('finishes the game and makes the dealer winner if both get blackjack', () => {
        // Given
        const deck: Deck = [{ suit: 'HEARTS', value: 'A' }, { suit: 'CLUBS', value: 'A' }, { suit: 'DIAMONDS', value: 'A' }, { suit: 'SPADES', value: 'A' }];
        const gameCoordinator = new GameCoordinator(deck);

        // When
        const result =gameCoordinator.startGame();

        // Then
        expect(result).toBe('dealer');
    });
});