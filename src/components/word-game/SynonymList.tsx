// src/components/word-game/SynonymList.tsx

import { Button } from "@/components/ui/button"
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SynonymListProps {
  synonyms: string[]
  onSkip: () => void
}

export function SynonymList({ synonyms, onSkip }: SynonymListProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Synonyms:</h3>
        <Button onClick={onSkip} size="sm">
          Skip Word
        </Button>
      </div>

      {synonyms.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No synonyms yet</AlertTitle>
          <AlertDescription>
            Start typing synonyms for the current word to see them appear here.
          </AlertDescription>
        </Alert>
      ) : (
        <ul className="space-y-2 mb-4">
          {synonyms.map((synonym, index) => (
            <li key={index} className="bg-secondary p-2 rounded">
              {synonym}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}