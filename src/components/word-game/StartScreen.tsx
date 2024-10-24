// src/components/word-game/StartScreen.tsx

import { Button } from "@/components/ui/button"

interface StartScreenProps {
  onStart: () => void
  gameTitle: string
}

export const StartScreen = ({ onStart, gameTitle }: StartScreenProps) => {
  const handleStart = () => {
    onStart()
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">
        Welcome to <span className="italic">{gameTitle}</span>
      </h1>
      <p className="text-lg mb-6 text-muted-foreground">the fast-paced, brain-teasing adjective association game</p>
      <p className="text-xl mb-6">Sharpen your vocabulary, connect descriptive words, and show off your inner wordsmith in this fun and addictive game.</p>
      <Button 
        onClick={handleStart} 
        size="lg" 
        className="mt-4"
        aria-label={`Start ${gameTitle} game`}
      >
        Start Game
      </Button>
    </div>
  )
}
