import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { QuizDifficulty } from "../types/quiz-type";

function SetQuestionDifficulty(p: {
  onClickNext: (difficulty: QuizDifficulty) => void;
}) {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  const radioList = Object.values(QuizDifficulty).map(
    (diff: QuizDifficulty) => {
      return (
        <Radio key={diff} value={diff}>
          <span style={{ textTransform: "capitalize" }}>
            {diff === QuizDifficulty.Mixed ? "Mixed" : diff}
          </span>
        </Radio>
      );
    }
  );
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize="3xl" my={20}>
          Which difficulty ?
        </Heading>
      </Flex>
      <RadioGroup
        value={difficulty}
        onChange={setDifficulty as (d: string) => void}
      >
        <VStack>{radioList}</VStack>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(difficulty)}
        position={"absolute"}
        right={"10%"}
        top={"80%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Play
      </Button>
    </>
  );
}

export default SetQuestionDifficulty;
