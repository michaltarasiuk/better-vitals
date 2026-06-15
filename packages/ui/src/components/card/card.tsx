import { createContext } from "@lite-app/shared/create-context";

import { SurfaceContext } from "../surface";
import { cardVariants, type CardVariants } from "./card.ts";

const slots = cardVariants();

interface CardContextValue extends CardVariants {}

const [CardContext, useCardContext] =
  createContext<CardContextValue>("CardContext");

export interface CardProps extends React.ComponentProps<"div">, CardVariants {}

export function Card({ children, variant, className, ...rest }: CardProps) {
  const root = (
    <div
      data-slot="card"
      className={slots.base({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
  return (
    <CardContext
      value={{
        variant,
      }}
    >
      {variant === "transparent" ? (
        root
      ) : (
        <SurfaceContext
          value={{
            variant,
          }}
        >
          {root}
        </SurfaceContext>
      )}
    </CardContext>
  );
}

export interface CardHeaderProps extends React.ComponentProps<"div"> {}

export function CardHeader({ children, className, ...rest }: CardHeaderProps) {
  const { variant } = useCardContext();
  return (
    <div
      data-slot="card-header"
      className={slots.header({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.ComponentProps<"h3"> {}

export function CardTitle({ children, className, ...rest }: CardTitleProps) {
  const { variant } = useCardContext();
  return (
    <h3
      data-slot="card-title"
      className={slots.title({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </h3>
  );
}

export interface CardDescriptionProps extends React.ComponentProps<"p"> {}

export function CardDescription({
  children,
  className,
  ...rest
}: CardDescriptionProps) {
  const { variant } = useCardContext();
  return (
    <p
      data-slot="card-description"
      className={slots.description({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </p>
  );
}

export interface CardContentProps extends React.ComponentProps<"div"> {}

export function CardContent({
  children,
  className,
  ...rest
}: CardContentProps) {
  const { variant } = useCardContext();
  return (
    <div
      data-slot="card-content"
      className={slots.content({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.ComponentProps<"div"> {}

export function CardFooter({ children, className, ...rest }: CardFooterProps) {
  const { variant } = useCardContext();
  return (
    <div
      data-slot="card-footer"
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
