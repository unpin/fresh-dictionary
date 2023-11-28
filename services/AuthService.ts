export async function signIn(email: string, password: string) {
  const response = await fetch(`/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log("signIn statusText", response.statusText);

  if (response.status === 400) {
    throw new Error("Password is incorrect");
  } else if (response.status !== 200) {
    throw new Error("Something went wrong, try again");
  }
  return await response.json();
}

export async function signUp(name: string, email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (response.status === 409) {
    throw new Error(`User with the email ${email} already exists`);
  } else if (response.status !== 201) {
    throw new Error("Something went wrong, try again");
  }

  return await response.json();
}

export async function findUser(email: string) {
  const response = await fetch(`/api/auth/email`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  console.log("findUser statusText", response.statusText);

  if (response.status === 404) {
    throw new Error(`User with the email ${email} not found`);
  } else if (response.status !== 200) {
    throw new Error("Something went wrong, try again");
  }
  return await response.json();
}
