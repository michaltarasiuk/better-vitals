"use client";

import { TriangleIcon } from "lucide-react";
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Heading as RACHeading,
  type DialogProps as RACDialogProps,
  type DialogTriggerProps as RACDialogTriggerProps,
  type HeadingProps as RACHeadingProps,
} from "react-aria-components/Dialog";
import {
  OverlayArrow as RACOverlayArrow,
  Popover as RACPopover,
  Pressable as RACPressable,
  type OverlayArrowProps as RACOverlayArrowProps,
  type PopoverProps as RACPopoverProps,
} from "react-aria-components/Popover";

import { cnRenderProps } from "../../utils/cn-render-props";
import { SurfaceContext } from "../surface";
import { popoverVariants } from "./popover.ts";

const slots = popoverVariants();

export interface PopoverProps extends RACDialogTriggerProps {}

export function Popover({ children, ...rest }: PopoverProps) {
  return (
    <RACDialogTrigger data-slot="popover" {...rest}>
      {children}
    </RACDialogTrigger>
  );
}

export interface PopoverTriggerProps extends React.ComponentProps<"div"> {}

export function PopoverTrigger({
  children,
  className,
  ...rest
}: PopoverTriggerProps) {
  return (
    <RACPressable>
      <div
        data-slot="popover-trigger"
        className={slots.trigger({
          className,
        })}
        {...rest}
      >
        {children}
      </div>
    </RACPressable>
  );
}

export interface PopoverContentProps extends RACPopoverProps {}

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
      <RACPopover
        data-slot="popover-content"
        className={cnRenderProps(className, slots.base())}
        {...rest}
      >
        {children}
      </RACPopover>
    </SurfaceContext>
  );
}

export interface PopoverArrowProps extends RACOverlayArrowProps {}

export function PopoverArrow({ children, ...rest }: PopoverArrowProps) {
  return (
    <RACOverlayArrow data-slot="popover-overlay-arrow-group" {...rest}>
      {children ?? (
        <TriangleIcon
          aria-hidden
          data-slot="popover-overlay-arrow"
          fill="currentColor"
          size={12}
          stroke="none"
        />
      )}
    </RACOverlayArrow>
  );
}

export interface PopoverDialogProps extends RACDialogProps {}

export function PopoverDialog({
  children,
  className,
  ...rest
}: PopoverDialogProps) {
  return (
    <RACDialog
      data-slot="popover-dialog"
      className={slots.dialog({
        className,
      })}
      {...rest}
    >
      {children}
    </RACDialog>
  );
}

export interface PopoverHeadingProps extends RACHeadingProps {}

export function PopoverHeading({
  children,
  className,
  ...rest
}: PopoverHeadingProps) {
  return (
    <RACHeading
      slot="title"
      data-slot="popover-heading"
      className={slots.heading({
        className,
      })}
      {...rest}
    >
      {children}
    </RACHeading>
  );
}
