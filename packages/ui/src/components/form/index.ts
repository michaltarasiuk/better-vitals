import type { ComponentProps } from "react";

import { FormRoot } from "./form";

export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
});

export interface Form {
  Props: ComponentProps<typeof FormRoot>;
  RootProps: ComponentProps<typeof FormRoot>;
}

export { FormRoot };

export type { FormRootProps as FormProps, FormRootProps } from "./form";
