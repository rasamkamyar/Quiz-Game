import { useEffect, useState } from "react";
import { QuizItem } from "../../types/quiz-type";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import validAnime from "../../assets/lottie/valid.json";
import inValidAnime from "../../assets/lottie/invalid.json";
import Timer from "./Timer";

function Play(p: {
  quiz: QuizItem[];
  onFinished: (history: boolean[]) => void;
}) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>();
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unaswered"
  >("unaswered");
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
  const [avalaibleAnswers, setAvalaibleAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);
  useEffect(() => {
    setAvalaibleAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers,
      ].sort(() => Math.random() - 0.5)
    );
  }, [currentQuizItemIndex]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
      setHistory([...history, isValid]);
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  const renderProgressBar = () => {
    return (
      <HStack>
        {p.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              h={3}
              mt={10}
              w={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? "gray.200"
                  : history[i]
                  ? "green.300"
                  : "red.300"
              }
            />
          );
        })}
      </HStack>
    );
  };

  const radioList = avalaibleAnswers.map((avalaibleAnswer: string) => {
    return (
      <Radio key={avalaibleAnswer} value={avalaibleAnswer}>
        <Text
          color={
            questionStatus === "unaswered"
              ? "black"
              : isValidAnswer(avalaibleAnswer)
              ? "green.500"
              : "red.500"
          }
          dangerouslySetInnerHTML={{ __html: avalaibleAnswer }}
        />
      </Radio>
    );
  });

  const failQuestion = () => {
    setHistory([...history, false]);
    setQuestionStatus("invalid");
  };
  return (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
      {renderProgressBar()}
      {questionStatus === "unaswered" && (
        <Box position={"absolute"} right={50} top={50}>
          <Timer max={10} unFinished={failQuestion} />
        </Box>
      )}
      <Heading
        maxW={800}
        fontSize={"3xl"}
        mt={10}
        mb={10}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />
      <RadioGroup
        value={answer}
        onChange={questionStatus === "unaswered" ? setAnswer : undefined}
      >
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
          if (currentQuizItemIndex < p.quiz.length - 1) {
            setQuestionStatus("unaswered");
            setCurrentQuizItemIndex(currentQuizItemIndex + 1);
          } else {
            p.onFinished(history);
          }
        }}
      />
    </Flex>
  );
}

export default Play;
