const URL = Deno.env.get("URL") || "http://localhost:8000";

export async function signIn(email: string, password: string) {
  const response = await fetch(`${URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log({ email, password });

  if (response.status === 400) {
    throw new Error("Password is incorrect");
  } else if (response.status !== 200) {
    throw new Error("Something went wrong, try again");
  }
  return await response.json();
}

export async function findUser(email: string) {
  const response = await fetch(`${URL}/auth/email`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (response.status === 404) {
    throw new Error(`User with the email ${email} not found`);
  } else if (response.status !== 200) {
    throw new Error("Something went wrong, try again");
  }
  return await response.json();
}
