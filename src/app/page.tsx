import FAQs from "@/components/ui/faq";
import FAQsTwo from "@/components/ui/demo";

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kemper Design Services",
    "description": "Professional web design and development",
    "url": "https://kemperdesignservices.com",
    "email": "kemperdesignservices@gmail.com",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center py-6 sm:py-8 md:py-12 lg:py-16 leading-tight">
          FAQ Component Integration
        </h1>

        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center uppercase tracking-wide text-muted-foreground">
              Version 1: Static Layout
            </h2>
            <FAQs />
          </div>

          <hr className="border-dashed my-4 sm:my-6 md:my-8" />

          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center uppercase tracking-wide text-muted-foreground">
              Version 2: Interactive Accordion
            </h2>
            <FAQsTwo />
          </div>
        </div>
      </main>
    </div>
  );
}
