import { useEffect, useRef, useCallback } from "react";
import { IO } from "fp-ts/IO";

export const useIfMounted = () => {
  const mounted = useRef(false);

  const ifMounted = useCallback((io: IO<void>): IO<void> => {
    return () => {
      if (mounted.current) {
        io();
      }
    };
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return ifMounted;
};
