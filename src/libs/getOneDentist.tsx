export default async function GetDentist(id: string, token: string) {
    const respone = await fetch(`http://localhost:5000/api/v1/dentists/${id}`, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
  
    if (!respone.ok) return new Error("Failed to fetch");
    return await respone.json();
  }
  