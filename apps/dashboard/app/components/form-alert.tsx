import {
  Alert,
  AlertContent,
  AlertIndicator,
  AlertTitle,
} from "@lite-app/ui/components/alert";
import { cn } from "tailwind-variants";

export function FormAlert({ title }: { title: string }) {
  return (
    <Alert className={cn("bg-danger-soft shadow-none")}>
      <AlertIndicator className={cn("text-danger-soft-foreground")} />
      <AlertContent>
        <AlertTitle className={cn("text-danger-soft-foreground")}>
          {title}
        </AlertTitle>
      </AlertContent>
    </Alert>
  );
}
