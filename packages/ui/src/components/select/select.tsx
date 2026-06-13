"use client";

import { createContext } from "@lite-app/shared/create-context";
import { ChevronDownIcon } from "lucide-react";
import { use } from "react";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import {
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
} from "react-aria-components/Popover";
import {
  Select as RACSelect,
  SelectValue as RACSelectValue,
  SelectStateContext,
  type SelectProps as RACSelectProps,
  type SelectValueProps as RACSelectValueProps,
} from "react-aria-components/Select";

import { cnRenderProps } from "../../utils/cn-render-props";
import { SurfaceContext } from "../surface";
import { selectVariants, type SelectVariants } from "./select.ts";

const slots = selectVariants();

interface SelectContextValue extends SelectVariants {}

const [SelectContext, useSelectContext] =
  createContext<SelectContextValue>("SelectContext");

export interface SelectProps<
  T extends object,
  M extends "single" | "multiple" = "single",
>
  extends RACSelectProps<T, M>, SelectVariants {}

export function Select<
  T extends object = object,
  M extends "single" | "multiple" = "single",
>({ children, variant, fullWidth, className, ...rest }: SelectProps<T, M>) {
  return (
    <SelectContext
      value={{
        fullWidth,
        variant,
      }}
    >
      <RACSelect
        data-slot="select"
        className={cnRenderProps(
          className,
          slots.base({
            fullWidth,
            variant,
          })
        )}
        {...rest}
      >
        {children}
      </RACSelect>
    </SelectContext>
  );
}

export interface SelectTriggerProps extends RACButtonProps {}

export function SelectTrigger({
  children,
  className,
  ...rest
}: SelectTriggerProps) {
  const { fullWidth, variant } = useSelectContext();
  return (
    <RACButton
      data-slot="select-trigger"
      className={cnRenderProps(
        className,
        slots.trigger({
          fullWidth,
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACButton>
  );
}

export interface SelectValueProps<
  T extends object = object,
> extends RACSelectValueProps<T> {}

export function SelectValue<T extends object = object>({
  children,
  className,
  ...rest
}: SelectValueProps<T>) {
  return (
    <RACSelectValue
      data-slot="select-value"
      className={cnRenderProps(className, slots.value())}
      {...rest}
    >
      {children}
    </RACSelectValue>
  );
}

export interface SelectIndicatorProps extends React.ComponentProps<"span"> {}

export function SelectIndicator({
  children,
  className,
  ...rest
}: SelectIndicatorProps) {
  const state = use(SelectStateContext);
  const isOpen = state?.isOpen ?? false;

  return (
    <span
      data-slot="select-indicator"
      data-expanded={isOpen}
      className={slots.indicator({
        className,
      })}
      {...rest}
    >
      {children ?? <ChevronDownIcon aria-hidden size={16} />}
    </span>
  );
}

export interface SelectPopoverProps extends RACPopoverProps {}

export function SelectPopover({
  children,
  placement = "bottom",
  className,
  ...rest
}: SelectPopoverProps) {
  return (
    <SurfaceContext
      value={{
        variant: "default",
      }}
    >
      <RACPopover
        data-slot="select-popover"
        className={cnRenderProps(className, slots.popover())}
        placement={placement}
        {...rest}
      >
        {children}
      </RACPopover>
    </SurfaceContext>
  );
}
