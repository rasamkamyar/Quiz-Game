import { Flex, Heading } from "@chakra-ui/react";

function Score(p: { history: boolean[] }) {
  const rightAnswers = p.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;
  console.log(history.length);
  return (
    <Flex>
      <Heading>Score</Heading>
      <Heading>
        {rightAnswers}/{p.history.length}
      </Heading>
    </Flex>
  );
}

export default Score;
