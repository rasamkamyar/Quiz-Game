import axios from "axios";
import { FetchQuizCategoriesRes, QuizCategory } from "../types/quiz-type";

const BASE__URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesRes>(
      `${BASE__URL}/api_category.php`
    );
    return data.trivia_categories;
  }
}
