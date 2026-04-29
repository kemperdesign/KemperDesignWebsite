export default function FAQs() {
    const faqs = [
        {
            id: "refund-policy",
            question: "What is the refund policy?",
            answer: "We offer a 30-day money back guarantee. If you are not satisfied with our product, you can request a refund within 30 days of your purchase.",
            details: [
                "To request a refund, please contact our support team with your order number and reason for the refund.",
                "Refunds will be processed within 3-5 business days.",
                "Please note that refunds are only available for new customers and are limited to one per customer."
            ]
        },
        {
            id: "cancel-subscription",
            question: "How do I cancel my subscription?",
            answer: "You can cancel your subscription at any time by logging into your account and clicking on the cancel button."
        },
        {
            id: "upgrade-plan",
            question: "Can I upgrade my plan?",
            answer: "Yes, you can upgrade your plan at any time by logging into your account and selecting the plan you want to upgrade to.",
            details: [
                "You will be charged the difference in price between your current plan and the plan you are upgrading to.",
                "Your new plan will take effect immediately and you will be billed at the new rate on your next billing cycle."
            ]
        },
        {
            id: "phone-support",
            question: "Do you offer phone support?",
            answer: "We do not offer phone support at this time. However, you can contact us via email or live chat for any questions or concerns you may have."
        }
    ];

    return (
        <section
            className="scroll-py-12 py-8 sm:py-12 md:scroll-py-24 md:py-20 lg:py-28"
            aria-labelledby="faq-heading"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-x-12 lg:grid-cols-[1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2
                            id="faq-heading"
                            className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
                        >
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                            Accusantium quisquam. Illo, omnis?
                        </p>
                    </div>

                    <dl
                        className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0 w-full space-y-0"
                        role="list"
                    >
                        {faqs.map((faq) => (
                            <article
                                key={faq.id}
                                className="py-5 sm:py-6 md:py-7 px-3 sm:px-4 md:px-5 rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-foreground"
                                role="listitem"
                            >
                                <h3
                                    id={faq.id}
                                    className="font-semibold text-sm sm:text-base md:text-lg leading-snug"
                                >
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                                    {faq.answer}
                                </p>
                                {faq.details && (
                                    <div
                                        role="region"
                                        aria-label={`Details for ${faq.question}`}
                                    >
                                        {faq.question.includes("refund") ? (
                                            <ol className="list-outside list-decimal space-y-1.5 sm:space-y-2 pl-5 sm:pl-6 mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base">
                                                {faq.details.map((detail, idx) => (
                                                    <li key={idx} className="text-muted-foreground leading-relaxed">
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <ul className="list-outside list-disc space-y-1.5 sm:space-y-2 pl-5 sm:pl-6 mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base">
                                                {faq.details.map((detail, idx) => (
                                                    <li key={idx} className="text-muted-foreground leading-relaxed">
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </article>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
