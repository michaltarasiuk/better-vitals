import * as Aria from "react-aria-components/Input";

import { cnRenderProps } from "../../utils/cn-render-props";
import { useTextFieldContext } from "../textfield";
import { inputVariants, type InputVariants } from "./input";

export interface InputProps extends Aria.InputProps, InputVariants {}

export function Input({ variant, fullWidth, className, ...rest }: InputProps) {
  const textFieldContext = useTextFieldContext();
  return (
    <Aria.Input
      data-slot="input"
      className={cnRenderProps(
        className,
        inputVariants({
          variant: variant ?? textFieldContext.variant,
          fullWidth,
        })
      )}
      {...rest}
    />
  );
}
