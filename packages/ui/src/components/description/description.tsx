import { Text, type TextProps } from "react-aria-components/Text";

import { descriptionVariants, type DescriptionVariants } from "./description";

export interface DescriptionProps extends TextProps, DescriptionVariants {}

export function Description({
  children,
  className,
  ...rest
}: DescriptionProps) {
  return (
    <Text
      slot="description"
      data-slot="description"
      className={descriptionVariants({
        className,
      })}
      {...rest}
    >
      {children}
    </Text>
  );
}
