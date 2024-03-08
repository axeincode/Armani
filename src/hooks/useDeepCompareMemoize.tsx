import { useEffect, useState, useRef } from "react";
import { isEmpty, isEqual, get } from "lodash";

const useDeepCompareMemoize = (value: any) => {
  const ref = useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const deepValue = useDeepCompareMemoize(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(deepValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [deepValue, delay]);

  return debouncedValue;
};

export default useDebounce;
