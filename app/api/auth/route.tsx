import connectDB from "@/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/UserModel";
import bcrypt, { compareSync } from "bcryptjs";
import { signJwt } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    let adminEmail = "admin@bulk.com.ng";
    let adminPassword = "admin123456";

    const body = await request.json();

    const { email, password }: { email: string; password: string } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const token = await signJwt({ id: adminEmail });

    if (!token) {
      return NextResponse.json(
        { error: "Failed to create token" },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Successfully Logged In",
        user: {
          username: "admin",
          type: "admin",
        },
        token,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${
            60 * 60
          }`,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error while creating admin:", error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}
