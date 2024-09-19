"use server"
import { cookies } from "next/headers";

export const logout = async ()=>{
  const start = cookies().get("token")?.value;
  console.log("start token: ", start)
  cookies().delete("token");
  const end = cookies().get("token")?.value;
  console.log("end token: ", end)
}

interface USER {
  id: string;
  name: string;
}
export const getUser = async ()=>{
  const request = await fetch("/api/auth/user", {credentials: "same-origin", method: "GET"});
  const response = await (await request.json()) as USER;

  return response
}