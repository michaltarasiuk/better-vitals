import { tv, type VariantProps } from "tailwind-variants";

export const sidebarVariants = tv({
  slots: {
    provider: "sidebar__provider",
    offset: "sidebar__offset",
    base: "sidebar",
    header: "sidebar__header",
    content: "sidebar__content",
    menu: "sidebar__menu",
    menuItem: "sidebar__menu-item",
    menuIcon: "sidebar__menu-icon",
    menuItemContent: "sidebar__menu-item-content",
    menuLabel: "sidebar__menu-label",
    menuLabelText: "sidebar__menu-label-text",
    footer: "sidebar__footer",
  },
});

export type SidebarVariants = VariantProps<typeof sidebarVariants>;
