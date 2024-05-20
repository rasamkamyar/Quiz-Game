import { Button, Flex, Heading, Text } from "@chakra-ui/react";

function Score(p: { history: boolean[]; onNext: () => void }) {
  const rightAnswers = p.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / p.history.length;
    if (rightAnswerPercentage < 30) {
      return <Heading colorScheme="red">You need more practice</Heading>;
    } else if (rightAnswerPercentage < 50) {
      return <Heading colorScheme="red">Not bad,Try more</Heading>;
    } else if (rightAnswerPercentage < 70) {
      return <Heading colorScheme="red">Good job</Heading>;
    } else {
      return <Heading colorScheme="red">Fantastic</Heading>;
    }
  };
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={"20px"}
      gap={"50px"}
    >
      <Heading>Score</Heading>
      <Heading>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontSize={"xl"}>{renderMessage()}</Text>
      <Button
        onClick={p.onNext}
        position={"absolute"}
        right={"10%"}
        top={"80%"}
      >
        New Game
      </Button>
    </Flex>
  );
}

export default Score;
