import connectMongoose from "@/app/libs/mongoose";
import Board from "@/app/models/Board";
import { redirect } from "next/navigation";

const getBoard = async (boardid) => {
  await connectMongoose();
  // findById takes the ID directly as a string, not an object
  const board = await Board.findById(boardid);
  return board;
};

export default async function PublicFeedbackBoard(params) {
  const { boardid } = await params;
  const board = await getBoard(boardid);

  if (!board) {
    redirect("/");
  }

  return (
    <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
      <section className="w-full max-w-3xl">
        <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-200">
          <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
          <p className="text-base-content/70">Public Board</p>
        </div>
      </section>
    </main>
  );
}
