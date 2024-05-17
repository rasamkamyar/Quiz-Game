import { useEffect, useState } from "react";
import { QuizItem } from "../types/quiz-type";
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import validAnime from "../assets/lottie/valid.json";
import inValidAnime from "../assets/lottie/invalid.json";

function Play(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>();
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unaswered"
  >("unaswered");
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
  const avalaibleAnswers: string[] = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };
  const radioList = avalaibleAnswers.map((avalaibleAnswer: string) => {
    return (
      <Radio key={avalaibleAnswer} value={avalaibleAnswer}>
        <Text dangerouslySetInnerHTML={{ __html: avalaibleAnswer }} />
      </Radio>
    );
  });
  console.log(p.quiz);
  return (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Heading
        maxW={800}
        fontSize={"3xl"}
        mt={10}
        mb={10}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />
      <RadioGroup value={answer} onChange={setAnswer}>
        <SimpleGrid>{radioList}</SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: "20px", height: "200px" }}
        animationData={
          questionStatus === "unaswered"
            ? null
            : questionStatus === "valid"
            ? validAnime
            : inValidAnime
        }
        onComplete={() => {
          setQuestionStatus("unaswered");
          setCurrentQuizItemIndex(currentQuizItemIndex + 1);
        }}
      />
    </Flex>
  );
}

export default Play;
