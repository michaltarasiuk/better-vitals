"use client";

import { createContext } from "@lite-app/shared/create-context";
import * as RadixAvatar from "@radix-ui/react-avatar";

import { avatarVariants, type AvatarVariants } from "./avatar.ts";

type RootProps = React.ComponentPropsWithRef<typeof RadixAvatar.Root>;
type ImageProps = React.ComponentPropsWithRef<typeof RadixAvatar.Image>;
type FallbackProps = React.ComponentPropsWithRef<typeof RadixAvatar.Fallback>;

const slots = avatarVariants();

interface AvatarContextValue extends AvatarVariants {}

export const [AvatarContext, useAvatarContext] =
  createContext<AvatarContextValue>("AvatarContext");

interface AvatarProps
  extends Omit<RootProps, keyof AvatarVariants>, AvatarVariants {}

function Avatar({
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

export { Avatar };
export type { AvatarProps };

interface AvatarImageProps extends ImageProps {}

function AvatarImage({ className, ...rest }: AvatarImageProps) {
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

export { AvatarImage };
export type { AvatarImageProps };

interface AvatarFallbackProps extends FallbackProps {}

function AvatarFallback({ children, className, ...rest }: AvatarFallbackProps) {
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

export { AvatarFallback };
export type { AvatarFallbackProps };
