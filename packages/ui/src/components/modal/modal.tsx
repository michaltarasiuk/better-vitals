"use client";

import { createContext } from "@lite-app/shared/create-context";
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
import { modalVariants, type ModalVariants } from "./modal.ts";

const slots = modalVariants();

interface ModalContextValue extends ModalVariants {
  placement?: "auto" | "top" | "center" | "bottom";
}

const [ModalContext, useModalContext] =
  createContext<ModalContextValue>("ModalContext");

interface ModalProps extends RACDialogTriggerProps, ModalContextValue {}

function Modal({
  variant,
  size,
  scroll,
  placement = "auto",
  children,
  ...rest
}: ModalProps) {
  return (
    <ModalContext
      value={{
        placement,
        scroll,
        size,
        variant,
      }}
    >
      <RACDialogTrigger data-slot="modal" {...rest}>
        {children}
      </RACDialogTrigger>
    </ModalContext>
  );
}

export { Modal };
export type { ModalProps };

interface ModalTriggerProps extends React.ComponentProps<"div"> {}

function ModalTrigger({ children, className, ...rest }: ModalTriggerProps) {
  return (
    <RACPressable>
      <div
        data-slot="modal-trigger"
        className={slots.trigger({ className })}
        {...rest}
      >
        {children}
      </div>
    </RACPressable>
  );
}

export { ModalTrigger };
export type { ModalTriggerProps };

interface ModalBackdropProps extends RACModalOverlayProps {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

function ModalBackdrop({
  children,
  className,
  onClick,
  ...rest
}: ModalBackdropProps) {
  const { variant } = useModalContext();
  return (
    <RACModalOverlay
      data-slot="modal-backdrop"
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

export { ModalBackdrop };
export type { ModalBackdropProps };

interface ModalContainerProps extends RACModalOverlayProps {}

function ModalContainer({ children, className, ...rest }: ModalContainerProps) {
  const { placement, scroll, size } = useModalContext();
  return (
    <RACModal
      data-slot="modal-container"
      data-placement={placement}
      className={cnRenderProps(
        className,
        slots.container({
          scroll,
          size,
        })
      )}
      {...rest}
    >
      {children}
    </RACModal>
  );
}

export { ModalContainer };
export type { ModalContainerProps };

interface ModalDialogProps extends RACDialogProps {}

function ModalDialog({ children, className, ...rest }: ModalDialogProps) {
  const { size, scroll, placement } = useModalContext();
  return (
    <RACDialog
      data-slot="modal-dialog"
      data-placement={placement}
      className={slots.dialog({
        className,
        scroll,
        size,
      })}
      {...rest}
    >
      {children}
    </RACDialog>
  );
}

export { ModalDialog };
export type { ModalDialogProps };

interface ModalHeaderProps extends React.ComponentProps<"div"> {}

function ModalHeader({ children, className, ...rest }: ModalHeaderProps) {
  return (
    <div
      data-slot="modal-header"
      className={slots.header({ className })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { ModalHeader };
export type { ModalHeaderProps };

interface ModalHeadingProps extends RACHeadingProps {}

function ModalHeading({ children, className, ...rest }: ModalHeadingProps) {
  return (
    <RACHeading
      slot="title"
      data-slot="modal-heading"
      className={slots.heading({ className })}
      {...rest}
    >
      {children}
    </RACHeading>
  );
}

export { ModalHeading };
export type { ModalHeadingProps };

interface ModalBodyProps extends React.ComponentProps<"div"> {}

function ModalBody({ children, className, ...rest }: ModalBodyProps) {
  const { scroll } = useModalContext();
  return (
    <div
      data-slot="modal-body"
      className={slots.body({
        className,
        scroll,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { ModalBody };
export type { ModalBodyProps };

interface ModalFooterProps extends React.ComponentProps<"div"> {}

function ModalFooter({ children, className, ...rest }: ModalFooterProps) {
  return (
    <div
      data-slot="modal-footer"
      className={slots.footer({ className })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { ModalFooter };
export type { ModalFooterProps };

interface ModalIconProps extends React.ComponentProps<"div"> {}

function ModalIcon({ children, className, ...rest }: ModalIconProps) {
  return (
    <div data-slot="modal-icon" className={slots.icon({ className })} {...rest}>
      {children}
    </div>
  );
}

export { ModalIcon };
export type { ModalIconProps };

interface ModalCloseTriggerProps extends CloseButtonProps {}

function ModalCloseTrigger({
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

export { ModalCloseTrigger };
export type { ModalCloseTriggerProps };
