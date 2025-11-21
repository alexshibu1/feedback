import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello World</h1>
      </div>
      <Link href="/dashboard">Dashboard fix</Link>
    </main>
  );
}
