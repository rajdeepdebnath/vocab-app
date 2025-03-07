export interface GREWord {
  word: string
  definition: string
  example: string
  synonyms: string[]
}

export interface QuizQuestion {
  word: GREWord
  options: string[]
  correctOptionIndex: number
}
