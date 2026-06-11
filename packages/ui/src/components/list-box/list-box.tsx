"use client";

import { createContext } from "@lite-app/shared/create-context";
import {
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxProps as RACListBoxProps,
} from "react-aria-components/ListBox";

import { cnRenderProps } from "../../utils/cn-render-props";
import { listboxVariants, type ListBoxVariants } from "./list-box.ts";

const slots = listboxVariants();

interface ListBoxItemContextValue extends ListBoxVariants {
  isSelected: boolean;
}

const [ListBoxItemContext, useListBoxItemContext] =
  createContext<ListBoxItemContextValue>("ListBoxItemContext");

interface ListBoxProps<T extends object> extends RACListBoxProps<T> {}

function ListBox<T extends object>({
  children,
  className,
  ...rest
}: ListBoxProps<T>) {
  return (
    <RACListBox
      data-slot="list-box"
      className={cnRenderProps(className, slots.base())}
      {...rest}
    >
      {children}
    </RACListBox>
  );
}

export { ListBox };
export type { ListBoxProps };

interface ListBoxItemProps extends RACListBoxItemProps, ListBoxVariants {}

function ListBoxItem({
  children,
  variant,
  className,
  ...rest
}: ListBoxItemProps) {
  return (
    <RACListBoxItem
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
            isSelected: renderProps.isSelected,
            variant,
          }}
        >
          {typeof children === "function" ? children(renderProps) : children}
        </ListBoxItemContext>
      )}
    </RACListBoxItem>
  );
}

export { ListBoxItem };
export type { ListBoxItemProps };

interface ListBoxItemIndicatorProps extends React.ComponentProps<"span"> {}

function ListBoxItemIndicator({
  children,
  className,
  ...rest
}: ListBoxItemIndicatorProps) {
  const { isSelected, variant } = useListBoxItemContext();
  return (
    <span
      aria-hidden
      data-slot="list-box-item-indicator"
      data-visible={isSelected}
      className={slots.indicator({
        className,
        variant,
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

export { ListBoxItemIndicator };
export type { ListBoxItemIndicatorProps };
