import { isDefined } from "@lite-app/shared/is-defined";
import { ArrowUpRightIcon } from "lucide-react";
import * as Aria from "react-aria-components/Link";

import { cnRenderProps } from "../../utils/cn-render-props";
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

export interface LinkIconProps extends React.ComponentProps<"span"> {}

export function LinkIcon({ children, className, ...rest }: LinkIconProps) {
  return (
    <span
      data-slot="link-icon"
      data-default-icon={!isDefined(children)}
      className={slots.icon({
        className,
      })}
      {...rest}
    >
      {children ?? <ArrowUpRightIcon aria-hidden size={9} />}
    </span>
  );
}
