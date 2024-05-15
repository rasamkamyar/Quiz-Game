import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";

function SetQestionQty(p: {
  step: number;
  min: number;
  max: number;
  defaultValue: number;
  onClickNext: (amount: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(p.defaultValue);

  const renderMarks = (): JSX.Element[] => {
    let marks = [];
    for (let index = p.min; index <= p.max; index += p.step) {
      marks.push(
        <SliderMark value={index} ml={-1} pt={4}>
          {index}
        </SliderMark>
      );
    }
    return marks;
  };
  return (
    <Box>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize="3xl" my={20}>
          How many questions?
        </Heading>
        <Slider
          value={sliderValue}
          maxW={500}
          id="slider"
          defaultValue={5}
          min={p.min}
          max={p.max}
          step={p.step}
          cursor={"pointer"}
          aria-label="slider-ex-6"
          colorScheme="yellow"
          onChange={(v) => setSliderValue(v)}
        >
          {renderMarks()}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Flex>
      <Button
        onClick={() => p.onClickNext(sliderValue)}
        position={"absolute"}
        right={"10%"}
        top={"80%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Category
      </Button>
    </Box>
  );
}

export default SetQestionQty;
