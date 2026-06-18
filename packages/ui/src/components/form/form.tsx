import * as Aria from "react-aria-components/Form";

interface FormProps extends Aria.FormProps {}

export function Form({ children, onSubmit, ...rest }: FormProps) {
  return (
    <Aria.Form onSubmit={onSubmit} {...rest}>
      {children}
    </Aria.Form>
  );
}
