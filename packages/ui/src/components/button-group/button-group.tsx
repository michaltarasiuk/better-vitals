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
  slots?: ReturnType<typeof buttonGroupVariants>;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
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
  children,
  className,
  fullWidth,
  isDisabled,
  orientation: orientationProp,
  size,
  variant,
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
        className={composeTwRenderProps(className, slots.base())}
        data-slot="button-group"
        isDisabled={isDisabled}
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
  ...props
}: ButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>) {
  const { slots } = useContext(ButtonGroupContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="button-group-separator"
      {...(props as ComponentProps<typeof dom.span>)}
    />
  );
}

export { ButtonGroupContext, ButtonGroupRoot, ButtonGroupSeparator };

export type { ButtonGroupRootProps, ButtonGroupSeparatorProps };
