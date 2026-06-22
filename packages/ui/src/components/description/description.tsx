import * as Aria from "react-aria-components/Text";

import { descriptionVariants, type DescriptionVariants } from "./description";

export interface DescriptionProps extends Aria.TextProps, DescriptionVariants {}

export function Description({
  children,
  className,
  ...rest
}: DescriptionProps) {
  return (
    <Aria.Text
      slot="description"
      data-slot="description"
      className={descriptionVariants({
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Text>
  );
}
