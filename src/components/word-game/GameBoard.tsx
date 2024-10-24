// src/components/word-game/GameBoard.tsx

"use client";

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Card, CardContent } from "@/components/ui/card"
import { INITIAL_TIME, POINTS_MULTIPLIER, GAME_TITLE } from "@/lib/constants/game-constants"
import { GameHeader } from "./GameHeader"
import { StartScreen } from "./StartScreen"
import { GameOver } from "./GameOver"
import { SynonymInput } from "./SynonymInput"
import { SynonymList } from "./SynonymList"
import { fetchRandomWord, validateSynonym } from "@/services/dictionaryApi"
import { Footer } from "@/components/layout/Footer"

export function GameBoard() {
  const [currentWord, setCurrentWord] = useState("")
  const [synonyms, setSynonyms] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const { toast } = useToast()

  const startGame = useCallback(async () => {
    try {
      const newWord = await fetchRandomWord()
      setCurrentWord(newWord)
      setSynonyms([])
      setTimeLeft(INITIAL_TIME)
      setScore(0)
      setStreak(0)
      setIsGameOver(false)
      setIsGameStarted(true)
    } catch (error) {
      console.error('Error starting game:', error)
      toast({
        title: "Error starting game",
        description: "Failed to fetch a random word. Please try again.",
        variant: "destructive",
      })
    }
  }, [toast])

  const endGame = useCallback(() => {
    setIsGameOver(true)
    setIsGameStarted(false)
    toast({
      title: "Game Over!",
      description: `Your final score: ${score}`,
      action: <ToastAction altText="Try again" onClick={startGame}>Try again</ToastAction>,
      duration: 10000, // 10 seconds
    })
  }, [score, toast, startGame])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0 && isGameStarted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && isGameStarted) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isGameStarted, endGame])

  const handleSubmit = async (inputValue: string) => {
    if (!synonyms.includes(inputValue)) {
      try {
        const isValid = await validateSynonym(currentWord, inputValue);
        if (isValid) {
          setSynonyms([...synonyms, inputValue]);
          const newStreak = streak + 1;
          setStreak(newStreak);
          const points = POINTS_MULTIPLIER * newStreak;
          setScore(score + points);
          toast({
            title: `+${points} points!`,
            description: `Streak: ${newStreak}`,
            duration: 2000,
          });
        } else {
          toast({
            title: "Not a valid synonym!",
            description: "Try again with a different word.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error validating synonym:', error);
        toast({
          title: "Oops! Something went wrong.",
          description: "There was an error checking your synonym. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Duplicate word!",
        description: "You've already entered this synonym.",
        variant: "destructive",
      });
    }
  }

  const skipWord = async () => {
    try {
      const newWord = await fetchRandomWord()
      setCurrentWord(newWord)
      setSynonyms([])
      setStreak(0)
      toast({
        title: "Word skipped",
        description: "Streak reset to 0",
        duration: 2000,
      })
    } catch (error) {
      console.error('Error skipping word:', error)
      toast({
        title: "Error skipping word",
        description: "Failed to fetch a new word. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTitleClick = useCallback(() => {
    if (isGameStarted) {
      setIsGameStarted(false)
      setIsGameOver(true)
      setTimeLeft(INITIAL_TIME) // Reset the timer
      setScore(0)
      setStreak(0)
      toast({
        title: "Game Ended",
        description: "You've returned to the start screen.",
        duration: 3000,
      })
    }
  }, [isGameStarted, toast])

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="w-full max-w-3xl mx-auto flex-grow">
        <GameHeader 
          timeLeft={timeLeft} 
          score={score} 
          streak={streak} 
          title={GAME_TITLE}
          onTitleClick={handleTitleClick}
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
      <Footer />
    </div>
  )
}
