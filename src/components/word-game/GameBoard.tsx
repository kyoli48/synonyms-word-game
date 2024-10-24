// src/components/word-game/GameBoard.tsx

"use client";

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Card, CardContent } from "@/components/ui/card"
import { INITIAL_TIME, POINTS_MULTIPLIER, WORDS, GAME_TITLE } from "@/lib/constants/game-constants"
import { GameHeader } from "./GameHeader"
import { StartScreen } from "./StartScreen"
import { GameOver } from "./GameOver"
import { SynonymInput } from "./SynonymInput"
import { SynonymList } from "./SynonymList"

export function GameBoard() {
  const [currentWord, setCurrentWord] = useState("")
  const [synonyms, setSynonyms] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0 && isGameStarted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && isGameStarted) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isGameStarted])

  const startGame = () => {
    setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)])
    setSynonyms([])
    setTimeLeft(INITIAL_TIME)
    setScore(0)
    setStreak(0)
    setIsGameOver(false)
    setIsGameStarted(true)
  }

  const handleSubmit = (inputValue: string) => {
    if (!synonyms.includes(inputValue)) {
      setSynonyms([...synonyms, inputValue])
      const newStreak = streak + 1
      setStreak(newStreak)
      const points = POINTS_MULTIPLIER * newStreak
      setScore(score + points)
      toast({
        title: `+${points} points!`,
        description: `Streak: ${newStreak}`,
        duration: 2000,
      })
    } else {
      toast({
        title: "Duplicate word!",
        description: "You've already entered this synonym.",
        variant: "destructive",
      })
    }
  }

  const skipWord = () => {
    setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)])
    setSynonyms([])
    setStreak(0)
    toast({
      title: "Word skipped",
      description: "Streak reset to 0",
      duration: 2000,
    })
  }

  const endGame = () => {
    setIsGameOver(true)
    setIsGameStarted(false)
    toast({
      title: "Game Over!",
      description: `Your final score: ${score}`,
      action: <ToastAction altText="Try again" onClick={startGame}>Try again</ToastAction>,
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <GameHeader 
        timeLeft={timeLeft} 
        score={score} 
        streak={streak} 
        title={GAME_TITLE}
      />
      <CardContent className="p-4">
        {!isGameStarted ? (
          <StartScreen onStart={startGame} gameTitle={GAME_TITLE} />
        ) : !isGameOver ? (
          <>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-4">
                Current Word: 
                <span className="text-3xl ml-2 font-bold animate-color-cycle bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">{currentWord}</span>
              </h2>
              <SynonymInput onSubmit={handleSubmit} />
            </div>
            <SynonymList synonyms={synonyms} onSkip={skipWord} />
          </>
        ) : (
          <GameOver score={score} onRestart={startGame} />
        )}
      </CardContent>
    </Card>
  )
}
