import { useRef } from "react";

export function useRenderCount(): number {
  const renderCount = useRef(0);

  // Increment on every render
  renderCount.current += 1;

  return renderCount.current;
}
