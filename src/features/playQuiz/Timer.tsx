import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Timer(p: { max: number; unFinished: () => void }) {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    if (progress <= 0) {
      p.unFinished();
    }
  }, [progress]);

  useEffect(() => {
    let timer  = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 1000);
  }, []);
  return (
    <CircularProgress max={p.max} value={progress}>
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  );
}

export default Timer;
