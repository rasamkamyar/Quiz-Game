import axios from "axios";
import {
  FetchQuizCategoriesRes,
  FetchQuizParams,
  FetchQuizRes,
  QuizCategory,
  QuizItem,
} from "../types/quiz-type";

const BASE__URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesRes>(
      `${BASE__URL}/api_category.php`
    );
    return data.trivia_categories;
  }

  static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
    const { data } = await axios.get<FetchQuizRes>(`${BASE__URL}/api.php`, {
      params,
    });
    return data.results;
  }
}
