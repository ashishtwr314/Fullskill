import React from "react";
import askAI from "../../openai";
import { useEffect, useState } from "react";
import { reactInfo } from "../../text";
import MCQAnswer from "./MCQAnswer";
import ReactJoyride from "react-joyride";

const textQues = [
  {
    id: 1,
    ques: "What is React JS ?",
  },
  {
    id: 2,
    ques: "What is Virtual DOM ?",
  },
  {
    id: 3,
    ques: "Identify the smallest building block of React.JS.",
    options: ["Props", "Elements", "Components", "None of the above"],
    answer: "Components",
    isMCQ: true,
  },
];

function NonCode() {
  const [answer, setAnswer] = useState("");
  const [textQuestions, setTextQuestions] = useState([...textQues]);
  const [activeTextQuestion, setActiveTextQuestion] = useState(0);
  const [submit, setSubmit] = useState({
    error: "",
    miss: "",
    loading: false,
    MCQAnswer: {
      correct: false,
      label: "",
    },
  });
  const [submittingAnswer, setSubmittingAsnwer] = useState(false);
  const [hint, setShowHint] = useState({ loading: false, response: "" });

  const [rewriting, setRewriting] = useState(false);

  const [steps, steJoyRideState] = useState([
    {
      target: ".noncode-ques",
      content: "View yout question here",
    },
    {
      target: ".noncode-ans",
      content: "Go back and forth in the questionnaire using this controls",
    },
    {
      target: ".hint-btn",
      content:
        "Here is your editor which you can use to write your code for the above question",
    },
    { target: ".hint-container", content: "Your Hint appears here" },
    {
      target: ".rewrite-btn",
      content: "CLick here to reqrite your answer into the textbox",
    },
    { target: ".noncode-ans", content: "Your re written answer comes up here" },
    {
      target: ".submit-btn",
      content: "Click on the submit btn to submit yout answer",
    },
    {
      target: ".submit-container",
      content:
        "Your error and missing elements from the answer (if any) appears here",
    },
  ]);

  const handleAnswerSubmit = async (isMCQ) => {
    console.log(isMCQ);
    if (isMCQ) {
      return handleMCQAnswerCheck();
    }

    setSubmit((prev) => ({ ...prev, loading: true }));

    const errquery = `
      Topic: 
      ${reactInfo}

      Question:
      ${textQuestions[activeTextQuestion]["ques"]}

      Candidate Answer: 
      ${answer}

      Errors if any in Candidate answer in points:
  `;

    const missquery = `
        Topic: 
        ${reactInfo}

        Question:
        ${textQuestions[activeTextQuestion]["ques"]}

        Candidate Answer: 
        ${answer}

        Missing elemenets in Candidate answer in points:
    `;

    const error = await askAI(errquery);
    const miss = await askAI(missquery);

    setSubmit((prev) => ({
      ...prev,
      error: error.data.choices[0].text,
      miss: miss.data.choices[0].text,
      loading: false,
    }));
  };

  const handleMCQAnswerCheck = () => {
    if (answer == textQuestions[activeTextQuestion]["answer"]) {
      setSubmit((prev) => ({
        ...prev,
        MCQAnswer: {
          correct: true,
          label: "Correct Answer",
        },
      }));
    } else {
      setSubmit((prev) => ({
        ...prev,
        MCQAnswer: {
          correct: false,
          label: `InCorrect Answer, Correct answer is ${textQuestions[activeTextQuestion]["answer"]}`,
        },
      }));
    }
  };

  useEffect(() => {
    setAnswer("");
    setSubmit((prev) => ({
      ...prev,
      MCQAnswer: { correct: false, label: "" },
      error: "",
      miss: "",
      loading: false,
    }));
  }, [activeTextQuestion]);

  const showHint = async () => {
    setShowHint((prev) => ({ ...prev, loading: true }));

    const query = `
        Topic: 
        ${reactInfo}

        Question:
        ${textQuestions[activeTextQuestion]["ques"]}

        Candidate Answer: 
        ${answer}

        Show Hint
    `;
    const resp = await askAI(query);
    setShowHint((prev) => ({
      ...prev,
      response: resp.data.choices[0].text,
      loading: false,
    }));
  };

  const rewrite = async () => {
    setRewriting(true);
    const query = `
        Topic: 
        ${reactInfo}

        Question:
        ${textQuestions[activeTextQuestion]["ques"]}

        Candidate Answer: 
        ${answer}

        Rewrite the Candidate Answer
    `;
    const resp = await askAI(query);
    setRewriting(false);
    setAnswer(resp.data.choices[0].text);
  };

  const onMCQOptionSelect = (e) => {
    setAnswer(e.target.value);
  };

  const handelJRcallback = (data) => {
    if (data.step.target == ".noncode-ans" && data.lifecycle == "tooltip") {
      setAnswer("React is a ...");
    }

    if (data.step.target == ".hint-btn" && data.lifecycle == "tooltip") {
      showHint();
    }
    if (data.step.target == ".rewrite-btn" && data.lifecycle == "tooltip") {
      rewrite();
    }
  };

  return (
    <>
      <ReactJoyride
        continuous
        callback={handelJRcallback}
        run={true}
        steps={steps}
      />
      <div>
        <p className="tracking-wide font-bold text-xl noncode-ques">
          {activeTextQuestion + 1}. {textQuestions[activeTextQuestion]["ques"]}
        </p>

        {textQuestions[activeTextQuestion]["isMCQ"] ? (
          <MCQAnswer
            onChange={onMCQOptionSelect}
            question={textQuestions[activeTextQuestion]}
          />
        ) : (
          <div className="noncode-ans">
            <p className="mt-6"> Answer: </p>
            <textarea
              rows={10}
              style={{ width: "100%", padding: "10px", lineHeight: 1.2 }}
              value={answer}
              className="border rounded-sm outline-none"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="border py-1 px-3 next-btn"
          onClick={() => {
            setActiveTextQuestion((prev) => (prev == 2 ? 0 : prev + 1));
          }}
          type="button"
        >
          Next Question
        </button>
        <div className="space-x-2 ">
          <button
            className="border py-1 px-3 hint-btn"
            onClick={() => {
              showHint();
            }}
            type="button"
          >
            {hint.loading ? "Loading Hint" : "Hint"}
          </button>

          <button
            className="border py-1 px-3 rewrite-btn"
            onClick={() => {
              rewrite();
            }}
            type="button"
          >
            {rewriting ? "Rewriting" : "Rewrite"}
          </button>

          <button
            disabled={submit.loading}
            className={`border py-1 px-3 ${
              submit.loading && " animate-pulse"
            } submit-btn`}
            onClick={() => {
              handleAnswerSubmit(textQuestions[activeTextQuestion]["isMCQ"]);
            }}
            type="button"
          >
            {submit.loading ? "Please wait" : "Submit Answer"}
          </button>
        </div>
      </div>

      <div className="mt-10 border p-2">
        {!hint.loading && hint.response && (
          <div className="hint-container">
            <h1 className="font-bold mb-3">Hint: </h1>
            <p>{hint.response}</p>
          </div>
        )}
        {!submit.loading && submit.error && submit.miss && (
          <div className="space-y-5 submit-container">
            <div>
              <div>
                <h1 className="font-bold mb-3">Errors: </h1>
                <p style={{ whiteSpace: "pre-line" }}>{submit.error}</p>
              </div>
              <div>
                <h1 className="font-bold mb-3">Missing: </h1>
                <p style={{ whiteSpace: "pre-line" }}>{submit.miss}</p>
              </div>
            </div>
          </div>
        )}

        {submit.MCQAnswer.label && (
          <div
            className={
              submit.MCQAnswer.correct ? "text-green-500" : "text-red-500"
            }
          >
            {submit.MCQAnswer.label}
          </div>
        )}
      </div>
    </>
  );
}

export default NonCode;
