"use client";

import type { CardVariants } from "@lite-app/styles/components/card";
import { cardVariants } from "@lite-app/styles/components/card";
import type { SurfaceVariants } from "@lite-app/styles/components/surface";
import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";

import { composeSlotClassName } from "../../utils/compose";
import type { DOMRenderProps } from "../../utils/dom";
import { dom } from "../../utils/dom";
import { SurfaceContext } from "../surface";

interface CardContext {
  slots?: ReturnType<typeof cardVariants>;
}

const CardContext = createContext<CardContext>({});

interface CardRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  variant?: CardVariants["variant"];
  children: ReactNode;
  className?: string;
}

function CardRoot<E extends keyof React.JSX.IntrinsicElements = "div">({
  variant = "default",
  children,
  className,
  ...props
}: CardRootProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardRootProps<E>>) {
  const slots = React.useMemo(() => cardVariants({ variant }), [variant]);

  const content = (
    <dom.div
      data-slot="card"
      className={slots.base({ className })}
      {...(props as React.ComponentProps<typeof dom.div>)}
    >
      {children}
    </dom.div>
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

interface CardHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardHeader<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardHeaderProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardHeaderProps<E>>) {
  const { slots } = useContext(CardContext);

  return (
    <dom.div
      data-slot="card-header"
      className={composeSlotClassName(slots?.header, className)}
      {...(props as React.ComponentProps<typeof dom.div>)}
    />
  );
}

interface CardTitleProps<
  E extends keyof React.JSX.IntrinsicElements = "h3",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardTitle<E extends keyof React.JSX.IntrinsicElements = "h3">({
  children,
  className,
  ...props
}: CardTitleProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardTitleProps<E>>) {
  const { slots } = useContext(CardContext);

  return (
    <dom.h3
      data-slot="card-title"
      className={composeSlotClassName(slots?.title, className)}
      {...(props as React.ComponentProps<typeof dom.h3>)}
    >
      {children}
    </dom.h3>
  );
}

interface CardDescriptionProps<
  E extends keyof React.JSX.IntrinsicElements = "p",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardDescription<E extends keyof React.JSX.IntrinsicElements = "p">({
  children,
  className,
  ...props
}: CardDescriptionProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardDescriptionProps<E>>) {
  const { slots } = useContext(CardContext);

  return (
    <dom.p
      data-slot="card-description"
      className={composeSlotClassName(slots?.description, className)}
      {...(props as React.ComponentProps<typeof dom.p>)}
    >
      {children}
    </dom.p>
  );
}

interface CardContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardContent<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardContentProps<E>>) {
  const { slots } = useContext(CardContext);

  return (
    <dom.div
      data-slot="card-content"
      className={composeSlotClassName(slots?.content, className)}
      {...(props as React.ComponentProps<typeof dom.div>)}
    />
  );
}

interface CardFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardFooter<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardFooterProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardFooterProps<E>>) {
  const { slots } = useContext(CardContext);

  return (
    <dom.div
      data-slot="card-footer"
      className={composeSlotClassName(slots?.footer, className)}
      {...(props as React.ComponentProps<typeof dom.div>)}
    />
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
