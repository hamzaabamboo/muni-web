import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { LocalStorage } from "./localStorage";

export const useLocalStorage = function <T>(
  key: string,
  initial: T | null = null
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const storage = new LocalStorage<T>(key);
  const [data, setData] = useState<T | null>(storage.value || initial);

  const setNewData: Dispatch<SetStateAction<T | null>> = (
    s: SetStateAction<T | null>
  ) => {
    const newData = typeof s === "function" ? s.call(this, data) : s;
    storage.value = newData;
    setData(newData);
  };

  const updateValue = (key: string) => (storageEvent: StorageEvent) => {
    if (storageEvent.key === key) {
      setData(JSON.parse(storageEvent.newValue || ""));
    }
  };

  useEffect(() => {
    window.addEventListener("storage", updateValue(key));
    return () => {
      window.removeEventListener("storage", updateValue(key));
    };
  }, [key]);

  return [data, setNewData];
};
