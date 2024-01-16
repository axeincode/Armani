"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const useCallbackRefDimensions = (): {
  dimensions: Dimensions;
  ref: React.RefObject<HTMLElement>;
  setRef: (node: HTMLElement | null) => void;
} => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 1,
    height: 2,
  });
  const ref = useRef<HTMLElement | null>(null);

  const getDimensions = () => {
    if (ref.current) {
      const newWidth = ref.current.clientWidth;
      const newHeight = ref.current.clientHeight;
      const scale = 0;
      setDimensions({
        width: Math.round(newWidth) - scale - 20,
        height: Math.round(newHeight) - 20,
      });
    }
  };

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }
    if (node) {
      // Save a reference to the node
      ref.current = node;
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      getDimensions();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getDimensions);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", getDimensions);
  }, []);

  return { dimensions, ref, setRef };
};

export default useCallbackRefDimensions;
