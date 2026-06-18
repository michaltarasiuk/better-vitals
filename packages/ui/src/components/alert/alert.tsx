import { createContext } from "@lite-app/shared/create-context";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react";

import { SurfaceContext } from "../surface";
import { alertVariants, type AlertVariants } from "./alert";

const ALERT_STATUS_ICONS = {
  accent: InfoIcon,
  danger: CircleAlertIcon,
  default: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
} satisfies Record<string, LucideIcon>;

const slots = alertVariants();

interface AlertContextValue extends AlertVariants {}

const [AlertContext, useAlertContext] =
  createContext<AlertContextValue>("AlertContext");

interface AlertProps extends React.ComponentProps<"div">, AlertVariants {}

export function Alert({ children, status, className, ...rest }: AlertProps) {
  return (
    <AlertContext
      value={{
        status,
      }}
    >
      <SurfaceContext
        value={{
          variant: "default",
        }}
      >
        <div
          data-slot="alert"
          className={slots.base({
            className,
            status,
          })}
          {...rest}
        >
          {children}
        </div>
      </SurfaceContext>
    </AlertContext>
  );
}

interface AlertIndicatorProps extends React.ComponentProps<"div"> {}

export function AlertIndicator({
  children,
  className,
  ...rest
}: AlertIndicatorProps) {
  const { status = "default" } = useAlertContext();
  const Icon = ALERT_STATUS_ICONS[status];
  return (
    <div
      data-slot="alert-indicator"
      className={slots.indicator({
        className,
      })}
      {...rest}
    >
      {children ?? (
        <Icon aria-hidden data-slot="alert-default-icon" size={16} />
      )}
    </div>
  );
}

interface AlertContentProps extends React.ComponentProps<"div"> {}

export function AlertContent({
  children,
  className,
  ...rest
}: AlertContentProps) {
  return (
    <div
      data-slot="alert-content"
      className={slots.content({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

interface AlertTitleProps extends React.ComponentProps<"p"> {}

export function AlertTitle({ children, className, ...rest }: AlertTitleProps) {
  return (
    <p
      data-slot="alert-title"
      className={slots.title({
        className,
      })}
      {...rest}
    >
      {children}
    </p>
  );
}

interface AlertDescriptionProps extends React.ComponentProps<"span"> {}

export function AlertDescription({
  children,
  className,
  ...rest
}: AlertDescriptionProps) {
  return (
    <span
      data-slot="alert-description"
      className={slots.description({
        className,
      })}
      {...rest}
    >
      {children}
    </span>
  );
}
