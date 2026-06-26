import { Button, type ButtonProps } from "@better-vitals/ui/components/button";
import { Spinner } from "@better-vitals/ui/components/spinner";
import { cn } from "tailwind-variants";

interface SubmitButtonProps extends Omit<ButtonProps, "type"> {}

export function SubmitButton({
  children,
  className,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button type="submit" className={cn("w-full", className)} {...rest}>
      {(props) => (
        <>
          {props.isPending && <Spinner size="sm" color="current" />}
          {typeof children === "function" ? children(props) : children}
        </>
      )}
    </Button>
  );
}
