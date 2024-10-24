// src/components/word-game/types.ts

export interface GameStats {
    timeLeft: number
    score: number
    streak: number
  }
  
  export interface GameState {
    currentWord: string
    synonyms: string[]
    isGameOver: boolean
    isGameStarted: boolean
  }