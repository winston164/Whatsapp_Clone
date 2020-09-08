import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone-";

// custom hook for persistent state, similar to useState with a key

export default function useLocalStorage(key, initialValue) {
  // We add a prefix in case of collision with other apps
  const prefixedKey = PREFIX + key;

  // the main hook
  const [value, setValue] = useState(() => {
    // Get item from local storage
    const jsonValue = localStorage.getItem(prefixedKey);

    // If key exists in local storag return the JSON
    if (jsonValue != null) return JSON.parse(jsonValue);

    // If the key does not exists
    // if the initial value is a function return its result
    if (typeof initialValue === "function") {
      return initialValue();
    }
    // Otherwise return the initial value
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
