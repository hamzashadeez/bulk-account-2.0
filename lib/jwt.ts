// lib/jwt.ts (using jose)

// import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// const secret = new TextEncoder().encode("secret");

// export async function signJwt(payload: JWTPayload): Promise<string | null> {
//   try {
//     const token = await new SignJWT(payload)
//       .setProtectedHeader({ alg: "HS256" })
//       .setIssuedAt()
//       .setExpirationTime("1h") // Token expiration time (1 hour)
//       .sign(secret);

//     console.log(token);

//     return token;
//   } catch (error) {
//     console.error("JWT signing error:", error);
//     return null;
//   }
// }

// export async function verifyJwt(token: string): Promise<JWTPayload | null> {
//   try {
//     if (!token) {
//       return null;
//     }
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (error: any) {
//     if (error && error.code === "ERR_JWT_EXPIRED") {
//       // console.log("JWT verification error: Token expired");
//       // Optionally, you can handle token deletion here if you store tokens somewhere
//       // For example, if you store tokens in a database or cache, delete it here
//       // Since this code does not persist tokens, there is nothing to delete
//       // 
//     } else {
//       console.log("JWT verification error:", error);
//     }
//     return null;
//   }
// }
