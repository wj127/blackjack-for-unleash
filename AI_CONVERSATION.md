# Blackjack game flow explanation
_Exported on 25/11/2026 at 16:00:56 WET from Cursor (3.32.4)_

---

**User**

Given this technical test I need to implement, I need you to please explain me the game flow described here with richer examples, as I haven't ever played Black Jack before, and it is key for me to understand how this works in order to get the behaviour and its requirements. DO NOT give me any solution, just go trhough the flow as if you were teaching me how to play and the possible scenarios. Don't exceed in your response

---

**Cursor**

I'll read the technical test and walk through the game flow with examples, without proposing an implementation.

This version is a short, scripted blackjack. There are two hands — yours (the sample calls you Ivar) and the Dealer’s — and one pass through a fixed deck. Nobody chooses to hit or stand. Both sides follow fixed rules.

## What a card is worth

Number cards are worth their number. J, Q, and K are each worth 10. An ace is always 11. There is no “ace can be 1” rule here, so two aces are 22.

A hand’s score is the sum of its cards. Over 21 is a bust, and a bust loses.

## How one round is dealt

Cards come off the deck in order. You take the first two. The dealer takes the next two. After that, only the person whose turn it is draws.

**Blackjack** means exactly 21 with those first two cards, and only then. Ace plus a 10, J, Q, or K is blackjack (11 + 10). A 21 made with three or more cards is just a score of 21.

Check the opening hands before anyone draws more:

- Neither hand is blackjack: play continues.
- Both are blackjack: the dealer wins. This is the only opening tie the rules call out, and the dealer takes it.
- Only one hand is blackjack: that round does not continue into the hit phase. The rules only say what happens when neither side has it, or when both do.

## Your turn

If the opening check says the round continues, you draw until your score is **17 or more**. You stop at 17, 18, 19, 20, or 21. You do not choose.

- You are dealt 10 and 6 (16). 16 is under 17, so you draw a 3 and reach 19. You stop.
- You are dealt 10 and 9 (19). You already have 17 or more, so you draw nothing.
- You are dealt 10 and 6, then a king. 16 + 10 = 26. You bust and lose immediately. The dealer does not draw, even if the dealer’s two cards would also have busted.

## The dealer’s turn

The dealer plays only if you have not busted. The dealer is not aiming for 17. The dealer draws until their score is **strictly higher than yours**, or until they bust.

- You have 18. Dealer has 10 and 9 (19). 19 is already higher, so the dealer stands and wins.
- You have 19. Dealer has 10 and 7 (17). 17 is not higher, so the dealer draws a 3, reaches 20, and wins.
- You have 19. Dealer has 10 and 7 (17), then draws a king. 27 busts. You win. That is the sample in the test: your hand is 2 + 2 + 6 + 9 = 19, the dealer’s is 7 + 10 + 10 = 27.

A tie is not a win for the dealer. If you both have 18, the dealer must draw again. The next card either puts them ahead or busts them. The same applies at 20–20, or if you have 21 with three or more cards and the dealer also reaches 21: equal is not “higher,” so the dealer draws and any further card busts them.

## Putting a full hand together

Deck, from the top: 5♥, 6♣, K♠, 9♦, 8♠, 3♥, A♣.

1. You get 5♥ and 6♣ (11). The dealer gets K♠ and 9♦ (19).
2. Nobody has blackjack.
3. You have 11, so you draw 8♠ (19) and stop.
4. The dealer has 19, which is not higher than 19, so they draw 3♥ (22) and bust.
5. You win. The leftover A♣ is never used.

Same idea if you bust on the way: you stop drawing the moment you pass 21, the dealer never touches their extra cards, and you lose.

---

**User**

two questions arise from your explanation:
1- Does the user have precedence over the dealer in the turns? I mean, at the very begiining, is it always the user who starts drawing?
2- let say at the begiining the user got a 5♥ and 6♣ (11) and the dealer got K♠ and K♠ (20). Nobody has blackjack. The user has 11, so it draws 8♠ (19) and stop. The dealer has 20 which is higher already, does the dealer win inmediately?

