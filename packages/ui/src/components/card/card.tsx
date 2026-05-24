"use client";

import type { CardVariants } from "@lite-app/styles/components/card";
import { cardVariants } from "@lite-app/styles/components/card";
import type { SurfaceVariants } from "@lite-app/styles/components/surface";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { createContext, useContext } from "react";

import { cn } from "../../utils/cn";
import { SurfaceContext } from "../surface";

interface CardContext {
  slots?: ReturnType<typeof cardVariants>;
}

const CardContext = createContext<CardContext>({});

interface CardRootProps extends ComponentPropsWithoutRef<"div"> {
  variant?: CardVariants["variant"];
  children: ReactNode;
}

function CardRoot({
  variant = "default",
  className,
  children,
  ...rest
}: CardRootProps) {
  const slots = cardVariants({ variant });

  const content = (
    <div data-slot="card" className={cn(slots.base(), className)} {...rest}>
      {children}
    </div>
  );

  return (
    <CardContext value={{ slots }}>
      {variant === "transparent" ? (
        content
      ) : (
        <SurfaceContext
          value={{
            variant: variant as SurfaceVariants["variant"],
          }}
        >
          {content}
        </SurfaceContext>
      )}
    </CardContext>
  );
}

interface CardHeaderProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

function CardHeader({ className, children, ...rest }: CardHeaderProps) {
  const { slots } = useContext(CardContext);

  return (
    <div
      data-slot="card-header"
      className={cn(slots?.header?.(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends ComponentPropsWithoutRef<"h3"> {
  children?: ReactNode;
}

function CardTitle({ className, children, ...rest }: CardTitleProps) {
  const { slots } = useContext(CardContext);

  return (
    <h3
      data-slot="card-title"
      className={cn(slots?.title?.(), className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps extends ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
}

function CardDescription({
  className,
  children,
  ...rest
}: CardDescriptionProps) {
  const { slots } = useContext(CardContext);

  return (
    <p
      data-slot="card-description"
      className={cn(slots?.description?.(), className)}
      {...rest}
    >
      {children}
    </p>
  );
}

interface CardContentProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

function CardContent({ className, children, ...rest }: CardContentProps) {
  const { slots } = useContext(CardContext);

  return (
    <div
      data-slot="card-content"
      className={cn(slots?.content?.(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface CardFooterProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

function CardFooter({ className, children, ...rest }: CardFooterProps) {
  const { slots } = useContext(CardContext);

  return (
    <div
      data-slot="card-footer"
      className={cn(slots?.footer?.(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
};

export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardTitleProps,
};
