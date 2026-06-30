import * as Aria from "react-aria-components/Link";

import { cnRenderProps } from "../../lib/cn-render-props";
import { linkVariants, type LinkVariants } from "./link";

const slots = linkVariants();

export interface LinkProps extends Aria.LinkProps, LinkVariants {}

export function Link({ children, className, ...rest }: LinkProps) {
  return (
    <Aria.Link
      data-slot="link"
      className={cnRenderProps(className, slots.base())}
      {...rest}
    >
      {children}
    </Aria.Link>
  );
}
