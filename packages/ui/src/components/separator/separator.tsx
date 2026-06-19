import * as Aria from "react-aria-components/Separator";
import { useSlottedContext } from "react-aria-components/slots";

import { separatorVariants, type SeparatorVariants } from "./separator";

interface SeparatorProps extends Aria.SeparatorProps, SeparatorVariants {}

export function Separator({
  variant,
  orientation,
  className,
  ...rest
}: SeparatorProps) {
  const context = useSlottedContext(Aria.SeparatorContext);
  const resolvedOrientation =
    orientation ?? context?.orientation ?? "horizontal";

  return (
    <Aria.Separator
      data-slot="separator"
      orientation={resolvedOrientation}
      className={separatorVariants({
        variant,
        orientation: resolvedOrientation,
        className,
      })}
      {...rest}
    />
  );
}
