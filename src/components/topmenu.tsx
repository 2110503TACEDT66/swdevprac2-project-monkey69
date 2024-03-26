import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomeIcon from "@mui/icons-material/Home";

export default async function Topmenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] fixed top-0 left-0 right-0 z-30 flex bg-gray-300 justify-between">
      <div className="flex flex-row p-2 items-center space-x-4 ml-3">
        <Link href="/">
          <div className="bg-blue-800 p-2 rounded-full">
            <HomeIcon style={{ fontSize: 30, color: "white" }} />
          </div>
        </Link>
        <Link href="/profile">Profile</Link>
        <Link href="/booking">Booking</Link>
        <Link href="/dentist">Dentist</Link>
      </div>
      {session ? (
        <div className="flex flex-row p-2 items-center space-x-4 mr-3">
          <Link href="/api/auth/signout">Sign-Out</Link>
        </div>
      ) : (
        <div className="flex flex-row p-2 items-center space-x-4 mr-3">
          <Link href="/api/auth/signin">Sign-In</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
