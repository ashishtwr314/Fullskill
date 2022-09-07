import React, { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import useOpenAI from "../openai";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import steps from "./steps";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

function CodeEditor({ setActiveQues, question }) {
  const [editorText, setEditorText] = React.useState(question.skeleton);
  const [compiling, setCompiling] = React.useState(false);
  const [response, setResponse] = React.useState({ err: false, output: "" });
  const [explaining, setExplaining] = useState({
    loading: false,
    response: null,
  });

  const [explainingCode, setExplainingCode] = useState({
    loading: false,
    response: null,
  });

  const [rewriting, setRewriting] = useState({
    loading: false,
    response: null,
  });

  useEffect(() => {
    setEditorText(question.skeleton);
  }, [question]);

  const compile = () => {
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

  const explainError = async (response) => {
    setExplaining((x) => ({ ...x, loading: true }));
    const query = `
      Question: 
      ${question.ques}

      Program:
      ${editorText}

      Error: 
      ${response.output}

      Explain this Error Please

    `;

    const resp = await useOpenAI(query);
    setExplaining((x) => ({ ...x, response: resp, loading: false }));
  };

  const explainCode = async (response) => {
    setExplainingCode((x) => ({ ...x, loading: true }));

    const query = `
      Question: 
      ${question.ques}

      Program:
      ${editorText}

      Explain this Program Please
    `;

    const resp = await useOpenAI(query);
    console.log(resp);
    setExplainingCode((x) => ({ ...x, response: resp, loading: false }));
  };

  const rewriteCode = async (question) => {
    setRewriting((x) => ({ ...x, loading: true }));

    const skeletonForAi = question.skeleton.replace(
      "// Your code here",
      "[insert]"
    );

    const query = `
      Question:
      ${question.ques}

      Program:
      ${skeletonForAi}

      Complete the function without user input
    `;

    const prompt = query.split("[insert]")[0];
    const suffix = query.split("[insert]")[1];

    const resp = await useOpenAI(prompt, suffix);

    const string = skeletonForAi.replace("[insert]", resp.data.choices[0].text);

    setEditorText(string);

    setRewriting((x) => ({ ...x, response: string, loading: false }));
  };

  useEffect(() => {
    if (response.output) {
      setResponse("");
    }

    if (explaining.response !== null) {
      setExplaining((x) => ({ ...x, loading: false, response: null }));
    }
  }, [editorText]);

  const tour = useContext(ShepherdTourContext);

  function Editor() {
    const tour = useContext(ShepherdTourContext);

    useEffect(() => {
      if (tour) tour.start();
      console.log("🤮");
    }, [tour]);

    return (
      <AceEditor
        className="hero-welcome"
        mode="python"
        theme="xcode"
        value={editorText}
        onChange={(e) => setEditorText(e)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    );
  }

  return (
    <div>
      {/* <ShepherdTour steps={steps} tourOptions={tourOptions}> */}
      <div className="flex justify-between">
        <div>
          <div className="flex justify-between mb-5">
            <button
              className="border py-1 px-3"
              onClick={() => {
                setActiveQues((prev) => (prev == 0 ? 2 : prev - 1));
              }}
              type="button"
            >
              Prev
            </button>

            <button
              className="border py-1 px-3"
              onClick={() => {
                setActiveQues((prev) => (prev == 2 ? 0 : prev + 1));
              }}
              type="button"
            >
              Next
            </button>
          </div>
          <div className="max-h-[400px] overflow-scroll">
            <AceEditor
              className="hero-welcome "
              mode="python"
              theme="xcode"
              value={editorText}
              onChange={(e) => setEditorText(e)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          {explainingCode.response && (
            <p>
              <span style={{}}>&times;</span>
              {!explainingCode.loading &&
                explainingCode.response &&
                explainingCode.response.data.choices[0].text}
            </p>
          )}
        </div>

        <div className="space-y-6 text-right mt-5">
          <button
            className="border py-1 px-3 border-[green]"
            onClick={() => compile()}
          >
            {compiling ? "Please wait compiling" : "Compile"}
          </button>
          <br />

          <button
            className="border py-1 px-3"
            onClick={() => rewriteCode(question)}
          >
            {rewriting.response !== null
              ? rewriting.loading
                ? "Please wait"
                : "Rewrite Again"
              : rewriting.loading
              ? "Please Wait"
              : "Rewrite the code"}
          </button>
        </div>
      </div>

      {!response.err && response.output && (
        <button onClick={() => explainCode()} style={{ marginLeft: "10px" }}>
          {explainingCode.response !== null
            ? explainingCode.loading
              ? "Loading Explanation..."
              : "Not Satisfied ? Explain Again"
            : explainingCode.loading
            ? "Loading Explanation"
            : "Explain the code"}
        </button>
      )}

      {response.output && (
        <>
          <h1>Result</h1>
          <p
            style={{ color: response.err ? "red" : "black" }}
            className="border p-2"
          >
            {response.output}
          </p>
        </>
      )}

      {response.err && (
        <>
          <button
            className="border py-1 px-3 mt-2"
            onClick={() => explainError(response)}
          >
            {explaining.response !== null
              ? explaining.loading
                ? "Please wait"
                : "Not Satisfied ? Explain Again"
              : explaining.loading
              ? "Please Wait"
              : "Explain this error"}
          </button>
        </>
      )}

      {explaining.response && (
        <div style={{ marginTop: "20px" }}>
          Explaination:
          {!explaining.loading &&
            explaining.response &&
            explaining.response.data.choices[0].text}
        </div>
      )}
      {/* </ShepherdTour> */}
    </div>
  );
}

export default CodeEditor;
