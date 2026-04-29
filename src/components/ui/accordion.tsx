"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3 sm:py-4 px-2 sm:px-0 text-left font-semibold transition-all hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded-md [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        width={20}
        height={20}
        strokeWidth={2}
        className="shrink-0 ml-2 opacity-70 transition-transform duration-200 sm:duration-300"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      // Respect prefers-reduced-motion
      "[prefers-reduced-motion]:data-[state=closed]:animate-none [prefers-reduced-motion]:data-[state=open]:animate-none [prefers-reduced-motion]:transition-none"
    )}
    {...props}
  >
    <div className={cn("pb-3 sm:pb-4 pt-0", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
