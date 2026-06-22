import { Button } from "@lite-app/ui/components/button";
import { Spinner } from "@lite-app/ui/components/spinner";
import { cn } from "tailwind-variants";

interface SubmitButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "type"
> {}

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
