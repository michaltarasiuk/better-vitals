"use client";

import { createContext } from "@lite-app/shared/create-context";
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
import { tableVariants, type TableVariants } from "./table.ts";

const slots = tableVariants();

interface TableContextValue extends Pick<TableVariants, "variant"> {}

const [TableContext, useTableContext] =
  createContext<TableContextValue>("TableContext");

interface TableProps extends React.ComponentProps<"div">, TableVariants {}

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

interface TableScrollContainerProps extends React.ComponentProps<"div"> {}

function TableScrollContainer({
  children,
  className,
  ...rest
}: TableScrollContainerProps) {
  const { variant } = useTableContext();
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

function TableContent({ children, className, ...rest }: TableContentProps) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACTable>
  );
}

export { TableContent };
export type { TableContentProps };

interface TableHeaderProps<T> extends RACTableHeaderProps<T> {}

function TableHeader<T extends object>({
  children,
  className,
  ...rest
}: TableHeaderProps<T>) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACTableHeader>
  );
}

export { TableHeader };
export type { TableHeaderProps };

interface TableColumnProps extends RACColumnProps {}

function TableColumn({ children, className, ...rest }: TableColumnProps) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACColumn>
  );
}

export { TableColumn };
export type { TableColumnProps };

interface TableBodyProps<T extends object> extends RACTableBodyProps<T> {}

function TableBody<T extends object>({
  children,
  className,
  ...rest
}: TableBodyProps<T>) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACTableBody>
  );
}

export { TableBody };
export type { TableBodyProps };

interface TableRowProps<T extends object> extends RACRowProps<T> {}

function TableRow<T extends object>({
  children,
  className,
  ...rest
}: TableRowProps<T>) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACRow>
  );
}

export { TableRow };
export type { TableRowProps };

interface TableCellProps extends RACCellProps {}

function TableCell({ children, className, ...rest }: TableCellProps) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACCell>
  );
}

export { TableCell };
export type { TableCellProps };

interface TableFooterProps extends React.ComponentProps<"div"> {}

function TableFooter({ className, children, ...rest }: TableFooterProps) {
  const { variant } = useTableContext();
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
  children,
  className,
  ...rest
}: TableResizableContainerProps) {
  return (
    <RACResizableTableContainer
      data-slot="table-resizable-container"
      className={cn("table__resizable-container", className)}
      {...rest}
    >
      {children}
    </RACResizableTableContainer>
  );
}

export { TableResizableContainer };
export type { TableResizableContainerProps };

interface TableColumnResizerProps extends RACColumnResizerProps {}

function TableColumnResizer({
  children,
  className,
  ...rest
}: TableColumnResizerProps) {
  const { variant } = useTableContext();
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
    >
      {children}
    </RACColumnResizer>
  );
}

export { TableColumnResizer };
export type { TableColumnResizerProps };

interface TableLoadMoreItemProps extends RACTableLoadMoreItemProps {}

function TableLoadMoreItem({
  children,
  className,
  ...rest
}: TableLoadMoreItemProps) {
  const { variant } = useTableContext();
  return (
    <RACTableLoadMoreItem
      data-slot="table-load-more"
      className={slots.loadMore({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </RACTableLoadMoreItem>
  );
}

export { TableLoadMoreItem };
export type { TableLoadMoreItemProps };

interface TableLoadMoreContentProps extends React.ComponentProps<"div"> {}

function TableLoadMoreContent({
  children,
  className,
  ...rest
}: TableLoadMoreContentProps) {
  const { variant } = useTableContext();
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
