import type { Card, Deck } from './types';
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
        if (playerHand < 21 && dealerHand > 21) return 'player';
        if (playerHand > 21 && dealerHand < 21) return 'dealer';
        return 'continue';
    }

    restOfGame() {
        while (this.player.getHandValue() < 17) {
            const cardFromDeck: Card | undefined = this.deck.shift();
            if (!cardFromDeck) throw new Error('No card from deck');
            this.player.setCardToHand(cardFromDeck);
        }
        if (this.player.getHandValue() > 21) return 'dealer';
        if (this.dealer.getHandValue() > this.player.getHandValue()) return 'dealer';

        while (this.dealer.getHandValue() <= this.player.getHandValue()) {
            const cardFromDeck: Card | undefined = this.deck.shift();
            if (!cardFromDeck) throw new Error('No card from deck');
            this.dealer.setCardToHand(cardFromDeck);
        }
        if (this.dealer.getHandValue() > 21) return 'player';
        return 'dealer';
    }
}