"use client";

import type { TextFieldVariants } from "@lite-app/styles/components/textfield";
import { textFieldVariants } from "@lite-app/styles/components/textfield";
import type { ComponentPropsWithRef } from "react";
import React, { createContext } from "react";
import { TextField as TextFieldPrimitive } from "react-aria-components/TextField";

import { composeTwRenderProps } from "../../utils/compose";

interface TextFieldContext {
  variant?: "primary" | "secondary";
}

const TextFieldContext = createContext<TextFieldContext>({});

interface TextFieldRootProps
  extends ComponentPropsWithRef<typeof TextFieldPrimitive>, TextFieldVariants {
  variant?: "primary" | "secondary";
}

function TextFieldRoot({
  variant,
  fullWidth,
  isDisabled,
  isRequired,
  isInvalid,
  className,
  children,
  ...rest
}: TextFieldRootProps) {
  const styles = textFieldVariants({ fullWidth });

  return (
    <TextFieldPrimitive
      data-slot="textfield"
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      className={composeTwRenderProps(className, styles)}
      {...rest}
    >
      {(values) => (
        <TextFieldContext value={{ variant }}>
          <>{typeof children === "function" ? children(values) : children}</>
        </TextFieldContext>
      )}
    </TextFieldPrimitive>
  );
}

export { TextFieldContext, TextFieldRoot };

export type { TextFieldRootProps };
