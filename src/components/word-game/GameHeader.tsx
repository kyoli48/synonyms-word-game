// src/components/word-game/GameHeader.tsx

import { Clock, Trophy, Star } from "lucide-react"

interface GameHeaderProps {
  timeLeft: number
  score: number
  streak: number
  title: string
}

export function GameHeader({ timeLeft, score, streak, title }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-secondary">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-1 text-gray-500" />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 mr-1 text-yellow-500" />
          <span>{score}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 mr-1 text-orange-500" />
          <span>{streak}</span>
        </div>
      </div>
    </div>
  )
}
