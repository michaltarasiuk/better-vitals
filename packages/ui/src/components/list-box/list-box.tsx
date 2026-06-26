import { createContext } from "@better-vitals/shared/create-context";
import * as Aria from "react-aria-components/ListBox";

import { cnRenderProps } from "../../lib/cn-render-props";
import { listboxVariants, type ListBoxVariants } from "./list-box";

const slots = listboxVariants();

interface ListBoxItemContextValue extends ListBoxVariants {
  isSelected: boolean;
}

const [ListBoxItemContext, useListBoxItemContext] =
  createContext<ListBoxItemContextValue>("ListBoxItemContext");

export interface ListBoxProps<T extends object> extends Aria.ListBoxProps<T> {}

export function ListBox<T extends object>({
  children,
  className,
  ...rest
}: ListBoxProps<T>) {
  return (
    <Aria.ListBox
      data-slot="list-box"
      className={cnRenderProps(className, slots.base())}
      {...rest}
    >
      {children}
    </Aria.ListBox>
  );
}

export interface ListBoxItemProps
  extends Aria.ListBoxItemProps, ListBoxVariants {}

export function ListBoxItem({
  children,
  variant,
  className,
  ...rest
}: ListBoxItemProps) {
  return (
    <Aria.ListBoxItem
      data-slot="list-box-item"
      className={cnRenderProps(
        className,
        slots.item({
          variant,
        })
      )}
      {...rest}
    >
      {(renderProps) => (
        <ListBoxItemContext
          value={{
            variant,
            isSelected: renderProps.isSelected,
          }}
        >
          {typeof children === "function" ? children(renderProps) : children}
        </ListBoxItemContext>
      )}
    </Aria.ListBoxItem>
  );
}

export interface ListBoxItemIndicatorProps extends React.ComponentProps<"span"> {}

export function ListBoxItemIndicator({
  children,
  className,
  ...rest
}: ListBoxItemIndicatorProps) {
  const { isSelected, variant } = useListBoxItemContext();
  return (
    <span
      aria-hidden
      data-slot="list-box-item-indicator"
      className={slots.indicator({
        variant,
        className,
      })}
      {...rest}
    >
      {children ?? (
        <svg
          aria-hidden
          data-slot="list-box-item-indicator--checkmark"
          fill="none"
          role="presentation"
          stroke="currentColor"
          strokeDasharray={22}
          strokeDashoffset={isSelected ? 44 : 66}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 17 18"
        >
          <polyline points="1 9 7 14 15 4" />
        </svg>
      )}
    </span>
  );
}
