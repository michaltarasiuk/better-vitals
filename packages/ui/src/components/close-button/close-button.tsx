"use client";

import { composeRenderProps } from "react-aria-components";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";
import { CloseIcon } from "../icons";
import {
  closeButtonVariants,
  type CloseButtonVariants,
} from "./close-button.variants";

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
          userChildren ?? <CloseIcon data-slot="close-button-icon" />
      )}
    </RACButton>
  );
}

export { CloseButton };
export type { CloseButtonProps };
