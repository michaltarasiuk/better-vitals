// oxlint-disable typescript/ban-ts-comment, typescript/no-explicit-any, unicorn/no-lonely-if
// @ts-nocheck

"use client";

import { mergeRefs, useLayoutEffect } from "@react-aria/utils";
import type { AllHTMLAttributes, ForwardedRef, ReactElement } from "react";
import React, { forwardRef, useMemo, useRef } from "react";

export type DOMRenderFunction<
  E extends keyof React.JSX.IntrinsicElements,
  T,
> = (props: React.JSX.IntrinsicElements[E], renderProps: T) => ReactElement;
export interface DOMRenderProps<
  E extends keyof React.JSX.IntrinsicElements,
  T,
> {
  render?: DOMRenderFunction<E, T>;
}

function DOMElement(
  ElementType: string,
  props: DOMRenderProps<any, any> & AllHTMLAttributes<HTMLElement>,
  forwardedRef: ForwardedRef<HTMLElement>
) {
  const { render, ...otherProps } = props;
  const elementRef = useRef<HTMLElement | null>(null);
  const ref = useMemo(
    () => mergeRefs(forwardedRef, elementRef),
    [forwardedRef, elementRef]
  );

  useLayoutEffect(() => {
    if (
      typeof process !== "undefined" &&
      process.env?.["NODE_ENV"] !== "production" &&
      render
    ) {
      if (!elementRef.current) {
        console.warn(
          "Ref was not connected to DOM element returned by custom `render` function. Did you forget to pass through or merge the `ref`?"
        );
      }
    }
  }, [ElementType, render]);

  const domProps: any = { ...otherProps, ref };

  if (render) {
    return render(domProps);
  }

  return <ElementType {...domProps} />;
}

type DOMComponents = {
  [E in keyof React.JSX.IntrinsicElements]: (
    props: DOMRenderProps<E, any> & React.JSX.IntrinsicElements[E]
  ) => ReactElement;
};

const domComponentCache: Record<string, unknown> = {};

export const dom = new Proxy(
  {},
  {
    get(_target, elementType) {
      if (typeof elementType !== "string") {
        return;
      }

      let res = domComponentCache[elementType];

      if (!res) {
        res = forwardRef(DOMElement.bind(null, elementType));
        domComponentCache[elementType] = res;
      }

      return res;
    },
  }
) as DOMComponents;
