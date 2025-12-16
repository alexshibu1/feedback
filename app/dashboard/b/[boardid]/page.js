import connectMongoose from "@/app/libs/mongoose";
import Board from "@/app/models/Board";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import BackButton from "./BackButton";
import CardBoardLink from "@/app/compondents/cardboardlink";
import ButtonDeleteBoard from "@/app/compondents/buttondeleteboard";

const getBoard = async (boardid) => {
  try {
    await connectMongoose();
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(boardid)) {
      console.error("Invalid board ID format:", boardid);
      return null;
    }

    // Use findById which automatically handles ObjectId conversion
    const board = await Board.findById(boardid);

    // Verify the board belongs to the current user
    if (!board || board.userId.toString() !== session.user.id) {
      return null;
    }

    return board;
  } catch (error) {
    console.error("Error fetching board:", error);
    return null;
  }
};

export default async function FeedbackBoard(params) {
  const resolvedParams = await params;
  const boardid = resolvedParams?.boardid || resolvedParams?.params?.boardid;

  if (!boardid) {
    console.error("Board ID is missing from params:", resolvedParams);
    redirect("/dashboard");
  }

  const board = await getBoard(boardid);

  if (!board) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
      <section className="w-full max-w-3xl space-y-6">
        {/* Header with back button */}
        <header className="bg-base-100 rounded-2xl px-6 py-4 shadow-sm border border-base-200">
          <div className="flex items-center justify-between mb-4">
            <BackButton />
            <ButtonDeleteBoard boardid={board._id.toString()} />
          </div>
          <h1 className="text-2xl font-bold">{board.name}</h1>
        </header>

        {/* Main content area */}
        <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-200">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Board Details</h2>
              <p className="text-base-content/70">
                This is your feedback board. Start collecting feedback here!
              </p>
            </div>
          </div>
        </div>
        <section className="bg-base-100 p-6 rounded-2xl hover:bg-base-200 transition-colors">
          {" "}
          <CardBoardLink boardid={board._id} />
        </section>
      </section>
    </main>
  );
}
