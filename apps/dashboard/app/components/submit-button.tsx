import { Button } from "@lite-app/ui/components/button";
import { Spinner } from "@lite-app/ui/components/spinner";
import { useNavigation } from "react-router";
import { cn } from "tailwind-variants";

interface SubmitButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "type" | "isPending"
> {}

export function SubmitButton({
  children,
  className,
  ...rest
}: SubmitButtonProps) {
  const navigation = useNavigation();
  return (
    <Button
      type="submit"
      isPending={navigation.state === "submitting"}
      className={cn("w-full", className)}
      {...rest}
    >
      {(props) => (
        <>
          {props.isPending ? <Spinner color="current" size="sm" /> : null}
          {typeof children === "function" ? children(props) : children}
        </>
      )}
    </Button>
  );
}
