import * as Aria from "react-aria-components/Menu";

import { cnRenderProps } from "../../lib/cn-render-props";
import { menuVariants, type MenuVariants } from "./menu";

const slots = menuVariants();

interface MenuProps<T> extends Aria.MenuProps<T> {}

export function Menu<T>({ children, className, ...rest }: MenuProps<T>) {
  return (
    <Aria.Menu
      data-slot="menu"
      className={cnRenderProps(className, slots.base())}
      {...rest}
    >
      {children}
    </Aria.Menu>
  );
}

interface MenuSectionProps<T> extends Aria.MenuSectionProps<T> {}

export function MenuSection<T>({ children, ...rest }: MenuSectionProps<T>) {
  return (
    <Aria.MenuSection data-slot="menu-section" {...rest}>
      {children}
    </Aria.MenuSection>
  );
}

interface MenuItemProps<T> extends Aria.MenuItemProps<T>, MenuVariants {}

export function MenuItem<T>({
  children,
  variant,
  className,
  ...rest
}: MenuItemProps<T>) {
  return (
    <Aria.MenuItem
      data-slot="menu-item"
      className={cnRenderProps(
        className,
        slots.item({
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </Aria.MenuItem>
  );
}
