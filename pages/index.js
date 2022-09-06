import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useOpenAI from "../openai";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});
import styles from "../styles/Home.module.css";
import { reactInfo } from "../text";

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

const textQues = [
  {
    id: 1,
    ques: "What is React ?",
  },
  {
    id: 2,
    ques: "What is Virtual DOM ?",
  },
  {
    id: 3,
    ques: "What is Difference between a stateful and a stateless component ?",
  },
];

export default function Home() {
  const [questions, setQuestions] = useState([...ques]);
  const [activeQues, setActiveQues] = useState(0);

  const [answer, setAnswer] = useState("");
  const [textQuestions, setTextQuestions] = useState([...textQues]);
  const [activeTextQuestion, setActiveTextQuestion] = useState(0);
  const [quesResp, setQuesResp] = useState("");
  const [submittingAnswer, setSubmittingAsnwer] = useState(false);

  const handleAnswerSubmit = async () => {
    setSubmittingAsnwer(true);

    const query = `
      Topic: 
      ${reactInfo}

      Question:
      ${textQuestions[activeTextQuestion]["ques"]}

      Candidate Answer: 
      ${answer}

      Errors if any in Candidates answer in points:
  `;

    const resp = await useOpenAI(query);
    setQuesResp(resp.data.choices[0].text);

    setSubmittingAsnwer(false);
  };

  useEffect(() => {
    setAnswer("");
    setQuesResp("");
  }, [activeTextQuestion]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "50px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: "bolder", margin: "20px 10px" }}>
            {activeQues + 1 + ". " + questions[activeQues]["ques"]}
          </p>
          <CodeEditor
            question={questions[activeQues]}
            setActiveQues={setActiveQues}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1>Questions: </h1>

          <div key={ques.id}>
            <p>{textQuestions[activeTextQuestion]["ques"]}</p>
            <p>Answer: </p>
            <textarea
              rows={10}
              style={{ width: "100%", padding: "10px", lineHeight: 1.2 }}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => {
                setActiveTextQuestion((prev) => (prev == 2 ? 0 : prev + 1));
              }}
              type="button"
            >
              Next Question
            </button>

            <button
              onClick={() => {
                handleAnswerSubmit();
              }}
              type="button"
            >
              {submittingAnswer ? "Please wait" : "Submit Answer"}
            </button>
          </div>

          {quesResp && (
            <>
              <h1>AI Suggests</h1>
              <p
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  whiteSpace: "pre-line",
                }}
              >
                {quesResp}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
