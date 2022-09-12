import Layout from "../components/Layout/Layout";
import dynamic from "next/dynamic";
const CodeComp = dynamic(() => import("../components/Code/Code"), {
  ssr: false,
});

export default function Code() {
  return (
    <Layout>
      <CodeComp />
    </Layout>
  );
}
