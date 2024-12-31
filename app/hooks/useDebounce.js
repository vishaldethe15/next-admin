import { useState, useEffect, useCallback, useRef } from "react";

function useDebounce(callback, delay) {
  const [args, setArgs] = useState([]);
  const timeoutIdRef = useRef(null);

  const debouncedCallback = useCallback(
    (...newArgs) => {
      setArgs(newArgs);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        callback(...newArgs);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

export default useDebounce;