---

**Cursor**

Yes to both. The player always acts first, and a dealer who is already ahead when their turn starts wins without drawing another card.

**1. The player always goes first.**

The opening deal is two cards to you, then two cards to the dealer. If neither hand is blackjack, you keep drawing until you reach 17 or more, or you bust. The dealer does not draw again until your turn is over. If you bust, the dealer never plays.

**2. The dealer wins that hand without drawing.**

You finish on 19. The dealer already has 20 from the opening two cards. Their rule is to draw only while they are not strictly ahead of you. 20 is already higher than 19, so they stand and win. The 8♠ you drew happened on your turn, before that check.

---

**User**

One more question, regarding blackjack and the deck: is there any fixed number of cards in the deck, or is it random?

---

**Cursor**

The rules never fix a deck size. I’ll check what the shuffle endpoint actually returns so the answer matches the test, not a standard casino deck.

The rules never fix a deck size. The deck is whatever JSON list the URL returns, and you draw from the front of that list until the round ends. Leftover cards are never used.

The default shuffle URL, `https://sandbox.getunleash.io/blackjack/shuffle`, returned a normal 52-card deck when fetched just now: 13 ranks in each of the 4 suits, in a shuffled order. So on that endpoint the count looks fixed and the order is what changes. Because the program must also accept any other URL, a deck you are given could be shorter or longer than 52. A hand only needs the cards actually drawn, usually a handful, so the length only matters if the list runs out before the round is finished.

---

**User**

I don't care about the endpoint, I care about the BlackJack game itself. Is there any rule for the length of the deck or is it randomised? 

---

**Cursor**

In blackjack itself, the deck length is fixed. Shuffling randomizes the order of the cards, not how many there are.

A single deck is always 52 cards: 13 ranks (2 through 10, J, Q, K, A) in each of 4 suits, one of each card. Casinos often put several of those decks together (commonly 6 or 8), but that total is still a fixed number, then shuffled. One round only uses a few cards from the top. The rest stay in the shoe.

This test does not add a rule that changes that. It never says the length varies, and it never says to build a random-sized deck. You play whatever list of cards you were given, drawing from the front until the round ends.

---

**User**

Another question: let say neither the player nor dealer had blackjack, then the player starts drawing until it gets 17. Next the dealer starts drawing until it gets 18. Again, it's turn for the player and...the cycle repeats in the way that the player now has to draw and get hiher than the dealer's (in this case 19), and so on?

---

**Cursor**

No. Each side draws once, then the round is over. There is no second turn and no cycle.

After the opening four cards, if nobody has blackjack:

1. You draw until your score is 17 or more, or you bust.
2. If you bust, you lose and the dealer never draws again.
3. If you stopped on 17–21, the dealer draws until their score is strictly higher than yours, or they bust.
4. The round ends on that result. You do not draw again to chase the dealer.

The dealer is not aiming for 18. They are aiming to beat whatever you finished on. If you stop on 20, they need 21 or they bust. If they already have 19 and you have 18, they stand and win without taking another card.

---

**User**

Oooohhh okay, I see now...so could we say that if the dealer beats you (scores higher than you without busting) it wins? otherwise the player wins becuase the dealer busted?

---

**Cursor**

Yes, for the dealer's turn. Once you have stopped on 17–21, the dealer either finishes strictly ahead of you and wins, or goes over 21 and you win. They are not allowed to stop on a tie, so that turn has no third result.

Two earlier exits never reach that comparison:

- You go over 21 on your own turn. You lose immediately, and the dealer does not draw.
- Both opening hands are blackjack. The dealer wins that tie even though the scores are equal.

---

**User**

Awesome thank you! I've now added all I can think from the domain behaviour I've understood from your explanations and from the PDF of the technical test. You can see the logic in @blackjack.ts  and @tests/blackjack.spec.ts . However I'd like you to analyse and tell me if I might have slipped any critical edge case away. Also feel free to run some mutation testing to my tests to find any other potential bug or bad written test/code. DO NOT modify the code, just analyse and tell me. DO NOT give me the solution, explain the issue to me

