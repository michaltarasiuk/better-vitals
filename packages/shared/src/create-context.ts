import { createContext as createReactContext, use } from "react";

import { isDefined } from "./is-defined";

export function createContext<T>(displayName: string) {
  const Context = createReactContext<T | null>(null);
  Context.displayName = displayName;

  function useContext() {
    const value = use(Context);
    if (!isDefined(value)) {
      throw new Error(`${displayName} must be used within its provider`);
    }
    return value;
  }

  return [Context, useContext] as const;
}
