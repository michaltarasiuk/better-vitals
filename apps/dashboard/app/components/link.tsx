import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "@better-vitals/ui/components/link";
import { Link as RouterLink } from "react-router";

interface LinkProps extends AriaLinkProps {}

export function Link({ children, ...rest }: LinkProps) {
  return (
    <AriaLink
      render={(props) => {
        if ("href" in props) {
          const { href, ...linkProps } = props;
          return <RouterLink {...linkProps} to={href} />;
        }
        return <span {...props} />;
      }}
      {...rest}
    >
      {children}
    </AriaLink>
  );
}
