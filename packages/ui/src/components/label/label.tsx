import * as Aria from "react-aria-components/Label";

import { labelVariants, type LabelVariants } from "./label";

interface LabelProps extends Aria.LabelProps, LabelVariants {}

export function Label({
  children,
  isRequired,
  isInvalid,
  isDisabled,
  className,
  ...rest
}: LabelProps) {
  return (
    <Aria.Label
      data-slot="label"
      className={labelVariants({
        className,
        isDisabled,
        isInvalid,
        isRequired,
      })}
      {...rest}
    >
      {children}
    </Aria.Label>
  );
}
