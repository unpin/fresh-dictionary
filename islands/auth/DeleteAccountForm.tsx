import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function DeleteUserForm() {
  const [password, setPassword] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>) => {
    // TODO move fetch to UserService and handle and display errors
    e.preventDefault();
    fetch("/auth/delete", {
      method: "POST",
      body: JSON.stringify({
        password,
      }),
    }).then((res) => {
      if (res.status === 204) {
        setIsDeleted(true);
        setTimeout(() => {
          self.location.replace(self.location.origin);
        }, 5000);
      }
    });
  };
  return (
    <div>
      {isDeleted
        ? <h1>Account has been successfully deleted</h1>
        : (
          <form onSubmit={onSubmit}>
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
            <button class="btn btn-danger">Delete account</button>
          </form>
        )}
    </div>
  );
}
