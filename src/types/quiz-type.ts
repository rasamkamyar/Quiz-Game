export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export interface FetchQuizCategoriesRes {
  trivia_categories: QuizCategory[];
}

export interface QuizCategory {
  id: number;
  name: string;
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

export interface FetchQuizRes {
  response_code: number;
  results: QuizItem[];
}

export interface QuizItem {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
