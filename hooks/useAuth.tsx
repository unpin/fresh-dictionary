import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { parseJWT } from "../services/JWTService.ts";
import { getCookie } from "../services/ClientService.ts";

export function useAuth(): [Record<string, unknown> | null] {
  const auth = useSignal<Record<string, unknown> | null>({
    isLogged: false,
    isAdmin: false,
  });

  useEffect(() => {
    const cookie = getCookie("authToken");
    if (!cookie) return;
    const authToken = parseJWT(cookie);
    if (!authToken) return;
    auth.value = {
      isLogged: true,
      isAdmin: authToken.userRole === "admin",
      name: authToken.name,
      email: authToken.email,
    };
  }, []);

  return [auth.value];
}
