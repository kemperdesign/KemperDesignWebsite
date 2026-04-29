'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.',
        },
        {
            id: 'item-2',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.',
        },
        {
            id: 'item-3',
            question: 'Can I change or cancel my order?',
            answer: 'You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.',
        },
        {
            id: 'item-4',
            question: 'Do you ship internationally?',
            answer: "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations.",
        },
        {
            id: 'item-5',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.',
        },
    ]

    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="accordion-heading"
                        className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground mt-3 sm:mt-4 md:mt-6 text-balance text-sm sm:text-base md:text-lg leading-relaxed">
                        Discover quick and comprehensive answers to common questions about our platform, services, and features.
                    </p>
                </div>

                <div className="mx-auto mt-8 sm:mt-10 md:mt-12 lg:mt-14 max-w-2xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-xl sm:rounded-2xl border px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-sm ring-2 sm:ring-4 dark:ring-0"
                        aria-labelledby="accordion-heading">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed py-1"
                                aria-label={`Question ${index + 1} of ${faqItems.length}`}>
                                <AccordionTrigger
                                    className="cursor-pointer text-sm sm:text-base md:text-lg hover:no-underline py-3 sm:py-4 px-0 font-medium"
                                    aria-expanded="false"
                                >
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-xs sm:text-sm md:text-base leading-relaxed pb-3 sm:pb-4">
                                    <p>{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base leading-relaxed">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#support"
                            className="text-foreground font-medium underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded-sm"
                            aria-label="Contact customer support team">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
