import { useEffect, useState } from "react";
import { QuizCategory } from "../types/quiz-type";
import { QuizAPI } from "../api/quiz-api";

function SetQestionCategory() {
  const [categories, setCategories] = useState<QuizCategory[]>();

  async function fetchingCategories() {
    setCategories(await QuizAPI.fetchCategories());
  }

  useEffect(() => {
    fetchingCategories();
  }, []);
  console.log(categories);
  return <div>SetQestionCategory</div>;
}

export default SetQestionCategory;
