import {
  Alert,
  AlertContent,
  AlertIndicator,
  AlertTitle,
} from "@lite-app/ui/components/alert";
import { tv, type VariantProps } from "tailwind-variants";

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

interface FormAlertProps extends VariantProps<typeof formAlertVariants> {
  title: string;
}

export function FormAlert({ title, status }: FormAlertProps) {
  const slots = formAlertVariants({
    status,
  });

  return (
    <Alert status={status} className={slots.root()}>
      <AlertIndicator className={slots.indicator()} />
      <AlertContent>
        <AlertTitle className={slots.title()}>{title}</AlertTitle>
      </AlertContent>
    </Alert>
  );
}
