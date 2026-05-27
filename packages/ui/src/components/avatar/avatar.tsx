"use client";

import { createContext } from "@lite-app/shared/create-context";
import * as RadixAvatar from "@radix-ui/react-avatar";
import type { ComponentPropsWithRef } from "react";

import { avatarVariants, type AvatarVariants } from "./avatar.variants";

type RootProps = ComponentPropsWithRef<typeof RadixAvatar.Root>;
type ImageProps = ComponentPropsWithRef<typeof RadixAvatar.Image>;
type FallbackProps = ComponentPropsWithRef<typeof RadixAvatar.Fallback>;

const slots = avatarVariants();

export const [AvatarContext, useAvatarContext] =
  createContext<AvatarVariants>("AvatarContext");

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

function AvatarFallback({ className, ...rest }: AvatarFallbackProps) {
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
    />
  );
}

export { AvatarFallback };
export type { AvatarFallbackProps };
