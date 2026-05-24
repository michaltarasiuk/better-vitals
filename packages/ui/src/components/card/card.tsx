"use client";

import type { ComponentProps } from "react";
import { createContext, useContext } from "react";
import { cn } from "tailwind-variants";

import { SurfaceContext } from "../surface";
import type { CardVariants } from "./card.variants";
import { cardVariants } from "./card.variants";

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

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
};
