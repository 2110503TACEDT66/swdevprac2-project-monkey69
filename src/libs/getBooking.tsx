export default async function GetBooking(token: string) {
    const respone = await fetch(`http://localhost:5000/api/v1/bookings`, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
  
    console.log(respone);
    if (!respone.ok) {
      
      return new Error("Failed to fetch");
    } 
    return await respone.json();
  }
  