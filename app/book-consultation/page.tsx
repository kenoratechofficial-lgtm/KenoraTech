import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ConsultationBooking } from "@/components/consultation-booking";
export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Choose a convenient time to discuss your KenoraTech website, web application or digital product.",
  alternates: { canonical: "/book-consultation" },
};
export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Consultation"
        title="Let’s talk about your project."
        description="Choose a service, a convenient time, and tell us what you would like to build."
      />
      <section className="container pb-20">
        <ConsultationBooking />
      </section>
    </>
  );
}