"use client";

import { createContext } from "@lite-app/shared/create-context";
import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";

import { cnRenderProps } from "../../utils/cn-render-props";
import { textFieldVariants, type TextFieldVariants } from "./textfield.ts";

interface TextFieldContextValue {
  variant?: "primary" | "secondary";
}

export const [TextFieldContext, useTextFieldContext] =
  createContext<TextFieldContextValue>("TextFieldContext");

export interface TextFieldProps
  extends RACTextFieldProps, TextFieldVariants, TextFieldContextValue {}

export function TextField({
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
