import { cn } from "tailwind-variants";

interface FormFieldsProps extends React.ComponentProps<"div"> {}

export function FormFields({ children, className, ...rest }: FormFieldsProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...rest}>
      {children}
    </div>
  );
}
