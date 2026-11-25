import { DeckSchema } from './types';
import { BlackJack } from './blackjack';
import { formatHand } from './constants';

async function getDeck() {
    const args = process.argv.slice(2);
    const response = await fetch(args?.[0] ?? 'https://sandbox.getunleash.io/blackjack/shuffle');
    if (!response.ok) {
        throw new Error(`Failed to get deck: ${response.statusText}`);
    }
    return DeckSchema.parse(await response.json());
}

function getPlayerName() {
    const args = process.argv.slice(2);
    return args?.[1] ?? 'Player';
}

export async function main() {
    const deck = await getDeck();
    const playerName = getPlayerName();
    const blackjack = new BlackJack(deck, playerName);
    const winner = blackjack.game();
    const winnerName = winner === 'player' ? blackjack.getPlayer().getName() : blackjack.getDealer().getName();
    const dealerHand = formatHand(blackjack.getDealer().getHand());
    const playerHand = formatHand(blackjack.getPlayer().getHand());

    console.log(`
        Winner: ${winnerName}\n\n
        Dealer | ${blackjack.getDealer().getHandValue()} | ${dealerHand}\n
        Player | ${blackjack.getPlayer().getHandValue()} | ${playerHand}
    `);
}

main();
