import { tv, type VariantProps } from "tailwind-variants";

export const alertDialogVariants = tv({
  slots: {
    backdrop: "alert-dialog__backdrop",
    container: "alert-dialog__container",
    dialog: "alert-dialog__dialog",
    header: "alert-dialog__header",
    heading: "alert-dialog__heading",
    icon: "alert-dialog__icon",
    body: "alert-dialog__body",
    footer: "alert-dialog__footer",
    closeTrigger: "alert-dialog__close-trigger",
    trigger: "alert-dialog__trigger",
  },
  variants: {
    variant: {
      blur: {
        backdrop: "alert-dialog__backdrop--blur",
      },
      opaque: {
        backdrop: "alert-dialog__backdrop--opaque",
      },
      transparent: {
        backdrop: "alert-dialog__backdrop--transparent",
      },
    },
    size: {
      xs: {
        dialog: "alert-dialog__dialog--xs",
      },
      sm: {
        dialog: "alert-dialog__dialog--sm",
      },
      md: {
        dialog: "alert-dialog__dialog--md",
      },
      lg: {
        dialog: "alert-dialog__dialog--lg",
      },
      cover: {
        dialog: "alert-dialog__dialog--cover",
      },
    },
    status: {
      default: {
        icon: "alert-dialog__icon--default",
      },
      accent: {
        icon: "alert-dialog__icon--accent",
      },
      danger: {
        icon: "alert-dialog__icon--danger",
      },
      success: {
        icon: "alert-dialog__icon--success",
      },
      warning: {
        icon: "alert-dialog__icon--warning",
      },
    },
  },
  defaultVariants: {
    variant: "opaque",
    size: "md",
    status: "danger",
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;
