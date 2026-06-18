import * as Aria from "react-aria-components/FieldError";

import { cnRenderProps } from "../../utils/cn-render-props";
import { fieldErrorVariants, type FieldErrorVariants } from "./field-error";

interface FieldErrorProps extends Aria.FieldErrorProps, FieldErrorVariants {}

export function FieldError({ children, className, ...rest }: FieldErrorProps) {
  return (
    <Aria.FieldError
      data-slot="field-error"
      className={cnRenderProps(className, fieldErrorVariants())}
      {...rest}
    >
      {children}
    </Aria.FieldError>
  );
}
