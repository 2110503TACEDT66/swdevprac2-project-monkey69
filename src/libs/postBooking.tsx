import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function postBooking(
  user: string,
  dentistId: string,
  bookDate: string
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    throw new Error("Not found token or session");

  const token = session.user.token;

  const respone = await fetch(
    `http://localhost:5000/api/v1/dentists/${dentistId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookDate: bookDate,
        user: user,
        priceId: "price_1OqCSDI73qQoyJE77VIQ8lSO",
      }),
    }
  );

  if (!respone.ok) throw new Error("Failed to Book");

  return await respone.json();
}
