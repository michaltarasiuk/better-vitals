"use client";

import type { ButtonGroupVariants } from "@lite-app/styles/components/button-group";
import { buttonGroupVariants } from "@lite-app/styles/components/button-group";
import type {
  Attributes,
  ComponentProps,
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import React, {
  Children,
  createContext,
  isValidElement,
  useContext,
} from "react";
import { Group } from "react-aria-components/Group";
import { useSlottedContext } from "react-aria-components/slots";
import { ToggleButtonGroupContext as RACToggleButtonGroupContext } from "react-aria-components/ToggleButtonGroup";

import {
  composeSlotClassName,
  composeTwRenderProps,
} from "../../utils/compose";
import type { DOMRenderProps } from "../../utils/dom";
import { dom } from "../../utils/dom";
import type { ButtonProps } from "../button";

interface ButtonGroupContext {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
  slots?: ReturnType<typeof buttonGroupVariants>;
}

const ButtonGroupContext = createContext<ButtonGroupContext>({});

export const BUTTON_GROUP_CHILD = "__button_group_child";

interface ButtonGroupRootProps
  extends
    ComponentPropsWithRef<typeof Group>,
    Pick<ButtonProps, "size" | "variant">,
    ButtonGroupVariants {
  orientation?: "horizontal" | "vertical";
}

function ButtonGroupRoot({
  variant,
  size,
  orientation: orientationProp,
  isDisabled,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonGroupRootProps) {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation =
    orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = React.useMemo(
    () => buttonGroupVariants({ fullWidth, orientation }),
    [fullWidth, orientation]
  );

  const wrappedChildren = Children.map(children as React.ReactNode, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    return React.cloneElement(child, {
      [BUTTON_GROUP_CHILD]: true,
    } as Attributes);
  });

  return (
    <ButtonGroupContext value={{ fullWidth, isDisabled, size, slots, variant }}>
      <Group
        data-slot="button-group"
        isDisabled={isDisabled}
        className={composeTwRenderProps(className, slots.base())}
        {...rest}
      >
        {wrappedChildren}
      </Group>
    </ButtonGroupContext>
  );
}

interface ButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ButtonGroupSeparator<
  E extends keyof React.JSX.IntrinsicElements = "span",
>({
  className,
  ...rest
}: ButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>) {
  const { slots } = useContext(ButtonGroupContext);

  return (
    <dom.span
      data-slot="button-group-separator"
      className={composeSlotClassName(slots?.separator, className)}
      aria-hidden="true"
      {...(rest as ComponentProps<typeof dom.span>)}
    />
  );
}

export { ButtonGroupContext, ButtonGroupRoot, ButtonGroupSeparator };

export type { ButtonGroupRootProps, ButtonGroupSeparatorProps };
