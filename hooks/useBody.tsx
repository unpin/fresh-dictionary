import { useEffect, useRef } from "preact/hooks";

export function useBody() {
  const bodyRef = useRef<HTMLBodyElement>();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      bodyRef.current = body;
    }
  }, []);

  return [bodyRef];
}
