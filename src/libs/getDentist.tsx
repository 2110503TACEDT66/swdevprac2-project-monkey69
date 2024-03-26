export default async function GetDentists(token: string) {
  const respone = await fetch("http://localhost:5000/api/v1/dentists", {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!respone.ok) return new Error("Failed to fetch");
  return await respone.json();
}
