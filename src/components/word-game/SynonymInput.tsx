// src/components/word-game/SynonymInput.tsx

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEvent, useState } from "react"

interface SynonymInputProps {
  onSubmit: (synonym: string) => void
}

export function SynonymInput({ onSubmit }: SynonymInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSubmit(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder="Enter a synonym"
        className="flex-grow"
        aria-label="Enter a synonym"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}
