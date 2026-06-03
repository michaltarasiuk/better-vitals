import { tv, type VariantProps } from "tailwind-variants";

export const appLayoutVariants = tv({
  slots: {
    body: "app-layout__body",
    header: "app-layout__header",
    main: "app-layout__main",
  },
});

export type AppLayoutVariants = VariantProps<typeof appLayoutVariants>;
