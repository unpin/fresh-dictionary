import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { findUser, signIn } from "../../services/AuthService.ts";
import Alert from "../../components/Alert.tsx";
import { ArrowLeft } from "../../components/Icon.tsx";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInHandler = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError("");
    signIn(email, password)
      .then((_) => {
        self.location.replace(self.location.origin);
      })
      .catch((error) => {
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
    setError("");
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
                    setEmail(
                      (e.target as HTMLInputElement).value.toLowerCase(),
                    )}
                />
              </div>
              <button disabled={!email} class="btn btn-primary ">
                Continue
              </button>
            </form>
            <div>
              <p class="small-text mb-1">
                Don't have an account yet? <a href="/signup">Sign up</a>
              </p>
            </div>
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
              <ArrowLeft class="icon" />
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
