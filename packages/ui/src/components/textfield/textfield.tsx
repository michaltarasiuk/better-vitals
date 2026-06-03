"use client";

import { createContext } from "@lite-app/shared/create-context";
import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";

import { cnRenderProps } from "../../utils/cn-render-props";
import { textFieldVariants, type TextFieldVariants } from "./textfield.ts";

interface TextFieldContext {
  variant?: "primary" | "secondary";
}

const [TextFieldContext, useTextFieldContext] =
  createContext<TextFieldContext>("TextFieldContext");

interface TextFieldProps
  extends RACTextFieldProps, TextFieldVariants, TextFieldContext {}

function TextField({
  variant,
  fullWidth,
  className,
  children,
  ...rest
}: TextFieldProps) {
  return (
    <TextFieldContext
      value={{
        variant,
      }}
    >
      <RACTextField
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
      </RACTextField>
    </TextFieldContext>
  );
}

export { TextField, TextFieldContext, useTextFieldContext };
export type { TextFieldProps };
