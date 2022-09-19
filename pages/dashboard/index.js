import React from "react";

function Index() {
  return (
    <div className="h-screen flex  justify-center items-center">
      <div className="flex-1 flex justify-center">
        <button
          className="block p-2 w-[200px] shadow"
          onClick={() => Router.push("/code")}
        >
          Coding Assessment
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          className="block p-2 w-[200px] shadow"
          onClick={() => Router.push("/noncode")}
        >
          NON Coding Assessment
        </button>
      </div>
    </div>
  );
}

export default Index;
