import React from "react";

function MCQAnswer({ question, onChange }) {
  console.log(question);
  return (
    <div className="options my-10">
      {question.options.map((opt) => (
        <div key={opt} className="flex items-center mb-4">
          <input
            onChange={onChange}
            id={opt}
            type="radio"
            value={opt}
            name="disabled-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800 2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={opt}
            className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
          >
            {opt}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MCQAnswer;
