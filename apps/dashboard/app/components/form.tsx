import { Form as UIForm } from "@lite-app/ui/components/form";
import { useFetcher, useSubmit, type SubmitOptions } from "react-router";

import {
  ActionDataContext,
  type FormActionData,
} from "~/components/action-data-context";

const INITIAL_ACTION_DATA: FormActionData = { status: "idle" };

export interface FormProps extends SubmitOptions {
  children: React.ReactNode;
  actionData?: FormActionData;
}

export function Form({
  children,
  actionData = INITIAL_ACTION_DATA,
  ...options
}: FormProps) {
  const submit = useSubmit();

  return (
    <ActionDataContext value={actionData}>
      <UIForm
        onSubmit={(e) => {
          e.preventDefault();
          submit(e.currentTarget, options);
        }}
      >
        {children}
      </UIForm>
    </ActionDataContext>
  );
}

export interface FormFetcherProps extends SubmitOptions {
  children: React.ReactNode;
  actionData?: FormActionData;
}

export function FormFetcher({
  children,
  actionData = INITIAL_ACTION_DATA,
  ...options
}: FormFetcherProps) {
  const fetcher = useFetcher();

  return (
    <ActionDataContext value={actionData}>
      <UIForm
        onSubmit={(e) => {
          e.preventDefault();
          fetcher.submit(e.currentTarget, options);
        }}
      >
        {children}
      </UIForm>
    </ActionDataContext>
  );
}
