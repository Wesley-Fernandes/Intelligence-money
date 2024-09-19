"use server"
import { cookies } from "next/headers";

export const logout = async ()=>{
  const start = cookies().get("token")?.value;
  console.log("start token: ", start)
  cookies().delete("token");
  const end = cookies().get("token")?.value;
  console.log("end token: ", end)
}