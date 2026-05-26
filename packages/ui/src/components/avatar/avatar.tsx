"use client";

import * as RadixAvatar from "@radix-ui/react-avatar";
import { createContext, useContext, type ComponentPropsWithRef } from "react";

import { avatarVariants, type AvatarVariants } from "./avatar.variants";

interface RadixProps {
  Root: ComponentPropsWithRef<typeof RadixAvatar.Root>;
  Image: ComponentPropsWithRef<typeof RadixAvatar.Image>;
  Fallback: ComponentPropsWithRef<typeof RadixAvatar.Fallback>;
}

const slots = avatarVariants();

export const AvatarContext = createContext<AvatarVariants>({});

interface AvatarProps
  extends Omit<RadixProps["Root"], keyof AvatarVariants>, AvatarVariants {}

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

interface AvatarImageProps extends Omit<
  RadixProps["Image"],
  keyof AvatarVariants
> {}

function AvatarImage({ className, ...rest }: AvatarImageProps) {
  const { color, size, variant } = useContext(AvatarContext);
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

interface AvatarFallbackProps extends Omit<
  RadixProps["Fallback"],
  keyof AvatarVariants
> {}

function AvatarFallback({ className, ...rest }: AvatarFallbackProps) {
  const { color, size, variant } = useContext(AvatarContext);
  return (
    <RadixAvatar.Fallback
      className={slots.fallback({
        className,
        color,
        size,
        variant,
      })}
      data-slot="avatar-fallback"
      {...rest}
    />
  );
}

export { AvatarFallback };
export type { AvatarFallbackProps };
