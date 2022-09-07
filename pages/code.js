import Layout from "../components/Layout/Layout";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { steps, tourOptions } from "../tourOptions";
const { ShepherdTour, ShepherdTourContext } = dynamic(
  () => import("react-shepherd"),
  {
    ssr: false,
  }
);

import "shepherd.js/dist/css/shepherd.css";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

const ques = [
  {
    ques: "Write a function that returns the sum of two numbers in python.",
    skeleton: `
  def add(a, b):
    // Your code here
  print(add(a, b))
      `,
  },
  {
    ques: "Write a function that swaps  two numbers in python.",
    skeleton: `
  def swap(a, b):
    // Your code here
  print(swap(a, b))
      `,
  },
  {
    ques: "Write a function that return a fibonacci series in python.",
    skeleton: `
  def fib(n):
    // Your code here
  print(fib(n))
      `,
  },
];

export default function Code() {
  const [questions, setQuestions] = useState([...ques]);
  const [activeQues, setActiveQues] = useState(0);

  //   const tour = useContext(ShepherdTourContext);

  return (
    <Layout>
      {/* <ShepherdTour steps={steps} tourOptions={tourOptions}> */}
      <p
        className="custom-class-name-1"
        style={{ fontWeight: "bolder", margin: "20px 10px" }}
      >
        {activeQues + 1 + ". " + questions[activeQues]["ques"]}
      </p>

      <CodeEditor
        question={questions[activeQues]}
        setActiveQues={setActiveQues}
      />
      {/* </ShepherdTour> */}
    </Layout>
  );
}
