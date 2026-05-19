"use client";

import type { ButtonGroupVariants } from "@lite-app-vitals/styles/components/button-group";
import { buttonGroupVariants } from "@lite-app-vitals/styles/components/button-group";
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

/*
 * ButtonGroup Context
 */
interface ButtonGroupContext {
  slots?: ReturnType<typeof buttonGroupVariants>;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
}

const ButtonGroupContext = createContext<ButtonGroupContext>({});

// Property name to mark direct children of ButtonGroup
export const BUTTON_GROUP_CHILD = "__button_group_child";

/*
 * ButtonGroup Root
 */
interface ButtonGroupRootProps
  extends
    ComponentPropsWithRef<typeof Group>,
    Pick<ButtonProps, "size" | "variant">,
    ButtonGroupVariants {
  /** The orientation of the button group */
  orientation?: "horizontal" | "vertical";
}

const ButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  orientation: orientationProp,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation =
    orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = React.useMemo(
    () => buttonGroupVariants({ fullWidth, orientation }),
    [fullWidth, orientation]
  );

  // Wrap only direct children with context provider
  const wrappedChildren = Children.map(children as React.ReactNode, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    // Clone the child and add the special prop
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
};

/*
 * ButtonGroup Separator
 */
interface ButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ButtonGroupSeparator = <
  E extends keyof React.JSX.IntrinsicElements = "span",
>({
  className,
  ...props
}: ButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>) => {
  const { slots } = useContext(ButtonGroupContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="button-group-separator"
      {...(props as ComponentProps<typeof dom.span>)}
    />
  );
};

/*
 * Exports
 */
export { ButtonGroupContext, ButtonGroupRoot, ButtonGroupSeparator };

export type { ButtonGroupRootProps, ButtonGroupSeparatorProps };
