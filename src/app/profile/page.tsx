import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GetUser from "@/libs/getUser";
import GetDentists from "@/libs/getDentist";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await GetUser();
  const create = new Date(profile.data.createdAt);

  const dentists = await GetDentists(session.user.token);
  const bookings = [];
  var mapDentist = new Map<string, string>();

  for (let i = 0; i < dentists.count; i++) {
    mapDentist.set(dentists.data[i]._id, dentists.data[i].name);
    const dentistBookings = dentists.data[i].bookings;
    for (let j = 0; j < dentistBookings.length; j++) {
      bookings.push(dentistBookings[j]);
    }
  }

  var userBookings = [];
  if (profile.data.role === "user") {
    userBookings = bookings.filter(
      (booking) => booking.user === profile.data._id
    );
  } else {
    userBookings = bookings;
  }

  return (
    <main>
      <h1 className="text-2xl text-center mt-[100px] font-bold">
        Welcome User
      </h1>
      <div
        className="bg-slate-100 m-5 p-5 w-[60%] mx-auto"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-2xl font-semibold ml-2">{profile.data.name}</h1>
        <table className="table-auto border-separate border-spacing-2">
          <tbody>
            <tr>
              <td className="text-xl font-semibold">Telephone:</td>
              <td className="text-xl">{profile.data.telephone}</td>
            </tr>
            <tr>
              <td className="text-xl font-semibold">Email:</td>
              <td className="text-xl">{profile.data.email}</td>
            </tr>
            <tr>
              <td className="text-xl font-semibold">Created:</td>
              <td className="text-xl">{create.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-100 m-5 p-5 w-[60%] mx-auto">
        {userBookings.length > 0 ? (
          userBookings.map((booking, index) => (
            <div
              key={booking._id}
              className="mb-5"
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                borderRadius: "10px",
              }}
            >
              <h2 className="text-left text-xl font-semibold ml-2">
                Booking {session.user.role === "user" ? "" : index}
              </h2>
              <table className="table-auto border-separate border-spacing-2">
                <tbody>
                  <tr>
                    <td className="text-xl font-semibold">Dentist:</td>
                    <td className="text-xl">
                      {mapDentist.get(booking.dentist)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xl font-semibold">Book Date:</td>
                    <td className="text-xl">
                      {new Date(booking.bookDate).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xl font-semibold">Status:</td>
                    <td className="text-xl">{booking.status}</td>
                  </tr>
                </tbody>
                <tfoot>
                  {profile.data.role === "user" ? (
                    <tr>
                      <td>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                          Checkout
                        </button>
                      </td>
                      <td>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                          Update
                        </button>
                      </td>
                      <td>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-[-110px]">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">
                          Update
                        </button>
                      </td>
                      <td>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </div>
          ))
        ) : (
          <div>
            <h3 className="text-center text-2sm text-semibold">
              You can book an appointment at the top left of the website.
            </h3>
          </div>
        )}
      </div>
    </main>
  );
}
