import { createContext } from "@better-vitals/shared/create-context";
import type { ValidationErrors } from "@react-types/shared";
import type { ContextType } from "react";

interface FormAlert {
  type: "alert";
  title: string;
}

export type FormActionError =
  | FormAlert
  | { type: "form"; validationErrors: ValidationErrors };

export type FormActionData =
  | { status: "idle" }
  | { status: "success"; success: FormAlert }
  | { status: "error"; error: FormActionError };

type FormContextValue = ContextType<typeof FormContext>;

export const [FormContext, useFormContext] =
  createContext<FormActionData>("FormContext");

const INITIAL_VALUE: FormContextValue = { status: "idle" };

interface FormProviderProps {
  value?: FormContextValue;
  children: React.ReactNode;
}

export function FormProvider({
  value = INITIAL_VALUE,
  children,
}: FormProviderProps) {
  return <FormContext value={value}>{children}</FormContext>;
}
