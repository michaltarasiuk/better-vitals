"use client";

import type { TextProps } from "react-aria-components/Text";
import { Text } from "react-aria-components/Text";
import { cn } from "tailwind-variants";

import type { DescriptionVariants } from "./description.variants";
import { descriptionVariants } from "./description.variants";

interface DescriptionProps extends TextProps, DescriptionVariants {}

function Description({ className, children, ...rest }: DescriptionProps) {
  return (
    <Text
      slot="description"
      data-slot="description"
      className={cn(descriptionVariants(), className)}
      {...rest}
    >
      {children}
    </Text>
  );
}

export { Description };
export type { DescriptionProps };
