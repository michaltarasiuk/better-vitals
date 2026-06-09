import { tv, type VariantProps } from "tailwind-variants";

export const sidebarVariants = tv({
  slots: {
    base: "sidebar",
    content: "sidebar__content",
    footer: "sidebar__footer",
    header: "sidebar__header",
    menu: "sidebar__menu",
    menuIcon: "sidebar__menu-icon",
    menuItem: "sidebar__menu-item",
    menuItemContent: "sidebar__menu-item-content",
    menuLabel: "sidebar__menu-label",
    menuLabelText: "sidebar__menu-label-text",
    offset: "sidebar__offset",
    provider: "sidebar__provider",
  },
});

export type SidebarVariants = VariantProps<typeof sidebarVariants>;
