import {
  Accordion as AccordionRoot,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion";

const Accordion = Object.assign(AccordionRoot, {
  Body: AccordionBody,
  Heading: AccordionHeading,
  Indicator: AccordionIndicator,
  Item: AccordionItem,
  Panel: AccordionPanel,
  Trigger: AccordionTrigger,
});

export {
  Accordion,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
};
export { accordionVariants } from "./accordion.variants";

export type {
  AccordionBodyProps,
  AccordionHeadingProps,
  AccordionIndicatorProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion";
export type { AccordionVariants } from "./accordion.variants";
