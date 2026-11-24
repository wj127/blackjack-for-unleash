import type { Deck } from './types';
import { Player } from './player';

export class GameCoordinator {
    private deck: Deck;
    private player: Player;
    private dealer: Player;

    constructor(deck: Deck) {
        this.deck = deck;
        this.player = new Player(this.deck.splice(0, 2), 'player');
        this.dealer = new Player(this.deck.splice(0, 2), 'dealer');
    }

    startGame() {
        const playerHand = this.player.getHandValue();
        const dealerHand = this.dealer.getHandValue();

        console.log('playerHand', playerHand, 'dealerHand', dealerHand);
        

        if (playerHand === 21 && dealerHand === 21) return 'dealer';
        if (playerHand === 21 && dealerHand !== 21) return 'player';
    }
}