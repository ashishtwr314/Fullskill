import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../CodeEditor"), {
  ssr: false,
});
import { useContext, useState } from "react";
import askAI from "../../openai";
// import Joyride from "react-joyride";
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const ques = [
  {
    ques: "Write a function that returns the sum of two numbers in python.",
    skeleton: `
def add(a, b):
    ## Your code here
print(add(1, 2))
        `,
    immutablelines: ["def add(a, b):", "print(add(1, 2))"],
  },
  {
    ques: "Write a function that swaps  two numbers in python.",
    skeleton: `
def swap(a, b):
    ## Your code here
print(swap(a, b))
        `,
    immutablelines: ["def swap(a, b):", "print(swap(a, b))"],
  },

  {
    ques: "Write a function that return a fibonacci series in python.",
    skeleton: `
def fib(n):
    ## Your code here
print(fib(n))
        `,
    immutablelines: ["def fib(n):", "print(fib(n))"],
  },
];

const Question = ({ text }) => {
  return (
    <p
      className="question"
      style={{ fontWeight: "bolder", margin: "20px 10px" }}
    >
      {text}
    </p>
  );
};

function CodeComp() {
  const [questions, setQuestions] = useState([...ques]);
  const [activeQues, setActiveQues] = useState(0);
  const [compiling, setCompiling] = useState(false);
  const [response, setResponse] = useState({ err: false, output: "" });
  const [run, setRun] = useState(false);

  const [explaining, setExplaining] = useState({
    loading: false,
    response: null,
  });

  const [steps, steJoyRideState] = useState([
    {
      target: ".question",
      content: "View yout question here",
    },
    {
      target: ".ques-controls",
      content: "Go back and forth in the questionnaire using this controls",
    },
    {
      target: ".code-editor",
      content:
        "Here is your editor which you can use to write your code for the above question",
    },
    {
      target: ".editor-controls",
      content:
        "Here is your editor which you can use to write your code for the above question",
    },
    {
      target: ".editor-controls__compile",
      content: "Compile the code",
    },

    {
      target: ".editor-result",
      content: "Result of the compilation appears here",
    },

    {
      target: ".explain-err-btn",
      content: "This button is used to explain the error",
    },
    {
      target: ".explain-err-div",
      content: "You get the explanation on this section",
    },
  ]);

  const handelJRcallback = (data) => {
    if (
      data.step.target == ".editor-controls__compile" &&
      data.lifecycle == "tooltip"
    ) {
      compile(`
        def add(a, b):
        // Your code here
    print(add(a, b))
      `);
    }

    if (data.step.target == ".explain-err-btn" && data.lifecycle == "tooltip") {
      explainError(
        response,
        `
      def add(a, b):
      // Your code here
  print(add(a, b))`
      );
    }
  };

  const compile = (editorText) => {
    setCompiling(true);
    // Logic to compile the code

    fetch("/api/python", {
      method: "POST",
      body: editorText,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        setResponse({ err: true, output: "Something went wrong" });
        console.log("ERROR", err);
      })
      .finally(() => {
        setCompiling(false);
      });
  };

  const explainError = async (response, editorText) => {
    setExplaining((x) => ({ ...x, loading: true }));
    const query = `
      Question: 
      ${questions[activeQues]["ques"]}

      Program:
      ${editorText}

      Error: 
      ${response.output}

      Explain this Error Please

    `;

    const resp = await askAI(query);
    setExplaining((x) => ({ ...x, response: resp, loading: false }));
  };

  useEffect(() => {
    setRun(true);
  }, []);

  return (
    <>
      <Joyride
        continuous
        callback={handelJRcallback}
        run={true}
        steps={steps}
      />
      <Question text={activeQues + 1 + ". " + questions[activeQues]["ques"]} />
      <CodeEditor
        compiling={compiling}
        compile={compile}
        response={response}
        setResponse={setResponse}
        question={questions[activeQues]}
        setActiveQues={setActiveQues}
        explaining={explaining}
        setExplaining={setExplaining}
        explainError={explainError}
      />
    </>
  );
}

export default CodeComp;
