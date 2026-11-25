import type { Card, Deck } from './types';
import { CARD_VALUE_TO_NUMBER_MAP } from './constants';

export class Player {
    private hand: Deck;
    private name: string;
    
    constructor(hand: Deck, name: string) {
        this.hand = hand;
        this.name = name;
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

    getName() {
        return this.name;
    }
}