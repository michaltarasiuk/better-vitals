import * as Aria from "react-aria-components/Link";

import { cnRenderProps } from "../../lib/cn-render-props";
import { linkVariants, type LinkVariants } from "./link";

export interface LinkProps extends Aria.LinkProps, LinkVariants {}

export function Link({ children, className, ...rest }: LinkProps) {
  return (
    <Aria.Link
      data-slot="link"
      className={cnRenderProps(className, linkVariants())}
      {...rest}
    >
      {children}
    </Aria.Link>
  );
}
