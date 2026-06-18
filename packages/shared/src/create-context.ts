import { createContext as createReactContext, use, type Context } from "react";

export function createContext<T>(displayName: string) {
  const initialValue = Symbol(displayName);

  const Context = createReactContext<T | typeof initialValue>(initialValue);
  Context.displayName = displayName;

  function useContext() {
    const value = use(Context);
    if (value === initialValue) {
      throw new Error(`${displayName} must be used within its provider`);
    }
    return value;
  }

  return [Context as Context<T>, useContext] as const;
}
