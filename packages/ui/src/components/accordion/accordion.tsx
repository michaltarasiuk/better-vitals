import { createContext } from "@lite-app/shared/create-context";
import { ChevronDownIcon } from "lucide-react";
import { use } from "react";
import * as Aria from "react-aria-components/DisclosureGroup";

import { cnRenderProps } from "../../utils/cn-render-props";
import { SurfaceContext } from "../surface";
import { accordionVariants, type AccordionVariants } from "./accordion";

const slots = accordionVariants();

interface AccordionContextValue extends AccordionVariants {
  hideSeparator: boolean;
}

const [AccordionContext, useAccordionContext] =
  createContext<AccordionContextValue>("AccordionContext");

interface AccordionProps extends Aria.DisclosureGroupProps, AccordionVariants {
  hideSeparator?: boolean;
}

export function Accordion({
  children,
  variant,
  className,
  hideSeparator = false,
  ...rest
}: AccordionProps) {
  const content = (
    <Aria.DisclosureGroup
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
    </Aria.DisclosureGroup>
  );
  return (
    <AccordionContext
      value={{
        variant,
        hideSeparator,
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

interface AccordionItemProps extends Aria.DisclosureProps {}

export function AccordionItem({
  children,
  className,
  ...rest
}: AccordionItemProps) {
  const { variant, hideSeparator } = useAccordionContext();
  return (
    <Aria.Disclosure
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
    </Aria.Disclosure>
  );
}

interface AccordionIndicatorProps extends React.ComponentProps<"span"> {}

export function AccordionIndicator({
  children,
  className,
  ...rest
}: AccordionIndicatorProps) {
  const { variant } = useAccordionContext();
  const { isExpanded = false } = use(Aria.DisclosureStateContext) ?? {};
  return (
    <span
      data-slot="accordion-indicator"
      data-expanded={isExpanded}
      className={slots.indicator({
        variant,
        className,
      })}
      {...rest}
    >
      {children ?? <ChevronDownIcon aria-hidden size={16} />}
    </span>
  );
}

interface AccordionHeadingProps extends Aria.HeadingProps {}

export function AccordionHeading({
  children,
  className,
  ...rest
}: AccordionHeadingProps) {
  const { variant } = useAccordionContext();
  return (
    <Aria.Heading
      data-slot="accordion-heading"
      className={slots.heading({
        variant,
        className,
      })}
      {...rest}
    >
      {children}
    </Aria.Heading>
  );
}

interface AccordionTriggerProps extends Aria.ButtonProps {}

export function AccordionTrigger({
  children,
  className,
  ...rest
}: AccordionTriggerProps) {
  const { variant } = useAccordionContext();
  return (
    <Aria.Button
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
    </Aria.Button>
  );
}

interface AccordionBodyProps extends React.ComponentProps<"div"> {}

export function AccordionBody({
  children,
  className,
  ...rest
}: AccordionBodyProps) {
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
          variant,
          className,
        })}
      >
        {children}
      </div>
    </div>
  );
}

interface AccordionPanelProps extends Aria.DisclosurePanelProps {}

export function AccordionPanel({
  children,
  className,
  ...rest
}: AccordionPanelProps) {
  const { variant } = useAccordionContext();
  const { isExpanded = false } = use(Aria.DisclosureStateContext) ?? {};
  return (
    <Aria.DisclosurePanel
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
    </Aria.DisclosurePanel>
  );
}
