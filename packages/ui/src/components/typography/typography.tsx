"use client";

import type { ComponentProps } from "react";
import { Text, type TextProps } from "react-aria-components/Text";
import { cn } from "tailwind-variants";

import {
  typographyVariants,
  type TypographyVariants,
} from "./typography.variants";

type TypographyType = NonNullable<TypographyVariants["type"]>;

const DEFAULT_ELEMENT_BY_TYPE: Record<TypographyType, string> = {
  "body-base": "p",
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

interface TypographyProps
  extends
    Omit<TextProps, "elementType" | keyof TypographyVariants>,
    TypographyVariants {}

function Typography({
  type = "body-base",
  align,
  color,
  weight,
  truncate,
  className,
  children,
  ...rest
}: TypographyProps) {
  const slots = typographyVariants({
    align,
    color,
    truncate,
    type,
    weight,
  });
  return (
    <Text
      elementType={DEFAULT_ELEMENT_BY_TYPE[type]}
      data-slot="typography"
      data-type={type}
      className={cn(slots.base(), className)}
      {...rest}
    >
      {children}
    </Text>
  );
}

export { Typography };
export type { TypographyProps };

interface HeadingProps extends Omit<TypographyProps, "type"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({ level = 1, ...rest }: HeadingProps) {
  return <Typography type={`h${level}` satisfies TypographyType} {...rest} />;
}

export { Heading };
export type { HeadingProps };

interface ParagraphProps extends Omit<TypographyProps, "type"> {
  size?: "base" | "sm" | "xs";
}

function Paragraph({ size = "base", ...rest }: ParagraphProps) {
  const type = `body-${size}` satisfies TypographyType;
  return <Typography type={type} {...rest} />;
}

export { Paragraph };
export type { ParagraphProps };

interface CodeProps extends Omit<TypographyProps, "type"> {}

function Code(props: CodeProps) {
  return <Typography type="code" {...props} />;
}

export { Code };
export type { CodeProps };

interface ProseProps extends ComponentProps<"div"> {}

function Prose({ className, children, ...rest }: ProseProps) {
  const slots = typographyVariants();
  return (
    <div data-slot="prose" className={cn(slots.prose(), className)} {...rest}>
      {children}
    </div>
  );
}

export { Prose };
export type { ProseProps };
