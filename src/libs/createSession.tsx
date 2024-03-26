import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { setEngine } from "crypto";

export default async function CreateSession(bookId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    throw new Error("Not found token or session");

  const token = session.user.token;

  const respone = await fetch("http://localhost:5000/api/v1/payment/session", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bookingId: bookId,
    }),
  });

  if (!respone.ok) throw new Error("Failed to create checkout");

  const lastRes = await respone.json();
  return lastRes;
}
