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
import { tv } from "tailwind-variants";

const formCardVariants = tv({
  slots: {
    header: "items-center gap-1",
    title: "text-xl font-medium",
    description: "text-center",
    content: "gap-2",
    footer: "mt-4 flex-col gap-2",
  },
});

const slots = formCardVariants();

interface FormCardHeaderProps extends CardHeaderProps {}

export function FormCardHeader({
  children,
  className,
  ...rest
}: FormCardHeaderProps) {
  return (
    <CardHeader className={slots.header({ className })} {...rest}>
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
      className={cardVariants().title({
        className: slots.title({ className }),
      })}
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
    <CardDescription className={slots.description({ className })} {...rest}>
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
    <CardContent className={slots.content({ className })} {...rest}>
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
    <CardFooter className={slots.footer({ className })} {...rest}>
      {children}
    </CardFooter>
  );
}
