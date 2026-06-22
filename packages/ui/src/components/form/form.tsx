import * as Aria from "react-aria-components/Form";

interface FormProps extends Aria.FormProps {}

export function Form({ children, ...rest }: FormProps) {
  return <Aria.Form {...rest}>{children}</Aria.Form>;
}
