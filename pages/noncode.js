import Layout from "../components/Layout/Layout";
import useOpenAI from "../openai";
import { useEffect, useState } from "react";
import { reactInfo } from "../text";
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

export default function Code() {
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
    <Layout>
      <div>
        <p className="tracking-wide font-bold text-xl">
          {activeTextQuestion + 1}. {textQuestions[activeTextQuestion]["ques"]}
        </p>
        <p className="mt-6"> Answer: </p>
        <textarea
          rows={10}
          style={{ width: "100%", padding: "10px", lineHeight: 1.2 }}
          value={answer}
          className="border rounded-sm outline-none"
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="border py-1 px-3"
          onClick={() => {
            setActiveTextQuestion((prev) => (prev == 2 ? 0 : prev + 1));
          }}
          type="button"
        >
          Next Question
        </button>

        <button
          className="border py-1 px-3"
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
    </Layout>
  );
}
