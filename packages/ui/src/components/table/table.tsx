import { createContext } from "@lite-app/shared/create-context";
import * as Aria from "react-aria-components/Table";
import { cn } from "tailwind-variants";

import { cnRenderProps } from "../../utils/cn-render-props";
import { tableVariants, type TableVariants } from "./table";

const slots = tableVariants();

interface TableContextValue extends TableVariants {}

const [TableContext, useTableContext] =
  createContext<TableContextValue>("TableContext");

interface TableProps extends React.ComponentProps<"div">, TableVariants {}

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
          variant,
          className,
        })}
        {...rest}
      >
        {children}
      </div>
    </TableContext>
  );
}

interface TableScrollContainerProps extends React.ComponentProps<"div"> {}

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
        variant,
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

interface TableContentProps extends Aria.TableProps {}

export function TableContent({
  children,
  className,
  ...rest
}: TableContentProps) {
  const { variant } = useTableContext();
  return (
    <Aria.Table
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
    </Aria.Table>
  );
}

interface TableHeaderProps<T extends object> extends Aria.TableHeaderProps<T> {}

export function TableHeader<T extends object>({
  children,
  className,
  ...rest
}: TableHeaderProps<T>) {
  const { variant } = useTableContext();
  return (
    <Aria.TableHeader
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
    </Aria.TableHeader>
  );
}

interface TableColumnProps extends Aria.ColumnProps {}

export function TableColumn({
  children,
  className,
  ...rest
}: TableColumnProps) {
  const { variant } = useTableContext();
  return (
    <Aria.Column
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
    </Aria.Column>
  );
}

interface TableBodyProps<T extends object> extends Aria.TableBodyProps<T> {}

export function TableBody<T extends object>({
  children,
  className,
  ...rest
}: TableBodyProps<T>) {
  const { variant } = useTableContext();
  return (
    <Aria.TableBody
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
    </Aria.TableBody>
  );
}

interface TableRowProps<T extends object> extends Aria.RowProps<T> {}

export function TableRow<T extends object>({
  children,
  className,
  ...rest
}: TableRowProps<T>) {
  const { variant } = useTableContext();
  return (
    <Aria.Row
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
    </Aria.Row>
  );
}

interface TableCellProps extends Aria.CellProps {}

export function TableCell({ children, className, ...rest }: TableCellProps) {
  const { variant } = useTableContext();
  return (
    <Aria.Cell
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
    </Aria.Cell>
  );
}

interface TableFooterProps extends React.ComponentProps<"div"> {}

export function TableFooter({
  children,
  className,
  ...rest
}: TableFooterProps) {
  const { variant } = useTableContext();
  return (
    <div
      data-slot="table-footer"
      className={slots.footer({
        variant,
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

interface TableResizableContainerProps
  extends Aria.ResizableTableContainerProps {}

export function TableResizableContainer({
  children,
  className,
  ...rest
}: TableResizableContainerProps) {
  return (
    <Aria.ResizableTableContainer
      data-slot="table-resizable-container"
      className={cn("table__resizable-container", className)}
      {...rest}
    >
      {children}
    </Aria.ResizableTableContainer>
  );
}

interface TableColumnResizerProps extends Aria.ColumnResizerProps {}

export function TableColumnResizer({
  children,
  className,
  ...rest
}: TableColumnResizerProps) {
  const { variant } = useTableContext();
  return (
    <Aria.ColumnResizer
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
    </Aria.ColumnResizer>
  );
}

interface TableLoadMoreItemProps extends Aria.TableLoadMoreItemProps {}

export function TableLoadMoreItem({
  children,
  className,
  ...rest
}: TableLoadMoreItemProps) {
  const { variant } = useTableContext();
  return (
    <Aria.TableLoadMoreItem
      data-slot="table-load-more"
      className={slots.loadMore({
        variant,
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.TableLoadMoreItem>
  );
}

interface TableLoadMoreContentProps extends React.ComponentProps<"div"> {}

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
        variant,
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export const TableCollection = Aria.Collection;
