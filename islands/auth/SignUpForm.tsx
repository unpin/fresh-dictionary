import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { signUp } from "../../services/AuthService.ts";
import Alert from "../../components/Alert.tsx";

export default function SignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError("");
    signUp(name, email, password).then(
      ({ name, email, token }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email);
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = "authToken" + "=" + token + "; domain=" +
          location.hostname + "; " + expires +
          "; path=/";
        window.location.replace(window.location.origin);
      },
    ).catch((error: Error) => {
      setError(error.message);
    });
  };

  const clearError = () => {
    setError("");
  };

  return (
    <>
      <div class="welcome-message">
        <h1>Sign up</h1>
        <p class="subheader">
          Welcome to Words app
        </p>
      </div>

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
        <form onSubmit={signUpHandler} id="signinForm">
          <div class="form-group">
            <label class="form-label" htmlFor="">Name</label>
            <input
              class="form-input"
              type="text"
              name="name"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
            />
          </div>
          <div class="form-group">
            <label class="form-label" htmlFor="">Email address</label>
            <input
              class="form-input"
              type="email"
              name="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
          </div>
          <div class="form-group">
            <label class="form-label" htmlFor="">Password</label>
            <input
              class="form-input"
              type="password"
              name="email"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
          </div>
          <button class="btn btn-primary ">Continue</button>
        </form>
        <div>
          <p class="small-text my-2">
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        </div>
      </>

      {error &&
        <Alert type="error" message={error} onClose={clearError} />}
    </>
  );
}
