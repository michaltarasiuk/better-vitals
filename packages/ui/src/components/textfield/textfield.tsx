import { createContext } from "@lite-app/shared/create-context";
import * as Aria from "react-aria-components/TextField";

import { cnRenderProps } from "../../lib/cn-render-props";
import { textFieldVariants, type TextFieldVariants } from "./textfield";

interface TextFieldContextValue {
  variant?: "primary" | "secondary";
}

export const [TextFieldContext, useTextFieldContext] =
  createContext<TextFieldContextValue>("TextFieldContext");

export interface TextFieldProps
  extends Aria.TextFieldProps, TextFieldVariants, TextFieldContextValue {}

export function TextField({
  children,
  variant,
  fullWidth,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <TextFieldContext
      value={{
        variant,
      }}
    >
      <Aria.TextField
        data-slot="textfield"
        className={cnRenderProps(
          className,
          textFieldVariants({
            fullWidth,
          })
        )}
        {...rest}
      >
        {children}
      </Aria.TextField>
    </TextFieldContext>
  );
}
