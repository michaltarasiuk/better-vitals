"use client";

import type { DescriptionVariants } from "@lite-app/styles/components/description";
import { descriptionVariants } from "@lite-app/styles/components/description";
import type { ComponentPropsWithRef } from "react";
import type { TextProps } from "react-aria-components/Text";
import { Text } from "react-aria-components/Text";

interface DescriptionRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, DescriptionVariants {}

function DescriptionRoot({
  children,
  className,
  ...rest
}: DescriptionRootProps) {
  return (
    <Text
      className={descriptionVariants({ className })}
      data-slot="description"
      slot="description"
      {...rest}
    >
      {children}
    </Text>
  );
}

export { DescriptionRoot };

export type { DescriptionRootProps };
