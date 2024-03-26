import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function GetUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const token = session.user.token;

  const respone = await fetch("http://localhost:5000/api/v1/auth/me", {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!respone.ok) return new Error("Failed to fetch");
  return await respone.json();
}
