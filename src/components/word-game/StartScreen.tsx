// src/components/word-game/StartScreen.tsx

import { Button } from "@/components/ui/button"

interface StartScreenProps {
  onStart: () => void
  gameTitle: string
}

export function StartScreen({ onStart, gameTitle }: StartScreenProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">{gameTitle}</h1>
      <p className="text-xl mb-6 text-muted-foreground">a word association game</p>
      <p className="text-xl mb-6">Test your wordsmith skills!</p>
      <Button onClick={onStart} size="lg" className="mt-4">
        Start Game
      </Button>
    </div>
  )
}
