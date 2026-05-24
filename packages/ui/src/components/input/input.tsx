"use client";

import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";
import { Input as InputPrimitive } from "react-aria-components/Input";

import { cnRenderProps } from "../../utils/cn-render-props";
import { TextFieldContext } from "../textfield";
import type { InputVariants } from "./input.variants";
import { inputVariants } from "./input.variants";

interface InputRootProps
  extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

function InputRoot({
  variant: variantProp,
  fullWidth,
  type,
  name,
  className,
  ...rest
}: InputRootProps) {
  const textFieldContext = useContext(TextFieldContext);

  const variant = variantProp ?? textFieldContext.variant;

  return (
    <InputPrimitive
      data-slot="input"
      type={type}
      name={name}
      className={cnRenderProps(
        className,
        inputVariants({ fullWidth, variant })
      )}
      {...rest}
    />
  );
}

export { InputRoot };

export type { InputRootProps };
