import * as Aria from "react-aria-components/Separator";
import { useSlottedContext } from "react-aria-components/slots";

import { separatorVariants, type SeparatorVariants } from "./separator";

interface SeparatorProps extends Aria.SeparatorProps, SeparatorVariants {}

export function Separator({ variant, className, ...rest }: SeparatorProps) {
  const context = useSlottedContext(Aria.SeparatorContext);
  const orientation = rest.orientation ?? context?.orientation ?? "horizontal";

  return (
    <Aria.Separator
      data-slot="separator"
      orientation={orientation}
      className={separatorVariants({
        className,
        orientation,
        variant,
      })}
      {...rest}
    />
  );
}
