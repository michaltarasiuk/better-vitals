"use client";

import { createContext } from "@lite-app/shared/create-context";
import type { ComponentProps, ComponentType } from "react";
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Heading as RACHeading,
  type DialogProps as RACDialogProps,
  type DialogTriggerProps as RACDialogTriggerProps,
  type HeadingProps as RACHeadingProps,
} from "react-aria-components/Dialog";
import {
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  Pressable as RACPressable,
  type ModalOverlayProps as RACModalOverlayProps,
} from "react-aria-components/Modal";

import { cnRenderProps } from "../../utils/cn-render-props";
import { CloseButton, type CloseButtonProps } from "../close-button";
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import {
  alertDialogVariants,
  type AlertDialogVariants,
} from "./alert-dialog.variants";

const ALERT_DIALOG_STATUS_ICONS = {
  accent: InfoIcon,
  danger: DangerIcon,
  default: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
} satisfies Record<string, ComponentType<ComponentProps<"svg">>>;

const slots = alertDialogVariants();

interface AlertDialogContextValue extends AlertDialogVariants {
  placement?: "auto" | "top" | "center" | "bottom";
}

const [AlertDialogContext, useAlertDialogContext] =
  createContext<AlertDialogContextValue>("AlertDialogContext");

interface AlertDialogProps
  extends RACDialogTriggerProps, AlertDialogContextValue {}

function AlertDialog({
  variant,
  size,
  status,
  placement,
  children,
  ...rest
}: AlertDialogProps) {
  return (
    <AlertDialogContext
      value={{
        placement,
        size,
        status,
        variant,
      }}
    >
      <RACDialogTrigger data-slot="alert-dialog" {...rest}>
        {children}
      </RACDialogTrigger>
    </AlertDialogContext>
  );
}

export { AlertDialog };
export type { AlertDialogProps };

interface AlertDialogTriggerProps extends ComponentProps<"div"> {}

function AlertDialogTrigger({
  children,
  className,
  ...rest
}: AlertDialogTriggerProps) {
  return (
    <RACPressable>
      <div
        data-slot="alert-dialog-trigger"
        className={slots.trigger({ className })}
        {...rest}
      >
        {children}
      </div>
    </RACPressable>
  );
}

export { AlertDialogTrigger };
export type { AlertDialogTriggerProps };

interface AlertDialogBackdropProps extends RACModalOverlayProps {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

function AlertDialogBackdrop({
  children,
  className,
  onClick,
  ...rest
}: AlertDialogBackdropProps) {
  const { variant } = useAlertDialogContext();
  return (
    <RACModalOverlay
      data-slot="alert-dialog-backdrop"
      className={cnRenderProps(
        className,
        slots.backdrop({
          variant,
        })
      )}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </RACModalOverlay>
  );
}

export { AlertDialogBackdrop };
export type { AlertDialogBackdropProps };

interface AlertDialogContainerProps extends RACModalOverlayProps {}

function AlertDialogContainer({
  children,
  className,
  ...rest
}: AlertDialogContainerProps) {
  const { placement } = useAlertDialogContext();
  return (
    <RACModal
      data-slot="alert-dialog-container"
      data-placement={placement}
      className={cnRenderProps(className, slots.container())}
      {...rest}
    >
      {children}
    </RACModal>
  );
}

export { AlertDialogContainer };
export type { AlertDialogContainerProps };

interface AlertDialogDialogProps extends RACDialogProps {}

function AlertDialogDialog({
  children,
  className,
  ...rest
}: AlertDialogDialogProps) {
  const { size, placement } = useAlertDialogContext();
  return (
    <RACDialog
      role="alertdialog"
      data-slot="alert-dialog-dialog"
      data-placement={placement}
      className={slots.dialog({
        className,
        size,
      })}
      {...rest}
    >
      {children}
    </RACDialog>
  );
}

export { AlertDialogDialog };
export type { AlertDialogDialogProps };

interface AlertDialogHeaderProps extends ComponentProps<"div"> {}

function AlertDialogHeader({
  children,
  className,
  ...rest
}: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={slots.header({ className })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { AlertDialogHeader };
export type { AlertDialogHeaderProps };

interface AlertDialogHeadingProps extends RACHeadingProps {}

function AlertDialogHeading({
  children,
  className,
  ...rest
}: AlertDialogHeadingProps) {
  return (
    <RACHeading
      slot="title"
      data-slot="alert-dialog-heading"
      className={slots.heading({ className })}
      {...rest}
    >
      {children}
    </RACHeading>
  );
}

export { AlertDialogHeading };
export type { AlertDialogHeadingProps };

interface AlertDialogBodyProps extends ComponentProps<"div"> {}

function AlertDialogBody({
  children,
  className,
  ...rest
}: AlertDialogBodyProps) {
  return (
    <div
      data-slot="alert-dialog-body"
      className={slots.body({ className })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { AlertDialogBody };
export type { AlertDialogBodyProps };

interface AlertDialogFooterProps extends ComponentProps<"div"> {}

function AlertDialogFooter({
  children,
  className,
  ...rest
}: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={slots.footer({ className })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { AlertDialogFooter };
export type { AlertDialogFooterProps };

interface AlertDialogIconProps extends ComponentProps<"div"> {}

function AlertDialogIcon({
  children,
  className,
  ...rest
}: AlertDialogIconProps) {
  const { status = "danger" } = useAlertDialogContext();
  const Icon = ALERT_DIALOG_STATUS_ICONS[status];
  return (
    <div
      data-slot="alert-dialog-icon"
      className={slots.icon({
        className,
        status,
      })}
      {...rest}
    >
      {children ?? <Icon data-slot="alert-dialog-default-icon" />}
    </div>
  );
}

export { AlertDialogIcon };
export type { AlertDialogIconProps };

interface AlertDialogCloseTriggerProps extends CloseButtonProps {}

function AlertDialogCloseTrigger({
  className,
  ...rest
}: AlertDialogCloseTriggerProps) {
  return (
    <div
      data-slot="alert-dialog-close-trigger"
      className={slots.closeTrigger()}
    >
      <CloseButton slot="close" className={className} {...rest} />
    </div>
  );
}

export { AlertDialogCloseTrigger };
export type { AlertDialogCloseTriggerProps };
