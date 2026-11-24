# BQ

Flashcards for practising behavioural interview questions for IT jobs in New Zealand. Plain HTML + CSS + JavaScript, nothing to install.

## Usage

Open `index.html` in a browser.

- `login.html`: sign in (account is created in the Supabase dashboard; sign-ups are disabled)
- `index.html`: all questions as cards. Click a card to view the answer. "Start Practice" opens flip-card mode (click or <kbd>Space</kbd> to flip, arrow keys to move).
- `add.html`: add, edit and delete questions; export / import a JSON backup.

## Files

- `config.js`: Supabase project URL and publishable key
- `app.js`: shared code (login check, database read / write)
- `style.css`: styles

Questions are stored in a Supabase (PostgreSQL) table `bq_cards`, so every device sees the same data after signing in. Row level security only lets signed-in users read or write it. "Export backup" downloads a JSON copy.
