// src/components/word-game/GameOver.tsx

import { Button } from "@/components/ui/button"

interface GameOverProps {
  score: number
  onRestart: () => void
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="text-lg mb-4">
        Your final score: <span className="font-semibold text-primary">{score}</span>
      </p>
      <Button onClick={onRestart}>Play Again</Button>
    </div>
  )
}