import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
export const metadata: Metadata = { title: "Terms & Conditions", description: "Read the terms governing the use of KenoraTech's website and services." };
const sections: LegalSection[] = [
  { title: "Acceptance of Terms", body: ["By accessing this website or engaging KenoraTech, you agree to these Terms & Conditions. If you do not agree, please do not use the website or request services."] },
  { title: "Services", body: ["KenoraTech provides website development, digital products, UI/UX design, maintenance and related services. Scope, timing, pricing and deliverables are confirmed in written project documents."] },
  { title: "User Responsibilities", body: ["You are responsible for accurate information, timely feedback, approved materials and authorised access credentials needed for project delivery."] },
  { title: "Accounts", body: ["You are responsible for maintaining the confidentiality of credentials and for activity carried out through accounts you control."] },
  { title: "Payments", body: ["Deposits, milestones and payment deadlines are described in the applicable proposal, agreement or invoice."] },
  { title: "Refund Policy", body: ["Refund eligibility is determined by the signed agreement and the work completed at the time of a request."] },
  { title: "Intellectual Property", body: ["KenoraTech retains its pre-existing tools, frameworks and know-how. Client-specific deliverables transfer according to the applicable agreement after full payment."] },
  { title: "Confidentiality", body: ["Both parties should protect non-public information shared for project delivery and use it only for the intended business purpose."] },
  { title: "Third Party Services", body: ["Third-party tools, hosting and integrations are governed by their own terms and availability. KenoraTech is not responsible for their actions or outages."] },
  { title: "Limitation of Liability", body: ["To the extent permitted by law, KenoraTech is not liable for indirect, incidental, consequential or loss-of-profit damages."] },
  { title: "Disclaimer", body: ["The website is provided on an as-is basis. We do not guarantee uninterrupted availability or error-free operation."] },
  { title: "Termination", body: ["Either party may end a service engagement according to the agreed project terms. Outstanding obligations remain payable."] },
  { title: "Governing Law", body: ["These terms are governed by applicable laws in India, subject to the jurisdiction of the appropriate courts."] },
  { title: "Changes to Terms", body: ["We may revise these terms from time to time. Continued use after publication of revised terms signifies acceptance."] },
  { title: "Contact Information", body: ["For questions about these terms, contact hello@kenoratech.com."] }
];
export default function Page() { return <LegalPage title="Terms & Conditions" description="The terms that govern use of the KenoraTech website and our client service engagements." updatedAt="July 30, 2026" sections={sections} />; }