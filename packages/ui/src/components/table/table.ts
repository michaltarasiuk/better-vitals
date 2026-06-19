import { tv, type VariantProps } from "tailwind-variants";

const tableVariants = tv({
  slots: {
    base: "table",
    scrollContainer: "table__scroll-container",
    resizableContainer: "table__resizable-container",
    content: "table__content",
    header: "table__header",
    column: "table__column",
    body: "table__body",
    row: "table__row",
    cell: "table__cell",
    footer: "table__footer",
    loadMore: "table__load-more",
    loadMoreContent: "table__load-more-content",
    columnResizer: "table__column-resizer",
  },
  variants: {
    variant: {
      primary: {
        base: "table--primary",
      },
      secondary: {
        base: "table--secondary",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export { tableVariants };
export type TableVariants = VariantProps<typeof tableVariants>;
