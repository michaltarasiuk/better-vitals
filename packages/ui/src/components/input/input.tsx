"use client";

import type { InputVariants } from "@lite-app/styles/components/input";
import { inputVariants } from "@lite-app/styles/components/input";
import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";
import { Input as InputPrimitive } from "react-aria-components/Input";

import { composeTwRenderProps } from "../../utils/compose";
import { ComboBoxContext } from "../combo-box";
import { TextFieldContext } from "../textfield";

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
  const comboBoxContext = useContext(ComboBoxContext);

  const variant =
    variantProp ?? textFieldContext.variant ?? comboBoxContext.variant;

  return (
    <InputPrimitive
      data-slot="input"
      type={type}
      name={name}
      className={composeTwRenderProps(
        className,
        inputVariants({ fullWidth, variant })
      )}
      {...rest}
    />
  );
}

export { InputRoot };

export type { InputRootProps };
