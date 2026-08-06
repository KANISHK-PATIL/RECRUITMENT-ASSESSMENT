# RECRUITMENT-ASSESSMENT
# Recruitment Assessment Portal

This is a full-stack assessment app built for Recruitment Headquarters (RHQ) as part of Round 1 - Task 2. Candidates enter their name and go through three back-to-back challenges - an aptitude quiz, a memory sequence game, and a decoding puzzle. Once they finish all three, they get a report card with their score and classification, and their result shows up on a leaderboard.

## Stack

- React (Vite) + Tailwind for the frontend
- Node/Express for the backend
- MongoDB with Mongoose
- Swagger for API docs

## Folder layout

```
backend/
  app.js
  server.js
  db.js
  swagger.js
  routes/
  controller/
  models/

frontend/
  src/
    components/
    pages/
    services/
    App.jsx
    main.jsx
    index.css
```

## Running it locally

Clone the repo, then set up the backend first:

```bash
cd backend
npm install
```

You'll need a `.env` file here (there's a `.env.example` you can copy) with:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Then:

```bash
npm start
```

Backend runs on `http://localhost:3000`.

Now the frontend, in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

This opens on `http://localhost:5173`.

## API docs

With the backend running, go to `http://localhost:3000/api-docs` - it's a Swagger page where you can see every endpoint and try them out directly, no Postman needed.

## How the assessment works

1. **Home** - candidate types their name to start.
2. **Aptitude Challenge** - 3 random questions, has to get all of them right before moving on.
3. **Memory Matrix** - 3 levels, each one longer than the last. Mess up a sequence and that level restarts.
4. **Decode Encrypted Data** - 3 ciphers to crack, hints available if you're stuck.
5. **Report** - shows the score for each stage, how long each took, and an overall classification.
6. **Leaderboard** - everyone who's completed the assessment, ranked by score first and time as the tiebreaker.

## How scoring works

Each stage requires getting everything right eventually to move forward, so the score reflects how many mistakes it took to get there rather than just pass/fail:

- Aptitude - out of 30, loses 5 points per wrong attempt
- Memory Matrix - out of 35, loses 5 points per failed level attempt
- Decode Encrypted Data - out of 35, loses 5 per wrong attempt and 2 per hint used

Total is out of 100, and maps to a classification:

- 95-100: Outstanding Candidate
- 85-94: Highly Qualified
- 70-84: Qualified Candidate
- 50-69: Developing Candidate
- Below 50: Skill Development Required