---

**Cursor**

I'll read the game logic and tests first, then run mutation testing to see which behaviors your tests actually lock in.

The rules and the tests don’t line up in a few places. I’ll run the suite, then mutate the decision points to see which of those cases the tests actually catch.

The suite is green (10 passing), but two rules produce the wrong winner, and several tests stay green even when the rule they describe is broken.

## A tie is awarded to the dealer

The dealer is supposed to keep drawing until their score is strictly higher than yours, or they go over 21. In `drawTurn` the loop stops as soon as a hand is no longer below its target, and the dealer’s target is your score.

```39:44:blackjack.ts
    private drawTurn(player: Player, targetToDraw: number) {
        while (player.getHandValue() < targetToDraw) {
            const cardFromDeck: Card | undefined = this.deck.shift();
            if (!cardFromDeck) throw new Error('No card from deck');
            player.setCardToHand(cardFromDeck);
        }
    }
```

So the dealer stops on an equal score. `restOfGame` then returns `'dealer'` for every result that is not over 21, including that tie.

Concrete hand: you are dealt 10 and 8 (18), the dealer is dealt 10 and 6 (16), and the next cards are 2, then K. The dealer takes the 2 and reaches 18. That is not higher than you, so the rules say they must take the K, land on 28, and lose. The code stops on 18 and the dealer wins. The same thing happens when the first four cards are already tied at 18 and a K is waiting: the dealer never takes it.

I changed the dealer so they continue drawing on a tie, and I also changed a tie so that it returns you as the winner. All 10 tests still passed. None of the decks you built ever leaves the two scores equal.

## The same dealt hand has two winners

`startGame` and `restOfGame` do not agree when the dealer has already busted on the opening two cards.

You are dealt 10 and 7 (17). The dealer is dealt two aces (22). `startGame` returns `'player'`, because you are under 21 and the dealer is over it. `restOfGame` on that same hand returns `'dealer'`. After you stand, this check runs before any bust check:

```31:32:blackjack.ts
        if (this.player.getHandValue() > 21) return 'dealer';
        if (this.dealer.getHandValue() > this.player.getHandValue()) return 'dealer';
```

22 is higher than 17, so the dealer wins. A busted total satisfies “higher score,” and the later check that treats a score over 21 as a loss never runs. Your tests call the two methods on different decks, so they never see one hand produce both answers.

## Opening totals that `startGame` does not finish

These four comparisons are the whole opening decision:

```22:26:blackjack.ts
        if (playerHand === 21 && dealerHand === 21) return 'dealer';
        if (playerHand === 21 && dealerHand !== 21) return 'player';
        if (playerHand < 21 && dealerHand > 21) return 'player';
        if (playerHand > 21 && dealerHand < 21) return 'dealer';
        return 'continue';
```

A dealer whose opening hand is exactly 21, while yours is not, matches none of them. You are dealt 10 and 7 (17) and the dealer is dealt A and K (21): `startGame` returns `'continue'`. The rules only send the round into the hit phase when neither hand is blackjack. This one is.

Two more opening hands also fall through to `'continue'`: both players dealt two aces (22 against 22), and you dealt two aces while the dealer has A and K (22 against 21). The bust comparisons require the other hand to be strictly under 21, so exactly 21 and a second bust both miss. Calling `restOfGame` afterwards does return the dealer, because your bust is noticed there. The opening method itself still says the round is undecided.

## What the tests fail to lock

The parts that did hold: standing on 17 is real. Lowering the player’s stop to 16, and raising it to 18, both failed the suite.

These changes did not fail a single test:

