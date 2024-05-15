import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/5.3 logo.png";
import bubbleImg from "./assets/5.1 bubble.png";
import { useState } from "react";
import SetQestionQty from "./features/SetQestionQty";
import { QuizDifficulty, QuizType, fetchQuizParams } from "./types/quiz-type";
import SetQestionCategory from "./features/SetQestionCategory";

enum Step {
  SetQestionQty,
  SetQestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}
function App() {
  const [step, setStep] = useState<Step>(Step.SetQestionQty);
  const [quizParams, setQuizParams] = useState<fetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  console.log(quizParams);
  const header = (
    <Flex justify="center">
      <Image h={24} src={logoImg} />
    </Flex>
  );

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
        return <SetQestionCategory />;
      case Step.SetQuestionDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
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
