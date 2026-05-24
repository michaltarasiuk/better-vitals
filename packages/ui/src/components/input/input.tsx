"use client";

import { useContext } from "react";
import type { InputProps as RACInputProps } from "react-aria-components/Input";
import { Input as InputPrimitive } from "react-aria-components/Input";

import { cnRenderProps } from "../../utils/cn-render-props";
import { TextFieldContext } from "../textfield";
import type { InputVariants } from "./input.variants";
import { inputVariants } from "./input.variants";

interface InputProps extends RACInputProps, InputVariants {}

function Input({ variant, fullWidth, className, ...rest }: InputProps) {
  const textFieldContext = useContext(TextFieldContext);
  return (
    <InputPrimitive
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
