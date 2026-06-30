import { XIcon } from "lucide-react";
import * as Aria from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { cnRenderProps } from "../../lib/cn-render-props";
import { closeButtonVariants, type CloseButtonVariants } from "./close-button";

export interface CloseButtonProps
  extends Aria.ButtonProps, CloseButtonVariants {}

export function CloseButton({
  children,
  variant,
  className,
  ...rest
}: CloseButtonProps) {
  return (
    <Aria.Button
      data-slot="close-button"
      className={cnRenderProps(
        className,
        closeButtonVariants({
          variant,
        })
      )}
      {...rest}
    >
      {composeRenderProps(
        children,
        (userChildren) => userChildren ?? <XIcon aria-hidden />
      )}
    </Aria.Button>
  );
}
