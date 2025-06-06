// lib/authUtils.ts

import Cookies from "js-cookie";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null; 
  }

  return Cookies.get("token") ?? null; 
}