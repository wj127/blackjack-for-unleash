import type { Card, Deck } from './types';
import { Player } from './player';

export class BlackJack {
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
        this.drawTurn(this.player, 17);
        if (this.player.getHandValue() > 21) return 'dealer';
        if (this.dealer.getHandValue() > this.player.getHandValue()) return 'dealer';

        this.drawTurn(this.dealer, this.player.getHandValue());
        if (this.dealer.getHandValue() > 21) return 'player';
        return 'dealer';
    }

    private drawTurn(player: Player, targetToDraw: number) {
        while (player.getHandValue() < targetToDraw) {
            const cardFromDeck: Card | undefined = this.deck.shift();
            if (!cardFromDeck) throw new Error('No card from deck');
            player.setCardToHand(cardFromDeck);
        }
    }
}