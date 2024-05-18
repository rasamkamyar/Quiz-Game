import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
let timer: number;

function Timer(p: { max: number; unFinished: () => void }) {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    if (progress <= 0) {
      p.unFinished();
      clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <CircularProgress max={p.max} value={progress}>
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  );
}

export default Timer;
