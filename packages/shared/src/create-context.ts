import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

import { isDefined } from "./is-defined";

export function createContext<T>(displayName: string) {
  const Context = createReactContext<T | null>(null);
  Context.displayName = displayName;

  function useContext() {
    const value = useReactContext(Context);
    if (!isDefined(value)) {
      throw new Error(`${displayName} must be used within its provider`);
    }
    return value;
  }

  return [Context, useContext] as const;
}
