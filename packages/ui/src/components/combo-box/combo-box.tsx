"use client";

import type { ComboBoxVariants } from "@lite-app/styles/components/combo-box";
import { comboBoxVariants } from "@lite-app/styles/components/combo-box";
import type { ComponentPropsWithRef, ReactNode } from "react";
import React, { createContext, useContext } from "react";
import type { ButtonProps } from "react-aria-components/Button";
import { Button } from "react-aria-components/Button";
import {
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  Popover as PopoverPrimitive,
} from "react-aria-components/ComboBox";

import { dataAttr } from "../../utils/assertion";
import {
  composeSlotClassName,
  composeTwRenderProps,
} from "../../utils/compose";
import { IconChevronDown } from "../icons";
import type { SurfaceVariants } from "../surface";
import { SurfaceContext } from "../surface";

interface ComboBoxContext {
  slots?: ReturnType<typeof comboBoxVariants>;
  variant?: "primary" | "secondary";
}

const ComboBoxContext = createContext<ComboBoxContext>({});

interface ComboBoxRootProps<T extends object>
  extends ComponentPropsWithRef<typeof ComboBoxPrimitive<T>>, ComboBoxVariants {
  variant?: "primary" | "secondary";
  items?: Iterable<T>;
}

function ComboBoxRoot<T extends object = object>({
  variant,
  fullWidth,
  menuTrigger = "focus",
  children,
  className,
  ...props
}: ComboBoxRootProps<T>) {
  const slots = React.useMemo(
    () => comboBoxVariants({ fullWidth }),
    [fullWidth]
  );

  return (
    <ComboBoxContext value={{ slots, variant }}>
      <ComboBoxPrimitive
        data-slot="combo-box"
        menuTrigger={menuTrigger}
        className={composeTwRenderProps(className, slots?.base())}
        {...props}
      >
        {(values) => (
          <>{typeof children === "function" ? children(values) : children}</>
        )}
      </ComboBoxPrimitive>
    </ComboBoxContext>
  );
}

interface ComboBoxInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

function ComboBoxInputGroup({
  children,
  className,
  ...props
}: ComboBoxInputGroupProps) {
  const { slots } = useContext(ComboBoxContext);
  const inputGroupClassName = composeSlotClassName(
    slots?.inputGroup,
    className
  );

  return (
    <div
      className={inputGroupClassName}
      data-slot="combo-box-input-group"
      {...props}
    >
      {children}
    </div>
  );
}

interface ComboBoxTriggerProps extends ButtonProps {
  className?: string;
  children?: ReactNode;
}

function ComboBoxTrigger({
  children,
  className,
  ...rest
}: ComboBoxTriggerProps) {
  const { slots } = useContext(ComboBoxContext);
  const state = useContext(ComboBoxStateContext);

  return (
    <Button
      data-slot="combo-box-trigger"
      data-open={dataAttr(state?.isOpen)}
      className={composeTwRenderProps(className, slots?.trigger())}
      {...rest}
    >
      {children ?? (
        <IconChevronDown data-slot="combo-box-trigger-default-icon" />
      )}
    </Button>
  );
}

interface ComboBoxPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

function ComboBoxPopover({
  placement = "bottom",
  children,
  className,
  ...props
}: ComboBoxPopoverProps) {
  const { slots } = useContext(ComboBoxContext);

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        placement={placement}
        className={composeTwRenderProps(className, slots?.popover())}
        {...props}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
}

export {
  ComboBoxContext,
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxRoot,
  ComboBoxTrigger,
};

export type {
  ComboBoxInputGroupProps,
  ComboBoxPopoverProps,
  ComboBoxRootProps,
  ComboBoxTriggerProps,
};
