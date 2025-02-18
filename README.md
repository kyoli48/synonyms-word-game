# Synonyms - Adjective Association Game

## Description

Synonyms is a fast-paced, brain-teasing adjective association game built with Next.js and TypeScript. Players have 60 seconds to uncover as many synonyms as they can for given words. The more synonyms found for each word, the higher the streak and score!

## Features

- Random adjective generation using Faker.js
- Synonym validation using the Merriam-Webster Thesaurus API
- Real-time scoring and streak tracking
- Responsive design with Tailwind CSS
- Toast notifications for game events

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Merriam-Webster Thesaurus API
- Faker.js

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/kyoli48/synonyms-word-game.git
   cd synonyms-game
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Merriam-Webster API key:
   ```
   NEXT_PUBLIC_MW_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## How to Play

1. Click "Start Game" on the welcome screen.
2. You'll be presented with a random adjective.
3. Type in synonyms for the given word and click "Add" or press Enter.
4. If the synonym is valid, you'll earn points and increase your streak.
5. If you can't think of any more synonyms, click "Skip Word" to get a new word.
6. The game ends after 60 seconds.
7. Try to get the highest score possible!

## Deployment

This app can be easily deployed to platforms like Vercel or Netlify. Make sure to set up the `MW_API_KEY` environment variable in your deployment settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Merriam-Webster for providing the Thesaurus API

