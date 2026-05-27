"use client";

import { type ComponentProps, createContext, useContext } from "react";
import {
  Cell as RACCell,
  type CellProps as RACCellProps,
  Collection as RACCollection,
  Column as RACColumn,
  type ColumnProps as RACColumnProps,
  ColumnResizer as RACColumnResizer,
  type ColumnResizerProps as RACColumnResizerProps,
  ResizableTableContainer as RACResizableTableContainer,
  type ResizableTableContainerProps as RACResizableTableContainerProps,
  Row as RACRow,
  type RowProps as RACRowProps,
  Table as RACTable,
  TableBody as RACTableBody,
  type TableBodyProps as RACTableBodyProps,
  TableHeader as RACTableHeader,
  type TableHeaderProps as RACTableHeaderProps,
  TableLoadMoreItem as RACTableLoadMoreItem,
  type TableLoadMoreItemProps as RACTableLoadMoreItemProps,
  type TableProps as RACTableProps,
} from "react-aria-components/Table";
import { cn } from "tailwind-variants";

import { cnRenderProps } from "../../utils/cn-render-props";
import { tableVariants, type TableVariants } from "./table.variants";

const slots = tableVariants();

const TableContext = createContext<Pick<TableVariants, "variant">>({});

interface TableProps extends ComponentProps<"div">, TableVariants {}

function Table({ children, variant, className, ...rest }: TableProps) {
  return (
    <TableContext
      value={{
        variant,
      }}
    >
      <div
        data-slot="table"
        className={slots.base({
          className,
          variant,
        })}
        {...rest}
      >
        {children}
      </div>
    </TableContext>
  );
}

export { Table };
export type { TableProps };

interface TableScrollContainerProps extends ComponentProps<"div"> {}

function TableScrollContainer({
  children,
  className,
  ...rest
}: TableScrollContainerProps) {
  const { variant } = useContext(TableContext);
  return (
    <div
      data-slot="table-scroll-container"
      className={slots.scrollContainer({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { TableScrollContainer };
export type { TableScrollContainerProps };

interface TableContentProps extends RACTableProps {}

function TableContent({ className, ...rest }: TableContentProps) {
  const { variant } = useContext(TableContext);
  return (
    <RACTable
      data-slot="table-content"
      className={cnRenderProps(
        className,
        slots.content({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableContent };
export type { TableContentProps };

interface TableHeaderProps<T> extends RACTableHeaderProps<T> {}

function TableHeader<T extends object>({
  className,
  ...rest
}: TableHeaderProps<T>) {
  const { variant } = useContext(TableContext);
  return (
    <RACTableHeader
      data-slot="table-header"
      className={cnRenderProps(
        className,
        slots.header({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableHeader };
export type { TableHeaderProps };

interface TableColumnProps extends RACColumnProps {}

function TableColumn({ className, ...rest }: TableColumnProps) {
  const { variant } = useContext(TableContext);
  return (
    <RACColumn
      data-slot="table-column"
      className={cnRenderProps(
        className,
        slots.column({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableColumn };
export type { TableColumnProps };

interface TableBodyProps<T extends object> extends RACTableBodyProps<T> {}

function TableBody<T extends object>({
  className,
  ...rest
}: TableBodyProps<T>) {
  const { variant } = useContext(TableContext);
  return (
    <RACTableBody
      data-slot="table-body"
      className={cnRenderProps(
        className,
        slots.body({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableBody };
export type { TableBodyProps };

interface TableRowProps<T extends object> extends RACRowProps<T> {}

function TableRow<T extends object>({ className, ...rest }: TableRowProps<T>) {
  const { variant } = useContext(TableContext);
  return (
    <RACRow
      data-slot="table-row"
      className={cnRenderProps(
        className,
        slots.row({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableRow };
export type { TableRowProps };

interface TableCellProps extends RACCellProps {}

function TableCell({ className, ...rest }: TableCellProps) {
  const { variant } = useContext(TableContext);
  return (
    <RACCell
      data-slot="table-cell"
      className={cnRenderProps(
        className,
        slots.cell({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableCell };
export type { TableCellProps };

interface TableFooterProps extends ComponentProps<"div"> {}

function TableFooter({ className, children, ...rest }: TableFooterProps) {
  const { variant } = useContext(TableContext);
  return (
    <div
      data-slot="table-footer"
      className={slots.footer({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { TableFooter };
export type { TableFooterProps };

interface TableResizableContainerProps extends RACResizableTableContainerProps {}

function TableResizableContainer({
  className,
  ...rest
}: TableResizableContainerProps) {
  return (
    <RACResizableTableContainer
      data-slot="table-resizable-container"
      className={cn("table__resizable-container", className)}
      {...rest}
    />
  );
}

export { TableResizableContainer };
export type { TableResizableContainerProps };

interface TableColumnResizerProps extends RACColumnResizerProps {}

function TableColumnResizer({ className, ...rest }: TableColumnResizerProps) {
  const { variant } = useContext(TableContext);
  return (
    <RACColumnResizer
      data-slot="table-column-resizer"
      className={cnRenderProps(
        className,
        slots.columnResizer({
          variant,
        })
      )}
      {...rest}
    />
  );
}

export { TableColumnResizer };
export type { TableColumnResizerProps };

interface TableLoadMoreItemProps extends RACTableLoadMoreItemProps {}

function TableLoadMoreItem({ className, ...rest }: TableLoadMoreItemProps) {
  const { variant } = useContext(TableContext);
  return (
    <RACTableLoadMoreItem
      data-slot="table-load-more"
      className={slots.loadMore({
        className,
        variant,
      })}
      {...rest}
    />
  );
}

export { TableLoadMoreItem };
export type { TableLoadMoreItemProps };

interface TableLoadMoreContentProps extends ComponentProps<"div"> {}

function TableLoadMoreContent({
  children,
  className,
  ...rest
}: TableLoadMoreContentProps) {
  const { variant } = useContext(TableContext);
  return (
    <div
      data-slot="table-load-more-content"
      className={slots.loadMoreContent({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { TableLoadMoreContent };
export type { TableLoadMoreContentProps };

// Re-export Collection for dynamic cell rendering within rows
export { RACCollection as TableCollection };
