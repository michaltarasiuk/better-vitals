import { tv, type VariantProps } from "tailwind-variants";

export const modalVariants = tv({
  slots: {
    backdrop: "modal__backdrop",
    container: "modal__container",
    dialog: "modal__dialog",
    header: "modal__header",
    heading: "modal__heading",
    icon: "modal__icon",
    body: "modal__body",
    footer: "modal__footer",
    closeTrigger: "modal__close-trigger",
    trigger: "modal__trigger",
  },
  variants: {
    variant: {
      blur: {
        backdrop: "modal__backdrop--blur",
      },
      opaque: {
        backdrop: "modal__backdrop--opaque",
      },
      transparent: {
        backdrop: "modal__backdrop--transparent",
      },
    },
    size: {
      xs: {
        dialog: "modal__dialog--xs",
      },
      sm: {
        dialog: "modal__dialog--sm",
      },
      md: {
        dialog: "modal__dialog--md",
      },
      lg: {
        dialog: "modal__dialog--lg",
      },
      cover: {
        dialog: "modal__dialog--cover",
      },
      full: {
        container: "modal__container--full",
        dialog: "modal__dialog--full",
      },
    },
    scroll: {
      inside: {
        body: "modal__body--scroll-inside",
        dialog: "modal__dialog--scroll-inside",
      },
      outside: {
        body: "modal__body--scroll-outside",
        container: "modal__container--scroll-outside",
        dialog: "modal__dialog--scroll-outside",
      },
    },
  },
  defaultVariants: {
    variant: "opaque",
    size: "md",
    scroll: "inside",
  },
});

export type ModalVariants = VariantProps<typeof modalVariants>;
