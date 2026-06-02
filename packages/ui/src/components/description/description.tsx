"use client";

import { Text, type TextProps } from "react-aria-components/Text";

import {
  descriptionVariants,
  type DescriptionVariants,
} from "./description.ts";

interface DescriptionProps extends TextProps, DescriptionVariants {}

function Description({ className, children, ...rest }: DescriptionProps) {
  return (
    <Text
      slot="description"
      data-slot="description"
      className={descriptionVariants({ className })}
      {...rest}
    >
      {children}
    </Text>
  );
}

export { Description };
export type { DescriptionProps };
