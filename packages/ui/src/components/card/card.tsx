"use client";

import { createContext, useContext, type ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { SurfaceContext } from "../surface";
import { cardVariants, type CardVariants } from "./card.variants";

const slots = cardVariants();

const CardContext = createContext<Pick<CardVariants, "variant">>({});

interface CardProps extends ComponentProps<"div">, CardVariants {}

function Card({ variant, className, children, ...rest }: CardProps) {
  const root = (
    <div
      data-slot="card"
      className={cn(
        slots.base({
          variant,
        }),
        className
      )}
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

export { Card };
export type { CardProps };

interface CardHeaderProps extends ComponentProps<"div"> {}

function CardHeader({ className, children, ...rest }: CardHeaderProps) {
  const { variant } = useContext(CardContext);
  return (
    <div
      data-slot="card-header"
      className={cn(
        slots.header({
          variant,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { CardHeader };
export type { CardHeaderProps };

interface CardTitleProps extends ComponentProps<"h3"> {}

function CardTitle({ className, children, ...rest }: CardTitleProps) {
  const { variant } = useContext(CardContext);
  return (
    <h3
      data-slot="card-title"
      className={cn(
        slots.title({
          variant,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}

export { CardTitle };
export type { CardTitleProps };

interface CardDescriptionProps extends ComponentProps<"p"> {}

function CardDescription({
  className,
  children,
  ...rest
}: CardDescriptionProps) {
  const { variant } = useContext(CardContext);
  return (
    <p
      data-slot="card-description"
      className={cn(
        slots.description({
          variant,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

export { CardDescription };
export type { CardDescriptionProps };

interface CardContentProps extends ComponentProps<"div"> {}

function CardContent({ className, children, ...rest }: CardContentProps) {
  const { variant } = useContext(CardContext);
  return (
    <div
      data-slot="card-content"
      className={cn(
        slots.content({
          variant,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { CardContent };
export type { CardContentProps };

interface CardFooterProps extends ComponentProps<"div"> {}

function CardFooter({ className, children, ...rest }: CardFooterProps) {
  const { variant } = useContext(CardContext);
  return (
    <div
      data-slot="card-footer"
      className={cn(
        slots.footer({
          variant,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { CardFooter };
export type { CardFooterProps };
