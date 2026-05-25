"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { Text as TextPrimitive } from "react-aria-components/Text";
import { cn } from "tailwind-variants";

import {
  typographyVariants,
  type TypographyVariants,
} from "./typography.variants";

type TypographyType = NonNullable<TypographyVariants["type"]>;
type TypographyAlign = NonNullable<TypographyVariants["align"]>;
type TypographyColor = NonNullable<TypographyVariants["color"]>;
type TypographyWeight = NonNullable<TypographyVariants["weight"]>;

const defaultElementByType: Record<TypographyType, string> = {
  body: "p",
  "body-sm": "p",
  "body-xs": "p",
  code: "code",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

interface TypographyRootProps extends Omit<
  ComponentPropsWithRef<typeof TextPrimitive>,
  "className" | "elementType"
> {
  type?: TypographyType;
  align?: TypographyAlign;
  color?: TypographyColor;
  weight?: TypographyWeight;
  truncate?: boolean;
  children?: ReactNode;
  className?: string;
}

function TypographyRoot({
  type = "body",
  align = "start",
  color = "default",
  weight,
  truncate,
  className,
  children,
  ...rest
}: TypographyRootProps) {
  const slots = typographyVariants({ align, color, truncate, type, weight });

  return (
    <TextPrimitive
      elementType={defaultElementByType[type]}
      data-slot="typography"
      data-type={type}
      className={cn(slots.base(), className)}
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
}

interface HeadingProps extends Omit<TypographyRootProps, "type"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({ level = 1, ...rest }: HeadingProps) {
  return <TypographyRoot type={`h${level}` as TypographyType} {...rest} />;
}

interface ParagraphProps extends Omit<TypographyRootProps, "type"> {
  size?: "base" | "sm" | "xs";
}

function Paragraph({ size = "base", ...rest }: ParagraphProps) {
  const type = size === "base" ? "body" : (`body-${size}` as TypographyType);

  return <TypographyRoot type={type} {...rest} />;
}

interface CodeProps extends Omit<TypographyRootProps, "type"> {}

function Code(props: CodeProps) {
  return <TypographyRoot type="code" {...props} />;
}

interface ProseProps extends Omit<ComponentPropsWithRef<"div">, "color"> {
  children: ReactNode;
}

function Prose({ className, children, ...rest }: ProseProps) {
  const slots = typographyVariants();

  return (
    <div data-slot="prose" className={cn(slots.prose(), className)} {...rest}>
      {children}
    </div>
  );
}

export { Code, Heading, Paragraph, Prose, TypographyRoot };

export type {
  CodeProps,
  HeadingProps,
  ParagraphProps,
  ProseProps,
  TypographyRootProps,
};
