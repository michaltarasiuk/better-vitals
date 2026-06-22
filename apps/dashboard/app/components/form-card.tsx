import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  cardVariants,
  type CardContentProps,
  type CardDescriptionProps,
  type CardFooterProps,
  type CardHeaderProps,
} from "@lite-app/ui/components/card";
import { cn } from "tailwind-variants";

interface FormCardHeaderProps extends CardHeaderProps {}

export function FormCardHeader({
  children,
  className,
  ...rest
}: FormCardHeaderProps) {
  return (
    <CardHeader className={cn("items-center gap-1", className)} {...rest}>
      {children}
    </CardHeader>
  );
}

interface FormCardTitleProps extends React.ComponentProps<"h1"> {}

export function FormCardTitle({
  children,
  className,
  ...rest
}: FormCardTitleProps) {
  return (
    <h1
      className={cn(
        cardVariants().title({
          className: cn("text-xl font-medium", className),
        }),
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}

interface FormCardDescriptionProps extends CardDescriptionProps {}

export function FormCardDescription({
  children,
  className,
  ...rest
}: FormCardDescriptionProps) {
  return (
    <CardDescription className={cn("text-center", className)} {...rest}>
      {children}
    </CardDescription>
  );
}

interface FormCardContentProps extends CardContentProps {}

export function FormCardContent({
  children,
  className,
  ...rest
}: FormCardContentProps) {
  return (
    <CardContent className={cn("gap-2", className)} {...rest}>
      {children}
    </CardContent>
  );
}

interface FormCardFooterProps extends CardFooterProps {}

export function FormCardFooter({
  children,
  className,
  ...rest
}: FormCardFooterProps) {
  return (
    <CardFooter className={cn("mt-4 flex-col gap-2", className)} {...rest}>
      {children}
    </CardFooter>
  );
}
