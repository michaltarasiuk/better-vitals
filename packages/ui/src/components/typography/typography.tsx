"use client";

import type { TypographyVariants } from "@lite-app/styles/components/typography";
import { typographyVariants } from "@lite-app/styles/components/typography";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Text as TextPrimitive } from "react-aria-components/Text";

import { composeSlotClassName } from "../../utils/compose";

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
  children,
  className,
  ...props
}: TypographyRootProps) {
  const slots = typographyVariants({ align, color, truncate, type, weight });

  return (
    <TextPrimitive
      elementType={defaultElementByType[type]}
      data-slot="typography"
      data-type={type}
      className={composeSlotClassName(slots.base, className)}
      {...props}
    >
      {children}
    </TextPrimitive>
  );
}

interface HeadingProps extends Omit<TypographyRootProps, "type"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({ level = 1, ...props }: HeadingProps) {
  return <TypographyRoot type={`h${level}` as TypographyType} {...props} />;
}

interface ParagraphProps extends Omit<TypographyRootProps, "type"> {
  size?: "base" | "sm" | "xs";
}

function Paragraph({ size = "base", ...props }: ParagraphProps) {
  const type = size === "base" ? "body" : (`body-${size}` as TypographyType);

  return <TypographyRoot type={type} {...props} />;
}

interface CodeProps extends Omit<TypographyRootProps, "type"> {}

function Code(props: CodeProps) {
  return <TypographyRoot type="code" {...props} />;
}

interface ProseProps extends Omit<ComponentPropsWithRef<"div">, "color"> {
  children: ReactNode;
}

function Prose({ children, className, ...props }: ProseProps) {
  const slots = typographyVariants();

  return (
    <div
      data-slot="prose"
      className={composeSlotClassName(slots.prose, className)}
      {...props}
    >
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
