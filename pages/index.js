import Router from "next/router";

import styles from "../styles/Home.module.css";

export default function Home() {
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
