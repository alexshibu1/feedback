import Image from "next/image";
import ButtonLogin from "./compondents/buttonlogin";
export default function Home() {
  const isLoggedIn = false;
  return (
    <main>
      <div>
        <h1>Hello World</h1>
      </div>{" "}
      <ButtonLogin isLoggedIn={isLoggedIn}>Login</ButtonLogin>{" "}
    </main>
  );
}
