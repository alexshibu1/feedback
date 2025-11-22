import Image from "next/image";
import ButtonLogin from "./compondents/buttonlogin";

export default function Home() {
  const isLoggedIn = false;
  const name = "alex";
  return (
    <main>
      <div className="bg-base-200">
        <section className="max-w-3xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold ">ideaBox</div>
          <div className="space-x-4 text-red-500 max-md:hidden">
            <a className="link link-hover"> Pricing</a>
            <a className="link link-hover"> FAQ</a>
          </div>
          <ButtonLogin isLoggedIn={isLoggedIn} />
        </section>
      </div>
      <section className="text-center py-32 p-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-4xl font-extrabold mb-6 lg:text-6xl">
            Hello {name}
          </h1>
        </div>
        <div className="mb-6 text-xl opacity-50">
          <h2>Fish out of watter</h2>
        </div>
        <ButtonLogin isLoggedIn={isLoggedIn} />
      </section>
    </main>
  );
}
