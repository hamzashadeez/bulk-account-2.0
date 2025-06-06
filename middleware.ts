// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyJwt } from "./lib/jwt"; // Ensure this path is correct

// // --- Configuration Constants ---
// // Paths that do NOT require authentication. Add all your public pages here.
// const PUBLIC_PATHS = [
//   "/", // Your homepage/login page
//   "/login",
//   "/register",
//   "/about",
//   "/contact",
//   // Add any other public pages (e.g., /faq, /terms, /privacy)
// ];

// // Paths that authenticated users should be redirected *away* from.
// // Typically, this includes login/register pages.
// const AUTH_REDIRECT_PATHS = [
//   "/",
//   "/login",
//   "/register",
// ];

// // Paths that *require* authentication.
// // This is typically the /dashboard and any sub-routes.
// const PROTECTED_PATHS = [
//   "/dashboard",
//   // Add other protected routes here (e.g., "/settings", "/profile")
// ];

// // API routes that *require* authentication.
// const API_PROTECTED_PREFIX = "/api/v1";

// // Paths to explicitly exclude from middleware processing.
// // This is critical to prevent "Unexpected token '<'" errors when Next.js
// // tries to load its own static assets or API routes not handled here.
// const EXCLUDE_PATHS_FROM_MIDDLEWARE = [
//   "/_next", // Next.js internal files
//   "/static", // If you have a top-level /static folder
//   "/favicon.ico",
//   "/logo.svg", // Any other specific static assets
//   // You can be more specific, e.g., "/_next/static/chunks/main.js" if needed
// ];

// // --- Custom Request Interface (for attaching user data) ---
// interface CustomNextRequest extends NextRequest {
//   user: any;
// }

// // --- Middleware Function ---
// export async function middleware(req: CustomNextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   // --- 1. Exclude static assets and internal Next.js paths ---
//   if (EXCLUDE_PATHS_FROM_MIDDLEWARE.some(path => pathname.startsWith(path))) {
//     console.log(`Middleware: Excluded path: ${pathname}`);
//     return NextResponse.next();
//   }

//   // Determine path categories
//   const isPublicPath = PUBLIC_PATHS.includes(pathname);
//   const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path));
//   const isAuthRedirectPath = AUTH_REDIRECT_PATHS.includes(pathname);
//   const isApiProtected = pathname.startsWith(API_PROTECTED_PREFIX);

//   console.log(`Middleware: Path: ${pathname}, Has Token: ${!!token}, Protected: ${isProtectedPath}, Public: ${isPublicPath}, AuthRedirect: ${isAuthRedirectPath}, API Protected: ${isApiProtected}`);

//   // --- 2. Handle cases where NO token is present ---
//   if (!token) {
//     // If the path is public (e.g., '/', '/login', '/register'), allow access.
//     // This is crucial to prevent redirect loops on the login/home page itself.
//     if (isPublicPath) {
//       console.log('Middleware: No token, on public path. Allowing access.');
//       return NextResponse.next();
//     }

//     // If the path is a protected API route, return 401 JSON.
//     if (isApiProtected) {
//       console.log('Middleware: No token, on protected API path. Returning 401.');
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 });
//     }

//     // If the path is any other protected UI route, redirect to the homepage/login.
//     if (isProtectedPath) {
//       console.log('Middleware: No token, on protected UI path. Redirecting to /.');
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // Default for any other path not explicitly handled (e.g., an invalid path),
//     // you might redirect to home or a 404 page. For simplicity, redirect to home.
//     console.log('Middleware: No token, unrecognized path. Redirecting to /.');
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // --- 3. Token IS present, now verify it ---
//   try {
//     const decoded: any = await verifyJwt(token);

//     if (decoded) {
//       // Token is valid. User is authenticated.

//       // If user is trying to access a public path meant for unauthenticated users (e.g., /login, /register),
//       // redirect them to the dashboard or their main authenticated area.
//       if (isAuthRedirectPath) {
//         console.log('Middleware: Token valid, on auth redirect path. Redirecting to /dashboard.');
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }

//       // If user is accessing a protected API route, attach user info and proceed.
//       if (isApiProtected) {
//         req.headers.set("user", JSON.stringify(decoded));
//         console.log('Middleware: Token valid, on protected API path. Allowing access.');
//         return NextResponse.next();
//       }

//       // For all other cases (e.g., already on a protected page, or a non-auth-redirect public page),
//       // attach user data and allow the request to proceed.
//       req.headers.set("user", JSON.stringify(decoded));
//       console.log('Middleware: Token valid. Allowing access.');
//       return NextResponse.next();

//     } else {
//       // Token exists but is invalid (e.g., malformed, expired, but `verifyJwt` didn't throw an error).
//       // This 'else' block implies verifyJwt returned null/false instead of throwing.
//       console.log('Middleware: Token present but verification returned null/false. Invalid token.');
//       const response = isApiProtected
//         ? NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
//         : NextResponse.redirect(new URL("/", req.url));
      
//       response.cookies.delete("token"); // Always delete invalid token
//       return response;
//     }
//   } catch (error) {
//     // An actual error occurred during JWT verification (e.g., signature mismatch, malformed JWT).
//     console.error('Middleware: JWT Verification ERROR:', error);

//     const response = isApiProtected
//       ? NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
//       : NextResponse.redirect(new URL("/", req.url));
    
//     response.cookies.delete("token"); // Always delete the problematic token
//     return response;
//   }
// }

// // --- Middleware Config ---
// export const config = {
//   // The matcher should include all paths that might need middleware processing.
//   // The `EXCLUDE_PATHS_FROM_MIDDLEWARE` logic handles explicit exclusions.
//   matcher: ["/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/jwt";

const protectedPages = ["/dashboard",]; 

interface CustomNextRequest extends NextRequest {
  user: any;
}

export async function middleware(req: CustomNextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token found, user is not signed in
    if (req.nextUrl.pathname.startsWith("/api/v1")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if the request is for a protected page
    // if (protectedPages.includes(req.nextUrl.pathname)) {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
   
    // Redirect to login page
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  try {
    const decoded:any = await verifyJwt(token);

    if (decoded) {
      // Valid token, user is signed in
      // You can attach user data to the request headers for later use
      req.headers.set("user", JSON.stringify(decoded));
      
     

      return NextResponse.next();
    } else {
      // Invalid or expired token
      // Delete the invalid cookie
      const response = NextResponse.next();
      response.cookies.delete("token");

      if (req.nextUrl.pathname.startsWith("/api/v1")) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        );
      }

      // Redirect to login page
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    // Error during verification (e.g., JWT library error)
    const response = NextResponse.next();
    response.cookies.delete("token");

    if (req.nextUrl.pathname.startsWith("/api/v1")) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Redirect to login page
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/:path*"], // updated to match all pages
};