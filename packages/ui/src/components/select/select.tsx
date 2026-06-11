"use client";

import { createContext } from "@lite-app/shared/create-context";
import { ChevronDownIcon } from "lucide-react";
import { useContext } from "react";
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

interface SelectContextValue extends Pick<
  SelectVariants,
  "fullWidth" | "variant"
> {}

const [SelectContext, useSelectContext] =
  createContext<SelectContextValue>("SelectContext");

interface SelectProps<
  T extends object,
  M extends "single" | "multiple" = "single",
>
  extends RACSelectProps<T, M>, SelectVariants {}

function Select<
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

export { Select };
export type { SelectProps };

interface SelectTriggerProps extends RACButtonProps {}

function SelectTrigger({ children, className, ...rest }: SelectTriggerProps) {
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

export { SelectTrigger };
export type { SelectTriggerProps };

interface SelectValueProps<
  T extends object = object,
> extends RACSelectValueProps<T> {}

function SelectValue<T extends object = object>({
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

export { SelectValue };
export type { SelectValueProps };

interface SelectIndicatorProps extends React.ComponentProps<"span"> {}

function SelectIndicator({
  children,
  className,
  ...rest
}: SelectIndicatorProps) {
  const state = useContext(SelectStateContext);
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

export { SelectIndicator };
export type { SelectIndicatorProps };

interface SelectPopoverProps extends RACPopoverProps {}

function SelectPopover({
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

export { SelectPopover };
export type { SelectPopoverProps };
