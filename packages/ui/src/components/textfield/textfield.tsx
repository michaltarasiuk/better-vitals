"use client";

import type { TextFieldVariants } from "@lite-app/styles/components/textfield";
import { textFieldVariants } from "@lite-app/styles/components/textfield";
import type { ComponentPropsWithRef } from "react";
import React, { createContext } from "react";
import { TextField as TextFieldPrimitive } from "react-aria-components/TextField";

import { composeTwRenderProps } from "../../utils/compose";

/*
 * TextField Context
 */
interface TextFieldContext {
  variant?: "primary" | "secondary";
}

const TextFieldContext = createContext<TextFieldContext>({});

/*
 * TextField Root
 */
interface TextFieldRootProps
  extends ComponentPropsWithRef<typeof TextFieldPrimitive>, TextFieldVariants {
  /**
   * The variant of the text field.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

function TextFieldRoot({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: TextFieldRootProps) {
  const styles = React.useMemo(
    () => textFieldVariants({ fullWidth }),
    [fullWidth]
  );

  return (
    <TextFieldPrimitive
      data-slot="textfield"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => (
        <TextFieldContext value={{ variant }}>
          <>{typeof children === "function" ? children(values) : children}</>
        </TextFieldContext>
      )}
    </TextFieldPrimitive>
  );
}

/*
 * Exports
 */
export { TextFieldContext, TextFieldRoot };

export type { TextFieldRootProps };
