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
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${
            60 * 60 * 12 * 7 * 1000 // 7 days in milliseconds
          }`,
        },
      }
    );
    return response;
// coment
  
}