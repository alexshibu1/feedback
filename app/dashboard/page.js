import ButtonLogout from "../compondents/buttonlogout";
import FormNewBoard from "../compondents/formnewboard";
import { auth } from "@/auth";
import connectMongo from "../libs/mongoose";
import User from "@/app/models/Users";
import Link from "next/link";
import buttonCheckout from "../compondents/buttonnCheckout";

async function getUserBoards() {
  const session = await auth();
  await connectMongo();

  return await User.findById(session.user.id).populate("boards");
}
export default async function Dashboard() {
  const user = await getUserBoards();

  if (!user) {
    return (
      <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
        <section className="w-full max-w-3xl space-y-6">
          <header className="bg-base-100 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <ButtonLogout />
          </header>
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  const boards = user.boards || [];

  return (
    <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
      <section className="w-full max-w-3xl space-y-6">
        <header className="bg-base-100 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <ButtonLogout />
        </header>

        <section>
          <FormNewBoard />

          <div className="mt-6">
            <h1 className="font-extrabold text-xl mb-4">
              {boards.length} {boards.length === 1 ? "Board" : "Boards"}
            </h1>
            {boards.length > 0 ? (
              <ul className="space-y-2">
                {boards.map((board) => {
                  return (
                    <li key={board._id.toString()} className="mb-2">
                      <Link
                        href={`/dashboard/b/${board._id.toString()}`}
                        className="block bg-base-100 p-6 rounded-2xl hover:bg-base-200 transition-colors"
                      >
                        {board.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-base-content/70">
                No boards yet. Create one above!
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
