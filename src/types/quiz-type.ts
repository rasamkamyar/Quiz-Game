export interface fetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export enum QuizDifficulty {
  Mixed = "",
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}
