import type { ComponentProps } from "react";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
} from "./card";

/*
 * Compound Component
 */
export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Root: CardRoot,
  Title: CardTitle,
});

export interface Card {
  Props: ComponentProps<typeof CardRoot>;
  RootProps: ComponentProps<typeof CardRoot>;
  HeaderProps: ComponentProps<typeof CardHeader>;
  TitleProps: ComponentProps<typeof CardTitle>;
  DescriptionProps: ComponentProps<typeof CardDescription>;
  ContentProps: ComponentProps<typeof CardContent>;
  FooterProps: ComponentProps<typeof CardFooter>;
}

/*
 * Named Component
 */
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
  CardRootProps as CardProps,
  CardRootProps,
  CardTitleProps,
} from "./card";

/*
 * Variants
 */
export { cardVariants } from "@lite-app/styles/components/card";

export type { CardVariants } from "@lite-app/styles/components/card";
