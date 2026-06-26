import { createContext } from "@better-vitals/shared/create-context";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react";
import * as Aria from "react-aria-components/Modal";

import { cnRenderProps } from "../../lib/cn-render-props";
import { CloseButton, type CloseButtonProps } from "../close-button";
import { alertDialogVariants, type AlertDialogVariants } from "./alert-dialog";

const ALERT_DIALOG_STATUS_ICONS = {
  default: InfoIcon,
  accent: InfoIcon,
  danger: CircleAlertIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
} satisfies Record<string, LucideIcon>;

const slots = alertDialogVariants();

interface AlertDialogContextValue extends AlertDialogVariants {
  placement?: "auto" | "top" | "center" | "bottom";
}

const [AlertDialogContext, useAlertDialogContext] =
  createContext<AlertDialogContextValue>("AlertDialogContext");

export interface AlertDialogProps
  extends Aria.DialogTriggerProps, AlertDialogContextValue {}

export function AlertDialog({
  children,
  variant,
  size,
  status,
  placement,
  ...rest
}: AlertDialogProps) {
  return (
    <AlertDialogContext
      value={{
        variant,
        size,
        status,
        placement,
      }}
    >
      <Aria.DialogTrigger data-slot="alert-dialog" {...rest}>
        {children}
      </Aria.DialogTrigger>
    </AlertDialogContext>
  );
}

export interface AlertDialogTriggerProps extends React.ComponentProps<"div"> {}

export function AlertDialogTrigger({
  children,
  className,
  ...rest
}: AlertDialogTriggerProps) {
  return (
    <Aria.Pressable>
      <div
        data-slot="alert-dialog-trigger"
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

export interface AlertDialogBackdropProps extends Aria.ModalOverlayProps {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

export function AlertDialogBackdrop({
  children,
  className,
  onClick,
  ...rest
}: AlertDialogBackdropProps) {
  const { variant } = useAlertDialogContext();
  return (
    <Aria.ModalOverlay
      data-slot="alert-dialog-backdrop"
      className={cnRenderProps(
        className,
        slots.backdrop({
          variant,
        })
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Aria.ModalOverlay>
  );
}

export interface AlertDialogContainerProps extends Aria.ModalOverlayProps {}

export function AlertDialogContainer({
  children,
  className,
  ...rest
}: AlertDialogContainerProps) {
  const { placement } = useAlertDialogContext();
  return (
    <Aria.Modal
      data-slot="alert-dialog-container"
      data-placement={placement}
      className={cnRenderProps(className, slots.container())}
      {...rest}
    >
      {children}
    </Aria.Modal>
  );
}

export interface AlertDialogDialogProps extends Aria.DialogProps {}

export function AlertDialogDialog({
  children,
  className,
  ...rest
}: AlertDialogDialogProps) {
  const { size, placement } = useAlertDialogContext();
  return (
    <Aria.Dialog
      role="alertdialog"
      data-slot="alert-dialog-dialog"
      data-placement={placement}
      className={slots.dialog({
        size,
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Dialog>
  );
}

export interface AlertDialogHeaderProps extends React.ComponentProps<"div"> {}

export function AlertDialogHeader({
  children,
  className,
  ...rest
}: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={slots.header({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface AlertDialogHeadingProps extends Aria.HeadingProps {}

export function AlertDialogHeading({
  children,
  className,
  ...rest
}: AlertDialogHeadingProps) {
  return (
    <Aria.Heading
      slot="title"
      data-slot="alert-dialog-heading"
      className={slots.heading({
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Heading>
  );
}

export interface AlertDialogBodyProps extends React.ComponentProps<"div"> {}

export function AlertDialogBody({
  children,
  className,
  ...rest
}: AlertDialogBodyProps) {
  return (
    <div
      data-slot="alert-dialog-body"
      className={slots.body({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface AlertDialogFooterProps extends React.ComponentProps<"div"> {}

export function AlertDialogFooter({
  children,
  className,
  ...rest
}: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={slots.footer({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface AlertDialogIconProps extends React.ComponentProps<"div"> {}

export function AlertDialogIcon({
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
        status,
        className,
      })}
      {...rest}
    >
      {children ?? (
        <Icon aria-hidden data-slot="alert-dialog-default-icon" size={16} />
      )}
    </div>
  );
}

export interface AlertDialogCloseTriggerProps extends CloseButtonProps {}

export function AlertDialogCloseTrigger({
  children,
  className,
  ...rest
}: AlertDialogCloseTriggerProps) {
  return (
    <div
      data-slot="alert-dialog-close-trigger"
      className={slots.closeTrigger()}
    >
      <CloseButton slot="close" className={className} {...rest}>
        {children}
      </CloseButton>
    </div>
  );
}
