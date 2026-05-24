"use client";

import type { DescriptionVariants } from "@lite-app/styles/components/description";
import { descriptionVariants } from "@lite-app/styles/components/description";
import type { ComponentPropsWithRef } from "react";
import type { TextProps } from "react-aria-components/Text";
import { Text } from "react-aria-components/Text";
import { cn } from "tailwind-variants";

interface DescriptionRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, DescriptionVariants {}

function DescriptionRoot({
  className,
  children,
  ...rest
}: DescriptionRootProps) {
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

export { DescriptionRoot };

export type { DescriptionRootProps };
