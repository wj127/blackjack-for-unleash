import { DeckSchema } from './types';

async function getDeck() {
    const args = process.argv.slice(2);
    const response = await fetch(args?.[0] ?? 'https://sandbox.getunleash.io/blackjack/shuffle');
    if (!response.ok) {
        throw new Error(`Failed to get deck: ${response.statusText}`);
    }
    return DeckSchema.parse(await response.json());
}


async function main() {
    const deck = await getDeck();
    console.log(deck);
}

main();
