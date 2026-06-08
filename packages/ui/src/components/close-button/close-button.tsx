"use client";

import { XIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";
import {
  closeButtonVariants,
  type CloseButtonVariants,
} from "./close-button.ts";

interface CloseButtonProps extends RACButtonProps, CloseButtonVariants {}

function CloseButton({
  children,
  className,
  variant,
  ...rest
}: CloseButtonProps) {
  return (
    <RACButton
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
        (userChildren) =>
          userChildren ?? (
            <XIcon aria-hidden data-slot="close-button-icon" size={16} />
          )
      )}
    </RACButton>
  );
}

export { CloseButton };
export type { CloseButtonProps };
