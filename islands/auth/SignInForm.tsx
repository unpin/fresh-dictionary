import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { findUser, signIn } from "../../services/AuthService.ts";
import Alert from "../../components/Alert.tsx";
import { setCookie } from "$std/http/cookie.ts";

export default function SignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("german@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const signInHandler = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError("");
    signIn(email, password).then(
      ({ name, email, token }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("name", name);
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = "authToken" + "=" + (token || "") + expires +
          "; path=/";
        window.location.replace(window.location.origin);
      },
    ).catch((error: Error) => {
      setError(error.message);
    });
  };

  const continueHandler = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError("");
    findUser(email).then(({ name }) => {
      setName(name);
    })
      .catch((e: Error) => {
        setError(e.message);
      });
  };

  const clearError = () => {
    setError("");
  };

  const goBack = () => {
    setName("");
  };

  return (
    <>
      <div class="welcome-message">
        <h1>{name ? "Welcome back" : "Sign in"}</h1>
        <p class="subheader">
          {name ? "Enter your password to continue" : "to continue to Words"}
        </p>
      </div>
      {!name &&
        (
          <>
            <div>
              <button class="btn btn-social">
                <img src="/icons/google.svg" alt="" />
                Continue with Google
              </button>
            </div>

            <div class="or-separator">
              <hr />
              <span class="or-text">or</span>
              <hr />
            </div>
            <form onSubmit={continueHandler} id="signinForm">
              <div class="form-group">
                <label class="form-label" htmlFor="">Email address</label>
                <input
                  class="form-input"
                  type="text"
                  name="email"
                  value={email}
                  onInput={(e) =>
                    setEmail((e.target as HTMLInputElement).value)}
                />
              </div>
              <button class="btn btn-primary ">Continue</button>
            </form>
          </>
        )}

      {name && (
        <>
          <div class="profile-wrapper">
            <div class="profile-card">
              <div>
                <img class="profile-img" src="/profile/default.png" alt="" />
              </div>
              <div class="profile-info">
                <p class="profile-name">{name}</p>
                <p class="profile-email">{email}</p>
              </div>
            </div>
            <div class="svg-icon" onClick={goBack}>
              <img src="/icons/arrow-left.svg" alt="" />
            </div>
          </div>
          <form onSubmit={signInHandler} id="signinForm">
            <div class="form-group">
              <label class="form-label" htmlFor="">Password</label>
              <input
                class="form-input"
                type="password"
                name="password"
                value={password}
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)}
              />
            </div>
            <button disabled={!password} class="btn btn-primary ">
              Sign in
            </button>
          </form>
        </>
      )}

      {error &&
        <Alert type="error" message={error} onClose={clearError} />}
    </>
  );
}
