import ButtonLogout from "../compondents/buttonlogout";
import FormNewBoard from "../compondents/formnewboard";
import { auth } from "@/auth";
import connectMongo from "../libs/mongoose";
import User from "@/app/models/Users";

async function getUserBoards() {
  const session = await auth();
  await connectMongo();

  return await User.findById(session.user.id).populate("boards");
}
export default async function Dashboard() {
  const user = await getUserBoards();

  console.log(user);
  return (
    <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
      <section className="w-full max-w-3xl space-y-6">
        <header className="bg-base-100 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <ButtonLogout />
        </header>

        <section>
          <FormNewBoard />

          <div>
            <h1 className="font-extrabold text-xl">
              {user.boards.length} Boards
            </h1>
            <ul>
              {user.boards.map((board) => {
                return (
                  <div
                    key={board._id}
                    className="bg-base-100 p-6 rounded-3xl"
                  ></div>
                );
              })}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
