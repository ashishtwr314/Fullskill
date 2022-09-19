import Image from "next/image";
import Router from "next/router";
import { LINKEDIN_URL } from "../helpers/auth";

export default function Home() {
  return (
    <div className="h-screen flex  justify-center items-center">
      <div>
        <a href={LINKEDIN_URL}>
          <div type="submit" style={{ height: "40px", width: "215px" }}>
            <Image
              width="200px"
              height="50px"
              style={{ height: "100%", width: "100%" }}
              src={
                "https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png"
              }
              alt={"LinkedIn authentification"}
            />
          </div>
        </a>
      </div>
    </div>
  );
}
