import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function updateBooking(
  user: string,
  dentistId: string,
  bookDate: string,
  bookId: string,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    throw new Error("Not found token or session");

  const token = session.user.token;

  const respone = await fetch(
    `http://localhost:5000/api/v1/bookings/${bookId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookDate: bookDate,
      }),
    }
  );

  console.log(respone);

  if (!respone.ok) throw new Error("Failed to Update");

  return await respone.json();
}
