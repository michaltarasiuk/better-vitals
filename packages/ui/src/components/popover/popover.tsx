import { TriangleIcon } from "lucide-react";
import * as Aria from "react-aria-components";

import { cnRenderProps } from "../../utils/cn-render-props";
import { SurfaceContext } from "../surface";
import { popoverVariants } from "./popover";

const slots = popoverVariants();

export interface PopoverProps extends Aria.DialogTriggerProps {}

export function Popover({ children, ...rest }: PopoverProps) {
  return (
    <Aria.DialogTrigger data-slot="popover" {...rest}>
      {children}
    </Aria.DialogTrigger>
  );
}

export interface PopoverTriggerProps extends React.ComponentProps<"div"> {}

export function PopoverTrigger({
  children,
  className,
  ...rest
}: PopoverTriggerProps) {
  return (
    <Aria.Pressable>
      <div
        data-slot="popover-trigger"
        className={slots.trigger({
          className,
        })}
        {...rest}
      >
        {children}
      </div>
    </Aria.Pressable>
  );
}

export interface PopoverContentProps extends Aria.PopoverProps {}

export function PopoverContent({
  children,
  className,
  ...rest
}: PopoverContentProps) {
  return (
    <SurfaceContext
      value={{
        variant: "default",
      }}
    >
      <Aria.Popover
        data-slot="popover-content"
        className={cnRenderProps(className, slots.base())}
        {...rest}
      >
        {children}
      </Aria.Popover>
    </SurfaceContext>
  );
}

export interface PopoverArrowProps extends Aria.OverlayArrowProps {}

export function PopoverArrow({ children, ...rest }: PopoverArrowProps) {
  return (
    <Aria.OverlayArrow data-slot="popover-overlay-arrow-group" {...rest}>
      {children ?? (
        <TriangleIcon
          aria-hidden
          data-slot="popover-overlay-arrow"
          fill="currentColor"
          size={12}
          stroke="none"
        />
      )}
    </Aria.OverlayArrow>
  );
}

export interface PopoverDialogProps extends Aria.DialogProps {}

export function PopoverDialog({
  children,
  className,
  ...rest
}: PopoverDialogProps) {
  return (
    <Aria.Dialog
      data-slot="popover-dialog"
      className={slots.dialog({
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Dialog>
  );
}

export interface PopoverHeadingProps extends Aria.HeadingProps {}

export function PopoverHeading({
  children,
  className,
  ...rest
}: PopoverHeadingProps) {
  return (
    <Aria.Heading
      slot="title"
      data-slot="popover-heading"
      className={slots.heading({
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Heading>
  );
}
