import { createContext } from "@lite-app/shared/create-context";
import * as RadixAvatar from "@radix-ui/react-avatar";

import { avatarVariants, type AvatarVariants } from "./avatar";

const slots = avatarVariants();

interface AvatarContextValue extends AvatarVariants {}

export const [AvatarContext, useAvatarContext] =
  createContext<AvatarContextValue>("AvatarContext");

interface AvatarProps
  extends
    Omit<React.ComponentProps<typeof RadixAvatar.Root>, keyof AvatarVariants>,
    AvatarVariants {}

export function Avatar({
  children,
  color,
  size,
  variant,
  className,
  ...rest
}: AvatarProps) {
  return (
    <AvatarContext
      value={{
        color,
        size,
        variant,
      }}
    >
      <RadixAvatar.Root
        className={slots.base({
          className,
          size,
          variant,
        })}
        {...rest}
      >
        {children}
      </RadixAvatar.Root>
    </AvatarContext>
  );
}

interface AvatarImageProps extends React.ComponentProps<
  typeof RadixAvatar.Image
> {}

export function AvatarImage({ className, ...rest }: AvatarImageProps) {
  const { color, size, variant } = useAvatarContext();
  return (
    <RadixAvatar.Image
      className={slots.image({
        className,
        color,
        size,
        variant,
      })}
      {...rest}
    />
  );
}

interface AvatarFallbackProps extends React.ComponentProps<
  typeof RadixAvatar.Fallback
> {}

export function AvatarFallback({
  children,
  className,
  ...rest
}: AvatarFallbackProps) {
  const { color, size, variant } = useAvatarContext();
  return (
    <RadixAvatar.Fallback
      data-slot="avatar-fallback"
      className={slots.fallback({
        className,
        color,
        size,
        variant,
      })}
      {...rest}
    >
      {children}
    </RadixAvatar.Fallback>
  );
}
