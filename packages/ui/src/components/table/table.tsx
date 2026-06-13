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

export interface TableProps
  extends React.ComponentProps<"div">, TableVariants {}

export function Table({ children, variant, className, ...rest }: TableProps) {
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

export interface TableScrollContainerProps extends React.ComponentProps<"div"> {}

export function TableScrollContainer({
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

export interface TableContentProps extends RACTableProps {}

export function TableContent({
  children,
  className,
  ...rest
}: TableContentProps) {
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

export interface TableHeaderProps<T> extends RACTableHeaderProps<T> {}

export function TableHeader<T extends object>({
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

export interface TableColumnProps extends RACColumnProps {}

export function TableColumn({
  children,
  className,
  ...rest
}: TableColumnProps) {
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

export interface TableBodyProps<
  T extends object,
> extends RACTableBodyProps<T> {}

export function TableBody<T extends object>({
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

export interface TableRowProps<T extends object> extends RACRowProps<T> {}

export function TableRow<T extends object>({
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

export interface TableCellProps extends RACCellProps {}

export function TableCell({ children, className, ...rest }: TableCellProps) {
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

export interface TableFooterProps extends React.ComponentProps<"div"> {}

export function TableFooter({
  className,
  children,
  ...rest
}: TableFooterProps) {
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

export interface TableResizableContainerProps extends RACResizableTableContainerProps {}

export function TableResizableContainer({
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

export interface TableColumnResizerProps extends RACColumnResizerProps {}

export function TableColumnResizer({
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

export interface TableLoadMoreItemProps extends RACTableLoadMoreItemProps {}

export function TableLoadMoreItem({
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

export interface TableLoadMoreContentProps extends React.ComponentProps<"div"> {}

export function TableLoadMoreContent({
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

export { RACCollection as TableCollection };
