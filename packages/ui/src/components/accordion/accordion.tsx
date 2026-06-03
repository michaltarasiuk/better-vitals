"use client";

import { createContext } from "@lite-app/shared/create-context";
import { useContext } from "react";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import {
  DisclosureStateContext,
  Disclosure as RACDisclosure,
  Heading as RACDisclosureHeading,
  DisclosurePanel as RACDisclosurePanel,
  type HeadingProps as RACDisclosureHeadingProps,
  type DisclosurePanelProps as RACDisclosurePanelProps,
  type DisclosureProps as RACDisclosureProps,
} from "react-aria-components/Disclosure";
import {
  DisclosureGroup as RACDisclosureGroup,
  type DisclosureGroupProps as RACDisclosureGroupProps,
} from "react-aria-components/DisclosureGroup";

import { cnRenderProps } from "../../utils/cn-render-props";
import { IconChevronDown } from "../icons";
import { SurfaceContext } from "../surface";
import { accordionVariants, type AccordionVariants } from "./accordion.ts";

const slots = accordionVariants();

interface AccordionContextValue extends Pick<AccordionVariants, "variant"> {
  hideSeparator: boolean;
}

const [AccordionContext, useAccordionContext] =
  createContext<AccordionContextValue>("AccordionContext");

interface AccordionProps extends RACDisclosureGroupProps, AccordionVariants {
  hideSeparator?: boolean;
}

function Accordion({
  children,
  variant,
  className,
  hideSeparator = false,
  ...rest
}: AccordionProps) {
  const content = (
    <RACDisclosureGroup
      data-slot="accordion"
      className={cnRenderProps(
        className,
        slots.base({
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACDisclosureGroup>
  );
  return (
    <AccordionContext
      value={{
        hideSeparator,
        variant,
      }}
    >
      {variant === "surface" ? (
        <SurfaceContext
          value={{
            variant: "default",
          }}
        >
          {content}
        </SurfaceContext>
      ) : (
        content
      )}
    </AccordionContext>
  );
}

export { Accordion };
export type { AccordionProps };

interface AccordionItemProps extends RACDisclosureProps {}

function AccordionItem({ children, className, ...rest }: AccordionItemProps) {
  const { variant, hideSeparator } = useAccordionContext();
  return (
    <RACDisclosure
      data-slot="accordion-item"
      data-hide-separator={hideSeparator}
      className={cnRenderProps(
        className,
        slots.item({
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACDisclosure>
  );
}

export { AccordionItem };
export type { AccordionItemProps };

interface AccordionIndicatorProps extends React.ComponentProps<"span"> {}

function AccordionIndicator({
  children,
  className,
  ...rest
}: AccordionIndicatorProps) {
  const { variant } = useAccordionContext();
  const { isExpanded = false } = useContext(DisclosureStateContext) ?? {};
  return (
    <span
      data-slot="accordion-indicator"
      data-expanded={isExpanded}
      className={slots.indicator({
        className,
        variant,
      })}
      {...rest}
    >
      {children ?? <IconChevronDown aria-hidden="true" />}
    </span>
  );
}

export { AccordionIndicator };
export type { AccordionIndicatorProps };

interface AccordionHeadingProps extends RACDisclosureHeadingProps {}

function AccordionHeading({
  children,
  className,
  ...rest
}: AccordionHeadingProps) {
  const { variant } = useAccordionContext();
  return (
    <RACDisclosureHeading
      data-slot="accordion-heading"
      className={slots.heading({
        className,
        variant,
      })}
      {...rest}
    >
      {children}
    </RACDisclosureHeading>
  );
}

export { AccordionHeading };
export type { AccordionHeadingProps };

interface AccordionTriggerProps extends RACButtonProps {}

function AccordionTrigger({
  children,
  className,
  ...rest
}: AccordionTriggerProps) {
  const { variant } = useAccordionContext();
  return (
    <RACButton
      slot="trigger"
      data-slot="accordion-trigger"
      className={cnRenderProps(
        className,
        slots.trigger({
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACButton>
  );
}

export { AccordionTrigger };
export type { AccordionTriggerProps };

interface AccordionBodyProps extends React.ComponentProps<"div"> {}

function AccordionBody({ children, className, ...rest }: AccordionBodyProps) {
  const { variant } = useAccordionContext();
  return (
    <div
      data-slot="accordion-body"
      className={slots.body({
        variant,
      })}
      {...rest}
    >
      <div
        className={slots.bodyInner({
          className,
          variant,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export { AccordionBody };
export type { AccordionBodyProps };

interface AccordionPanelProps extends RACDisclosurePanelProps {}

function AccordionPanel({ children, className, ...rest }: AccordionPanelProps) {
  const { variant } = useAccordionContext();
  const { isExpanded = false } = useContext(DisclosureStateContext) ?? {};
  return (
    <RACDisclosurePanel
      data-slot="accordion-panel"
      data-expanded={isExpanded}
      className={cnRenderProps(
        className,
        slots.panel({
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACDisclosurePanel>
  );
}

export { AccordionPanel };
export type { AccordionPanelProps };
