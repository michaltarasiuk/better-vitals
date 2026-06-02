import { tv, type VariantProps } from "tailwind-variants";

const tableVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "table",
    body: "table__body",
    cell: "table__cell",
    column: "table__column",
    columnResizer: "table__column-resizer",
    content: "table__content",
    footer: "table__footer",
    header: "table__header",
    loadMore: "table__load-more",
    loadMoreContent: "table__load-more-content",
    resizableContainer: "table__resizable-container",
    row: "table__row",
    scrollContainer: "table__scroll-container",
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
});

export { tableVariants };
export type TableVariants = VariantProps<typeof tableVariants>;
