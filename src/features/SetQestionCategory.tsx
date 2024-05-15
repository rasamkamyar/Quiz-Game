import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Box,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { QuizCategory } from "../types/quiz-type";

function SetQestionCategory(p: { categories: QuizCategory[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioList = p.categories.map((category: QuizCategory) => {
    return (
      <Radio
        colorScheme="green"
        key={category.id}
        value={category.id.toString()}
      >
        {category.name}
      </Radio>
    );
  });
  console.log(selectedCategoryId);
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize="3xl" my={20}>
          Which topic ?
        </Heading>
      </Flex>
      <RadioGroup
        display={"flex"}
        justifyContent={"center"}
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      >
        <SimpleGrid columns={[1, 3, 4]} spacing={"1"}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Button
        position={"absolute"}
        right={"10%"}
        top={"80%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Difficulty
      </Button>
    </>
  );
}

export default SetQestionCategory;
