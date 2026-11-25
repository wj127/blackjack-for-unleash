import { z } from 'zod';

const CardSchema = z.object({
    suit: z.enum(['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS']),
    value: z.enum(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']),
});

export const DeckSchema = z.array(CardSchema).length(52);

export type Card = z.infer<typeof CardSchema>;

export type Deck = z.infer<typeof DeckSchema>;