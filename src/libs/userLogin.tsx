export default async function UserLogin(email: string, password: string) {
  const respone = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!respone.ok) throw new Error("Failed to fetch");

  const lastRes = await respone.json();
  return lastRes;
}
