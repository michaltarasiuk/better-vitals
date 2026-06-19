import * as Aria from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";
import { buttonVariants, type ButtonVariants } from "./button";

interface ButtonProps extends Aria.ButtonProps, ButtonVariants {}

export function Button({
  children,
  variant,
  size,
  fullWidth,
  isIconOnly,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Aria.Button
      data-slot="button"
      className={cnRenderProps(
        className,
        buttonVariants({
          variant,
          size,
          fullWidth,
          isIconOnly,
        })
      )}
      {...rest}
    >
      {children}
    </Aria.Button>
  );
}
