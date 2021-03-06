import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

function useStorage<T>(
  storageKey: string,
  defaultValue: T
): [T, (val: T) => void] {
  const [storageItem, setStorageItem] = useState(defaultValue);
  const { getItem, setItem } = useAsyncStorage(storageKey);

  async function setStoredValue(value: T) {
    try {
      await setItem(JSON.stringify(value));
      setStorageItem(value);
    } catch (e) {}
  }

  useEffect(() => {
    async function getStoredValue() {
      try {
        const data = await getItem();
        if (typeof data === "string") setStorageItem(JSON.parse(data));
      } catch (e) {}
    }

    getStoredValue();
  }, []);

  return [
    storageItem !== undefined ? storageItem : defaultValue,
    setStoredValue,
  ];
}

export default useStorage;
