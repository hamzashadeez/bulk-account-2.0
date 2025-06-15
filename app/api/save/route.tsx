import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
 
    const body = await request.json();

    const { token }: { token: string;  } = body;
    
    const response = NextResponse.json(
      {
      message: "Successfully Logged In",
      token,
      },
      {
      status: 201,
      headers: {
        // Set Max-Age to a very large value (e.g., 100 years in seconds)
        "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 365 * 100}`,
      },
      }
    );
    return response;
// coment
  
}

export async function DELETE() {
  const response = NextResponse.json(
    { message: "Token deleted" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
      },
    }
  );
  return response;
}