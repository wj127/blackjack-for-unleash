# blackjack-for-unleash

This is a bun porject. If you want to quickly run the Game without downloading Bun and install anythin, run the copiled executable:

```bash
./blackjack-game "<optional_url>" "<optional_player_name>" # at that order
```

Otherwise make sure you have Bun installed an

```bash
# Install dependencies
bun install

# To run alone
bun run index.ts

# To run with args, at that order
bun run index.ts "optionalUrl" "optionalPlayerName"

# To run tests
bun test
```

---

## Things to mention

1. The code has been entirely written by me, but with the help of autocompletion, which if it were not by it, things like creating the ZodError instance would have been very difficult not to ask AI or research quickly over internet, as is code that I barely write nowadays and delegate. Having said so, I only used AI for what you saw on the *AI_CONVERSATION.md* file, for nothing else and no other tool outside of Cursor. It's within my personal ETHOS to be honest and sincere.
2. I only used the internet once to research ofitial documentation for Bun's built-in test engine, since I always wanted to use it, so I took the chance here.
3. I focused entirely on the Game Behaviour and in making it the most reliable, readable and evolvable as possible. I left behind some other things that would have been only fancy flourishes, like `console.error` instead of throwing, checking program args order, etc...
4. While I don't want this to feel like an excuse at all, please bear in mind that at the time of writing this task I am sick, which might have contributed to not produce a clearer outcome for the code execution. I apologise in advance.

Thank you for the opportunity, and whereas I move to next phase or not...¡it was fun!

Davis.
