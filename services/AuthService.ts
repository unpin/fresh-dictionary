const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export async function signIn(email: string, password: string) {
  const response = await fetch(`/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status === 400) {
    throw new Error("Password is incorrect");
  } else if (response.status !== 200) {
    throw new Error("Something went wrong, try again");
  }
  return await response.json();
}

export async function signUp(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new Error("Required fields are not provided");
  } else if (password.length < 6) {
    throw new Error("Password should be at least 6 characters long");
  } else if (!EMAIL_REGEX.test(email)) {
    throw new Error("Email is not valid");
  }
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
