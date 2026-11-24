import type { Deck } from './types';

export class GameCoordinator {
    private deck: Deck;

    constructor(deck: Deck) {
        this.deck = deck;
    }

    startGame() {
        const playerHand = this.deck.slice(0, 2);
        const dealerHand = this.deck.slice(2, 4);

        if (playerHand.every(card => card.value === 'A') && dealerHand.every(card => card.value === 'A')) {
            return 'dealer';
        }
    }
}