import {
  Alert,
  AlertContent,
  AlertIndicator,
  AlertTitle,
} from "@better-vitals/ui/components/alert";
import { tv } from "tailwind-variants";

import { useFormContext } from "~/components/form-context";

const formAlertVariants = tv({
  slots: {
    root: "rounded-field",
    indicator: null,
    title: null,
  },
  variants: {
    status: {
      success: {
        root: "bg-success-soft shadow-none",
        indicator: "text-success-soft-foreground",
        title: "text-success-soft-foreground",
      },
      danger: {
        root: "bg-danger-soft shadow-none",
        indicator: "text-danger-soft-foreground",
        title: "text-danger-soft-foreground",
      },
    },
  },
});

export function FormAlert() {
  const context = useFormContext();

  let status: "success" | "danger";
  let title: string;

  if (context.status === "success" && context.success.type === "alert") {
    status = "success";
    ({ title } = context.success);
  } else if (context.status === "error" && context.error.type === "alert") {
    status = "danger";
    ({ title } = context.error);
  } else {
    return null;
  }

  const slots = formAlertVariants({
    status,
  });

  return (
    <Alert status="danger" className={slots.root()}>
      <AlertIndicator className={slots.indicator()} />
      <AlertContent>
        <AlertTitle className={slots.title()}>{title}</AlertTitle>
      </AlertContent>
    </Alert>
  );
}
