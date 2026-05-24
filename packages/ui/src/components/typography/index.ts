import type { ComponentProps } from "react";

import { Code, Heading, Paragraph, Prose, TypographyRoot } from "./typography";

export const Typography = Object.assign(TypographyRoot, {
  Code,
  Heading,
  Paragraph,
  Prose,
  Root: TypographyRoot,
});

export interface Typography {
  CodeProps: ComponentProps<typeof Code>;
  HeadingProps: ComponentProps<typeof Heading>;
  ParagraphProps: ComponentProps<typeof Paragraph>;
  ProseProps: ComponentProps<typeof Prose>;
  Props: ComponentProps<typeof TypographyRoot>;
  RootProps: ComponentProps<typeof TypographyRoot>;
}

export { Code, Heading, Paragraph, Prose, TypographyRoot };

export type {
  CodeProps,
  HeadingProps,
  ParagraphProps,
  ProseProps,
  TypographyRootProps as TypographyProps,
  TypographyRootProps,
} from "./typography";

export { typographyVariants } from "./typography.variants";

export type { TypographyVariants } from "./typography.variants";
