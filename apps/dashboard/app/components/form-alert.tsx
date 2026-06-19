import {
  Alert,
  AlertContent,
  AlertIndicator,
  AlertTitle,
} from "@lite-app/ui/components/alert";
import { tv } from "tailwind-variants";

const FORM_ALERT_STATUS = "danger";

const formAlertVariants = tv({
  slots: {
    root: null,
    indicator: null,
    title: null,
  },
  variants: {
    status: {
      danger: {
        root: "bg-danger-soft shadow-none",
        indicator: "text-danger-soft-foreground",
        title: "text-danger-soft-foreground",
      },
    },
  },
});

export function FormAlert({ title }: { title: string }) {
  const slots = formAlertVariants({ status: FORM_ALERT_STATUS });

  return (
    <Alert status={FORM_ALERT_STATUS} className={slots.root()}>
      <AlertIndicator className={slots.indicator()} />
      <AlertContent>
        <AlertTitle className={slots.title()}>{title}</AlertTitle>
      </AlertContent>
    </Alert>
  );
}
