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
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
