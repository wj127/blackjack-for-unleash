import type { Card, Deck, PlayerType } from './types';
import { CARD_VALUE_TO_NUMBER_MAP } from './constants';

export class Player {
    private hand: Deck;
    private type: PlayerType;
    
    constructor(hand: Deck, type: PlayerType) {
        this.hand = hand;
        this.type = type;
    }

    setCardToHand(card: Card) {
        this.hand.push(card);
    }

    getHand() {
        return this.hand;
    }

    getHandValue() {
        return this.hand.reduce((acc, card) => acc + CARD_VALUE_TO_NUMBER_MAP[card.value], 0);
    }
}