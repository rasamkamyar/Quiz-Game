import { useState } from "react";
import { QuizItem } from "../types/quiz-type";
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

function Play(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
  const avalaibleAnswers: string[] = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];
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
      <RadioGroup
        value=""
        onChange={() => setCurrentQuizItemIndex(currentQuizItemIndex + 1)}
      >
        <SimpleGrid>{radioList}</SimpleGrid>
      </RadioGroup>
    </Flex>
  );
}

export default Play;
