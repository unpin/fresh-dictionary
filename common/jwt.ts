import { create, getNumericDate, Payload, verify } from "djwt";
import { JWT_SECRET } from "./constants.ts";

export const CRYPTO_KEY = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-512" },
  false,
  ["sign", "verify"],
);

export function signToken(payload: Payload) {
  const iat = getNumericDate(new Date());
  const exp = iat + 60 * 60 * 24;
  return create(
    { alg: "HS512", typ: "JWT" },
    { iat, exp, ...payload },
    CRYPTO_KEY,
  );
}

export function verifyToken(jwt: string) {
  return verify(jwt, CRYPTO_KEY);
}
