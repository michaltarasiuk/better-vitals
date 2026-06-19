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
  variant,
  size,
  color,
  className,
  ...rest
}: AvatarProps) {
  return (
    <AvatarContext
      value={{
        variant,
        size,
        color,
      }}
    >
      <RadixAvatar.Root
        className={slots.base({
          variant,
          size,
          className,
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
  const { variant, size, color } = useAvatarContext();
  return (
    <RadixAvatar.Image
      className={slots.image({
        variant,
        size,
        color,
        className,
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
  const { variant, size, color } = useAvatarContext();
  return (
    <RadixAvatar.Fallback
      data-slot="avatar-fallback"
      className={slots.fallback({
        variant,
        size,
        color,
        className,
      })}
      {...rest}
    >
      {children}
    </RadixAvatar.Fallback>
  );
}
