import * as Aria from "react-aria-components/Separator";
import { useSlottedContext } from "react-aria-components/slots";

import { separatorVariants, type SeparatorVariants } from "./separator";

export interface SeparatorProps
  extends Aria.SeparatorProps, SeparatorVariants {}

export function Separator({ variant, className, ...rest }: SeparatorProps) {
  const context = useSlottedContext(Aria.SeparatorContext);
  const orientation = rest.orientation ?? context?.orientation ?? "horizontal";

  return (
    <Aria.Separator
      data-slot="separator"
      className={separatorVariants({
        variant,
        orientation,
        className,
      })}
      {...rest}
      orientation={orientation}
    />
  );
}
