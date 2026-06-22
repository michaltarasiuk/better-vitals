import { createContext } from "@lite-app/shared/create-context";
import { ChevronDownIcon } from "lucide-react";
import { use } from "react";
import * as Aria from "react-aria-components/Select";

import { cnRenderProps } from "../../utils/cn-render-props";
import { SurfaceContext } from "../surface";
import { selectVariants, type SelectVariants } from "./select";

const slots = selectVariants();

interface SelectContextValue extends SelectVariants {}

const [SelectContext, useSelectContext] =
  createContext<SelectContextValue>("SelectContext");

export interface SelectProps<
  T extends object,
  M extends "single" | "multiple" = "single",
>
  extends Aria.SelectProps<T, M>, SelectVariants {}

export function Select<
  T extends object = object,
  M extends "single" | "multiple" = "single",
>({ children, variant, fullWidth, className, ...rest }: SelectProps<T, M>) {
  return (
    <SelectContext
      value={{
        variant,
        fullWidth,
      }}
    >
      <Aria.Select
        data-slot="select"
        className={cnRenderProps(
          className,
          slots.base({
            variant,
            fullWidth,
          })
        )}
        {...rest}
      >
        {children}
      </Aria.Select>
    </SelectContext>
  );
}

export interface SelectTriggerProps extends Aria.ButtonProps {}

export function SelectTrigger({
  children,
  className,
  ...rest
}: SelectTriggerProps) {
  const { variant, fullWidth } = useSelectContext();
  return (
    <Aria.Button
      data-slot="select-trigger"
      className={cnRenderProps(
        className,
        slots.trigger({
          variant,
          fullWidth,
        })
      )}
      {...rest}
    >
      {children}
    </Aria.Button>
  );
}

export interface SelectValueProps<
  T extends object = object,
> extends Aria.SelectValueProps<T> {}

export function SelectValue<T extends object = object>({
  children,
  className,
  ...rest
}: SelectValueProps<T>) {
  return (
    <Aria.SelectValue
      data-slot="select-value"
      className={cnRenderProps(className, slots.value())}
      {...rest}
    >
      {children}
    </Aria.SelectValue>
  );
}

export interface SelectIndicatorProps extends React.ComponentProps<"span"> {}

export function SelectIndicator({
  children,
  className,
  ...rest
}: SelectIndicatorProps) {
  const { isOpen = false } = use(Aria.SelectStateContext) ?? {};
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

export interface SelectPopoverProps extends Aria.PopoverProps {}

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
      <Aria.Popover
        data-slot="select-popover"
        className={cnRenderProps(className, slots.popover())}
        placement={placement}
        {...rest}
      >
        {children}
      </Aria.Popover>
    </SurfaceContext>
  );
}
