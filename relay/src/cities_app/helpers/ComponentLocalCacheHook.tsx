import { useEffect, useRef, useState } from "react";

type ReturnTuple<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (attr: keyof T | null) => boolean
];

export function useLocalCache<T extends object>(
  storeValue: any
): ReturnTuple<T> {
  const [localValue, setLocalValue] = useState<T>(storeValue);

  const prevStoreValueJsoned = useRef<string | null>(null);
  useEffect(() => {
    const jsoned = JSON.stringify(storeValue);
    if (prevStoreValueJsoned.current !== jsoned) {
      if (prevStoreValueJsoned.current) {
        setLocalValue(storeValue);
      }
      prevStoreValueJsoned.current = jsoned;
    }
  });

  const isEdited = (attr: keyof T | null) => {
    if (attr) {
      return storeValue[attr] !== localValue[attr];
    }
    return JSON.stringify(storeValue) !== JSON.stringify(localValue);
  };

  return [localValue, setLocalValue, isEdited];
}
