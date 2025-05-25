import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { parseJWT } from "../services/JWTService.ts";
import { getCookie } from "../services/ClientService.ts";

interface UserAuth {
  isLogged: boolean;
  isAdmin: boolean;
  _id: string;
  name: string;
  email: string;
}

interface AuthCookie {
  _id: string;
  email: string;
  name: string;
  userRole: string;
}

export function useAuth(): [UserAuth] {
  const auth = useSignal<UserAuth>({
    isLogged: false,
    isAdmin: false,
    _id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const cookie = getCookie("authToken");
    if (!cookie) return;
    const authToken: AuthCookie = parseJWT(cookie);
    if (!authToken) return;
    auth.value = {
      isLogged: true,
      isAdmin: authToken.userRole === "admin",
      _id: authToken._id,
      name: authToken.name,
      email: authToken.email,
    };
  }, []);

  return [auth.value];
}
