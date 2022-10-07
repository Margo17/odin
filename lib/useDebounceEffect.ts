import { useCallback, useEffect } from "react";

export const useDebounceEffect = (
  effect: () => void,
  delay: number,
  dependencies: any[]
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
