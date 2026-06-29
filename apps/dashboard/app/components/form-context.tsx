import { createContext } from "@better-vitals/shared/create-context";
import type { ValidationErrors } from "@react-types/shared";
import type { ContextType } from "react";

export type FormActionSuccess =
  | { type: "alert"; title: string }
  | { type: "dismiss" };

export type FormActionError =
  | { type: "alert"; title: string }
  | { type: "form"; validationErrors: ValidationErrors };

export type FormActionData =
  | { status: "idle" }
  | { status: "success"; success: FormActionSuccess }
  | { status: "error"; error: FormActionError };

type FormContextValue = ContextType<typeof FormContext>;

export const [FormContext, useFormContext] =
  createContext<FormActionData>("FormContext");

const INITIAL_VALUE: FormContextValue = {
  status: "idle",
};

export function FormProvider({
  value = INITIAL_VALUE,
  children,
}: {
  value?: FormContextValue;
  children: React.ReactNode;
}) {
  return <FormContext value={value}>{children}</FormContext>;
}
