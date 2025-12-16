import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongoose from "@/app/libs/mongoose";
import User from "@/app/models/Users";
import Board from "@/app/models/Board";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoose();
    const user = await User.findById(session.user.id);
    const board = await Board.create({ name: body.name, userId: user._id });
    user.boards.push(board._id);
    await user.save();
    return NextResponse.json(board);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // Get boardid from search params
    const { searchParams } = new URL(req.url);
    const boardid = searchParams.get("boardid");

    if (!boardid) {
      return NextResponse.json(
        { message: "Board ID is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoose();

    // Delete the board (only if it belongs to the user)
    const deletedBoard = await Board.deleteOne({
      _id: boardid,
      userId: session?.user?.id,
    });

    // Check if board was found and deleted
    if (deletedBoard.deletedCount === 0) {
      return NextResponse.json(
        { message: "Board not found or unauthorized" },
        { status: 404 }
      );
    }

    // Remove board ID from user's boards array
    const user = await User.findById(session?.user?.id);
    user.boards = user.boards.filter((id) => id.toString() !== boardid);
    await user.save();

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
