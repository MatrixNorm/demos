import { useEffect, useRef, useState } from "react";

type ReturnTuple<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (attr: keyof T | null) => boolean,
  () => any
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

  const getDelta = () => {
    const delta = {};
    for (let attr of Object.keys(storeValue)) {
      //@ts-ignore
      if (localValue[attr] !== storeValue[attr]) {
        //@ts-ignore
        delta[attr] = localValue[attr];
      }
    }
    return delta;
  };

  return [localValue, setLocalValue, isEdited, getDelta];
}
