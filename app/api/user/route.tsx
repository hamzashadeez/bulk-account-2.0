import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const body = {bank: "Jaiz Bank", accountNumber: "1234567890", accountName: "John Doe", phone: "1234567890"};

    const user = new User(body);

    await user.save();

    const response = NextResponse.json({
      user,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
