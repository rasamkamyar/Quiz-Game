import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/5.3 logo.png";
import bubbleImg from "./assets/5.1 bubble.png";
import { useEffect, useState } from "react";
import SetQestionQty from "./features/SetQestionQty";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
} from "./types/quiz-type";
import SetQestionCategory from "./features/SetQestionCategory";
import { QuizAPI } from "./api/quiz-api";
import SetQuestionDifficulty from "./features/SetQuestionDifficulty";

import Play from "./features/Play";
enum Step {
  SetQestionQty,
  SetQestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}
function App() {
  const [step, setStep] = useState<Step>(Step.SetQestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  async function fetchingCategories() {
    setCategories([
      { id: -1, name: "Mixed" },
      ...(await QuizAPI.fetchCategories()),
    ]);
  }
  useEffect(() => {
    fetchingCategories();
  }, []);
  const header = (
    <Flex justify="center">
      <Image h={24} src={logoImg} />
    </Flex>
  );
  console.log(quizParams);
  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQestionQty:
        return (
          <SetQestionQty
            defaultValue={10}
            step={5}
            min={5}
            max={30}
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQestionCategory);
            }}
          />
        );
      case Step.SetQestionCategory:
        return (
          <SetQestionCategory
            categories={categories}
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === "-1" ? "" : category,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );
      case Step.SetQuestionDifficulty:
        return (
          <SetQuestionDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = { ...quizParams, difficulty };
              setQuizParams(params);
              const quizRes = await QuizAPI.fetchQuiz(params);
              if (quizRes.length > 0) {
                setQuiz(quizRes);
                setStep(Step.Play);
              } else {
                alert(
                  `Couldent find ${params.amount} qusetion for this category.please restart game`
                );
                setStep(Step.SetQestionQty);
              }
            }}
          />
        );
      case Step.Play:
        return <Play quiz={quiz} />;
      case Step.Score:
        return <></>;
      default:
        return null;
    }
  };
  return (
    <Box py="5" h="100%">
      {header}
      <Image
        src={bubbleImg}
        position={"absolute"}
        zIndex={-1}
        right={0}
        top={100}
      />
      <Box>{renderScreenByStep()}</Box>
    </Box>
  );
}

export default App;
