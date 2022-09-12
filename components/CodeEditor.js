import React, { useContext, useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import askAI from "../openai";
import steps from "./steps";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-python";
import playIcon from "../icons/play.svg";
import rewrite from "../icons/rewrite.svg";
import explainIcon from "../icons/help.svg";
import closeIcon from "../icons/close.svg";
import Image from "next/image";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

function CodeEditor({
  setActiveQues,
  question,
  response,
  setResponse,
  compile,
  compiling,
  explaining,
  setExplaining,
  explainError,
}) {
  const [editorText, setEditorText] = React.useState(question.skeleton);
  const [immutable, setImmutable] = useState(false);
  const editorRef = useRef();

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

  const explainCode = async (response) => {
    setExplainingCode((x) => ({ ...x, loading: true }));

    const query = `
      Question: 
      ${question.ques}

      Program:
      ${editorText}

      Explain this Program Please
    `;

    const resp = await askAI(query);
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

    const resp = await askAI(prompt, suffix);

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

  const handleCursorChange = (e, event) => {
    const isImmutable = question.immutablelines.includes(
      e.cursor.document.$lines[e.cursor.row]
    );

    setImmutable(isImmutable);
  };

  const handleEditorChange = (text, event) => {
    if (immutable) {
      null;
    } else {
      setEditorText(text);
    }
  };

  return (
    <div>
      {console.log(process.env.NEXT_PUBLIC_API_KEY_OPENAI)}
      <div className="flex justify-between">
        <div className="max-w-[70%]">
          <div className="flex justify-between mb-5 ques-controls">
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
          <div className="max-h-[400px] overflow-scroll code-editor border overflow-x-hidden">
            <AceEditor
              onCursorChange={(e, event) => handleCursorChange(e, event)}
              // onSelectionChange={(e) => console.log(e)}
              ref={editorRef}
              mode="python"
              theme="chrome"
              value={editorText}
              onChange={(text, e) => handleEditorChange(text, e)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          {explainingCode.response && (
            <p className="border p-2 my-2 relative">
              <span
                onClick={() =>
                  setExplainingCode((x) => ({
                    ...x,
                    response: "",
                  }))
                }
                className="absolute cursor-pointer -right-2 -top-2"
              >
                <Image src={closeIcon} height={17} alt="closeicon" />
              </span>
              <span>
                {!explainingCode.loading &&
                  explainingCode.response &&
                  explainingCode.response.data.choices[0].text}
              </span>
            </p>
          )}
        </div>

        <div className="max-w-[30%] space-y-6 text-right mt-5 editor-controls flex-col items-end ">
          <div>
            <button
              className="border py-1 px-3  editor-controls__compile  flex items-center justify-center  space-x-3 w-full text-center shadow-md"
              onClick={() => compile(editorText)}
            >
              <Image src={playIcon} alt="playicon" />

              <span>{compiling ? "Compiling" : "Play"}</span>
            </button>
          </div>

          <div>
            <button
              className="border py-1 px-3 editor-controls__rewrite flex items-center justify-center  space-x-3 w-full text-center  shadow-md"
              onClick={() => rewriteCode(question)}
            >
              <Image src={rewrite} height={17} alt="wirete" />

              <span>
                {rewriting.response !== null
                  ? rewriting.loading
                    ? "Please wait"
                    : "Rewrite Again"
                  : rewriting.loading
                  ? "Please Wait"
                  : "Rewrite"}
              </span>
            </button>
          </div>

          <div>
            {!response.err && response.output && (
              <button
                className="border py-1 px-3 editor-controls__rewrite flex items-center justify-center  space-x-3 w-full text-center  shadow-md"
                onClick={() => explainCode()}
              >
                <Image src={explainIcon} height={17} alt="wirete" />
                <span>
                  {" "}
                  {explainingCode.response !== null
                    ? explainingCode.loading
                      ? "Explaining..."
                      : "Explain Again"
                    : explainingCode.loading
                    ? "Explanation..."
                    : "Explain the code"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {response.output && (
        <div className="editor-result">
          <h1>Result</h1>
          <p
            style={{ color: response.err ? "red" : "black" }}
            className="border p-2"
          >
            {response.output}
          </p>
        </div>
      )}

      {response.err && (
        <>
          <button
            className="border py-1 px-3 mt-2 explain-err-btn"
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

      <div className="explain-err-div">
        {explaining.response && (
          <div style={{ marginTop: "20px" }}>
            Explaination:
            {!explaining.loading &&
              explaining.response &&
              explaining.response.data.choices[0].text}
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
