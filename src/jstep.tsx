import { useEventListener } from "@chakra-ui/react";
import { useState } from "react";

export class JStep {
  constructor(public title: string, public component: any) {}
}

const First = () => <div>First</div>;

const Second = () => <div>Second</div>;
const Third = () => <div>First</div>;

export const JourneySequence = [
  new JStep("First", <First />),
  new JStep("Second", <Second />),
  new JStep("Third", <Third />),
];

const Demo = () => {
  const [jstep, setStep] = useState(0);

  function moveN(n: boolean = true) {
    const nstep = n ? jstep + 1 : jstep - 1;
    if (nstep >= 0 && nstep < JourneySequence.length) {
      setStep(nstep);
    }
  }
  function inc() {
    moveN();
  }
  function dec() {
    moveN(false);
  }

  function handler({ key }) {
    console.log(key);
    if (key === "n") inc();
    if (key === "p") dec();
  }
  function mouseHandler({ clientX, clientY }) {
    console.log(clientX, clientY);
    if (clientX === 0 || clientY === 0) return;

    const mid = window.innerWidth / 2;
    if (clientX > mid) inc();
    if (clientX < mid) dec();
  }

  useEventListener("keydown", handler);
  useEventListener("click", mouseHandler);

  return <div>{JourneySequence[jstep].component}</div>;
};
export default Demo;
