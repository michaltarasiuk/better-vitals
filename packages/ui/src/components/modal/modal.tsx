import { createContext } from "@lite-app/shared/create-context";
import * as Aria from "react-aria-components/Modal";

import { cnRenderProps } from "../../lib/cn-render-props";
import { CloseButton, type CloseButtonProps } from "../close-button";
import { modalVariants, type ModalVariants } from "./modal";

const slots = modalVariants();

interface ModalContextValue extends ModalVariants {
  placement?: "auto" | "top" | "center" | "bottom";
}

const [ModalContext, useModalContext] =
  createContext<ModalContextValue>("ModalContext");

export interface ModalProps
  extends Aria.DialogTriggerProps, ModalContextValue {}

export function Modal({
  children,
  variant,
  size,
  scroll,
  placement = "auto",
  ...rest
}: ModalProps) {
  return (
    <ModalContext
      value={{
        variant,
        size,
        scroll,
        placement,
      }}
    >
      <Aria.DialogTrigger data-slot="modal" {...rest}>
        {children}
      </Aria.DialogTrigger>
    </ModalContext>
  );
}

export interface ModalTriggerProps extends React.ComponentProps<"div"> {}

export function ModalTrigger({
  children,
  className,
  ...rest
}: ModalTriggerProps) {
  return (
    <Aria.Pressable>
      <div
        data-slot="modal-trigger"
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

export interface ModalBackdropProps extends Aria.ModalOverlayProps {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

export function ModalBackdrop({
  children,
  className,
  onClick,
  ...rest
}: ModalBackdropProps) {
  const { variant } = useModalContext();
  return (
    <Aria.ModalOverlay
      data-slot="modal-backdrop"
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

export interface ModalContainerProps extends Aria.ModalOverlayProps {}

export function ModalContainer({
  children,
  className,
  ...rest
}: ModalContainerProps) {
  const { placement, scroll, size } = useModalContext();
  return (
    <Aria.Modal
      data-slot="modal-container"
      data-placement={placement}
      className={cnRenderProps(
        className,
        slots.container({
          size,
          scroll,
        })
      )}
      {...rest}
    >
      {children}
    </Aria.Modal>
  );
}

export interface ModalDialogProps extends Aria.DialogProps {}

export function ModalDialog({
  children,
  className,
  ...rest
}: ModalDialogProps) {
  const { size, scroll, placement } = useModalContext();
  return (
    <Aria.Dialog
      data-slot="modal-dialog"
      data-placement={placement}
      className={slots.dialog({
        size,
        scroll,
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Dialog>
  );
}

export interface ModalHeaderProps extends React.ComponentProps<"div"> {}

export function ModalHeader({
  children,
  className,
  ...rest
}: ModalHeaderProps) {
  return (
    <div
      data-slot="modal-header"
      className={slots.header({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ModalHeadingProps extends Aria.HeadingProps {}

export function ModalHeading({
  children,
  className,
  ...rest
}: ModalHeadingProps) {
  return (
    <Aria.Heading
      slot="title"
      data-slot="modal-heading"
      className={slots.heading({
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Heading>
  );
}

export interface ModalBodyProps extends React.ComponentProps<"div"> {}

export function ModalBody({ children, className, ...rest }: ModalBodyProps) {
  const { scroll } = useModalContext();
  return (
    <div
      data-slot="modal-body"
      className={slots.body({
        scroll,
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ModalFooterProps extends React.ComponentProps<"div"> {}

export function ModalFooter({
  children,
  className,
  ...rest
}: ModalFooterProps) {
  return (
    <div
      data-slot="modal-footer"
      className={slots.footer({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ModalIconProps extends React.ComponentProps<"div"> {}

export function ModalIcon({ children, className, ...rest }: ModalIconProps) {
  return (
    <div
      data-slot="modal-icon"
      className={slots.icon({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ModalCloseTriggerProps extends CloseButtonProps {}

export function ModalCloseTrigger({
  children,
  className,
  ...rest
}: ModalCloseTriggerProps) {
  return (
    <div data-slot="modal-close-trigger" className={slots.closeTrigger()}>
      <CloseButton slot="close" className={className} {...rest}>
        {children}
      </CloseButton>
    </div>
  );
}
