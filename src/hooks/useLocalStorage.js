import { useEffect, useState } from "react";

export function useLocalStorage(key, startValue) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // setValue(value);
  }, [value, key]);

  return [value, setValue];
}