- The dealer keeps drawing when the scores are equal. Described above.
- Drawing one card per turn instead of looping. Every current deck needs at most one extra card per person. A hand such as 2 and 3, followed by 4, 4, 4, is legal play and is invisible to the suite. The loop handles that hand today; the tests would not notice if it stopped after the first hit.
- A score of exactly 21 counts as a bust for the dealer. No tested hand lands on 21 during the hit phase. Your own hit from 16 to 21, with the dealer on 20 and a 5 still in the deck, is also untested: the dealer has to beat 21, takes the 5, busts, and you win. That path is in the code and in none of the tests.
- After you bust, the dealer still plays, and if the dealer also busts you win. The existing bust test stayed green. Its leftover card is a 2, which takes the dealer from 16 to 18, so the dealer never busts in that deck. The rule you care about is “you lose a bust no matter what the dealer does.” This deck cannot tell those two rules apart.
- J, Q, and 10 are worth something other than 10. The tests only use K for a face card. Changing J to 11, Q to 1, or 10 to 1 left the suite green.

---

**User**

I want to SpyOn the BlackJack object, so I can inspect and tweak the instance inside @index.ts:23 from my tests in @tests/index.spec.ts:14 but I have forgotten how to do it, can you enlight me?

---

**Cursor**

I’ll look at how `index.ts` constructs `BlackJack` and how the test is set up, so the spy matches that instance.

`spyOn(BlackJack, "game")` spies a static `BlackJack.game`. The call at line 23 is `blackjack.game()`, and that method lives on `BlackJack.prototype`, so the instance never hits the spy you created.

Spy the prototype and keep the return value:

```ts
const game = spyOn(BlackJack.prototype, "game");

await expect(main()).rejects.toThrow("No deck found");

expect(game).not.toHaveBeenCalled();
```

Every `new BlackJack()` shares that prototype, including the one `main` creates. `mockReturnValue("player")` or `mockImplementation(...)` changes what `game()` does for that instance.

To inspect the instance, use a normal function so `this` is the object from line 23. An arrow function has no `this`.

```ts
const game = spyOn(BlackJack.prototype, "game").mockImplementation(function (this: BlackJack) {
  const player = this.getPlayer();
  return "player";
});

await main();

const blackjack = game.mock.contexts[0];
```

`const blackjack` inside `main` is local, so the test cannot name it. `game.mock.contexts[0]` is that same object, available once `game()` has run.

In this test `getDeck()` throws before line 23, so no instance exists and `contexts` stays empty. The assertion you can make here is that `game` was not called.

Restore the prototype in `afterEach`. `jest.clearAllMocks()` only wipes the call history; the spy stays installed.

```ts
afterEach(() => {
  game.mockRestore();
});
```

---

**User**

I'm also having trouble mocking the DeckSchema's parse method @tests/index.spec.ts:112-118 I've tried all the ways I can recall, but without success

---

**Cursor**

The parse spy is likely bound to a different `DeckSchema` than the one `main` calls. I’ll trace both imports and the mock setup.

`spyOn` never reaches the `parse` that `main` calls. The test stops on line 117 with this error:

```text
spyOn(target, prop) does not support accessor properties yet
```

Zod defines `parse` as a getter on the schema prototype, not as a normal method. Bun's `spyOn` only replaces ordinary methods, so `spyOn(DeckSchema, "parse")` throws before `main()` runs. That is also why `mockReturnValue` never takes effect.

`mock.module("./types", ...)` misses for a different reason. That specifier is resolved from `tests/index.spec.ts`, so it refers to `tests/types.ts`. `index.ts` imported the schema with `./types` from the project root, which is `../types` from the test. The real `DeckSchema.parse` stays in place, receives `{}` from your fetch mock, and rejects it.

Use one of these, not both.

Replace the getter on the shared schema object. This is the same object `index.ts` holds:

```ts
Object.defineProperty(DeckSchema, "parse", {
  configurable: true,
  value: () => deck,
});
```

`delete (DeckSchema as { parse?: unknown }).parse` in `afterEach` removes that own property and exposes Zod's getter again. `mock.restore()` does not undo a `defineProperty`.

Or replace the module `index.ts` already loaded. The specifier has to be the file the test would import:

```ts
mock.module("../types", () => ({
  DeckSchema: {
    parse: () => deck,
  },
}));
```

Call `mock.restore()` in `afterEach`. Left in place, this fake schema is what the later tests validate against.

