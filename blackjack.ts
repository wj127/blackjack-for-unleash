import type { Card, Deck } from "./types";
import { Player } from "./player";

export class BlackJack {
  private deck: Deck;
  private player: Player;
  private dealer: Player;

  constructor(deck: Deck, playerName: string = "Player") {
    this.deck = deck;
    this.player = new Player(this.deck.splice(0, 2), playerName);
    this.dealer = new Player(this.deck.splice(0, 2), "Dealer");
  }

  game() {
    const result = this.startGame();
    if (result !== "continue") return result;
    return this.restOfGame();
  }

  private startGame() {
    const playerHand = this.player.getHandValue();
    const dealerHand = this.dealer.getHandValue();

    if (playerHand === 21 && dealerHand === 21) return "dealer";
    if (playerHand === 21 && dealerHand !== 21) return "player";
    if (playerHand < 21 && dealerHand > 21) return "player";
    if (playerHand > 21 && dealerHand < 21) return "dealer";
    if (playerHand < 21 && dealerHand === 21) return "dealer";
    return "continue";
  }

  private restOfGame() {
    this.drawTurn(this.player, 17);
    if (this.player.getHandValue() > 21) return "dealer";
    if (this.dealer.getHandValue() > this.player.getHandValue())
      return "dealer";

    this.drawTurn(this.dealer, this.player.getHandValue() + 1);
    if (this.dealer.getHandValue() > 21) return "player";
    return "dealer";
  }

  private drawTurn(player: Player, targetToDraw: number) {
    while (player.getHandValue() < targetToDraw) {
      const cardFromDeck: Card | undefined = this.deck.shift();
      if (!cardFromDeck) throw new Error("No card from deck");
      player.setCardToHand(cardFromDeck);
    }
  }

  getPlayer() {
    return this.player;
  }

  getDealer() {
    return this.dealer;
  }
}
