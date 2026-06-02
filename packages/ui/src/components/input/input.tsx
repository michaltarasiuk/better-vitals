"use client";

import {
  Input as RACInput,
  type InputProps as RACInputProps,
} from "react-aria-components/Input";

import { cnRenderProps } from "../../utils/cn-render-props";
import { useTextFieldContext } from "../textfield";
import { inputVariants, type InputVariants } from "./input.ts";

interface InputProps extends RACInputProps, InputVariants {}

function Input({ variant, fullWidth, className, ...rest }: InputProps) {
  const textFieldContext = useTextFieldContext();
  return (
    <RACInput
      data-slot="input"
      className={cnRenderProps(
        className,
        inputVariants({
          fullWidth,
          variant: variant ?? textFieldContext.variant,
        })
      )}
      {...rest}
    />
  );
}

export { Input };
export type { InputProps };
