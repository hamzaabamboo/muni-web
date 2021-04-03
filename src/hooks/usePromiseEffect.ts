import { useEffect } from "react";

export const usePromiseEffect = <T = any>(
  promise: () => Promise<T> | Promise<T>,
  update: (data: T) => void
): void => {
  useEffect(() => {
    let canceled = false;
    const f = async () => {
      const res = await (typeof promise === "function" ? promise() : promise);
      if (canceled) return;
      update(res);
    };
    f();
    return () => {
      canceled = true;
    };
  }, [promise, update]);
};
