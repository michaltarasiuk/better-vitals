import {
  createContext as createReactContext,
  useContext as useReactContext,
  type Context,
} from "react";

import { invariant } from "./invariant";

const DEFAULT_VALUE = Symbol("createContext.defaultValue");

export function createContext<T>(displayName: string) {
  const Context = createReactContext<T | typeof DEFAULT_VALUE>(DEFAULT_VALUE);
  Context.displayName = displayName;

  function useContext() {
    const value = useReactContext(Context);
    invariant(
      value !== DEFAULT_VALUE,
      `${displayName} must be used within its provider`
    );
    return value;
  }

  return [Context as Context<T>, useContext] as const;
}
