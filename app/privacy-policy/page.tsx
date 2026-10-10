import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
export const metadata: Metadata = { title: "Privacy Policy", description: "Learn how KenoraTech collects, stores, and protects your personal information." };
const sections: LegalSection[] = [
  { title: "Introduction", body: ["This Privacy Policy explains how KenoraTech collects, uses and protects information when you visit our website or work with us."] },
  { title: "Information We Collect", body: ["We collect information you provide through forms, email, project discussions and support requests."], bullets: ["Personal information such as name, email, phone number and business details.", "Technical information such as browser, device, pages viewed and referral source.", "Project information, feedback and materials needed to provide services."] },
  { title: "How We Use Information", body: ["We use information to respond to inquiries, provide and improve services, manage client relationships, protect our systems and comply with legal obligations."] },
  { title: "Cookies", body: ["We use essential and analytics technologies to keep the website functioning and understand how it is used. See our Cookie Policy for more details."] },
  { title: "Data Sharing", body: ["We do not sell personal information. We may share limited information with trusted providers when needed to deliver services, host systems, process payments or meet legal obligations."] },
  { title: "Third Party Services", body: ["Some services process information under their own privacy policies."], bullets: ["Cloudinary for media and document storage.", "Google Analytics for aggregated website analytics.", "Google Maps for location and map functionality."] },
  { title: "Security", body: ["We use reasonable technical and organisational safeguards. No online service can guarantee absolute security."] },
  { title: "Data Retention", body: ["We retain information only for as long as needed for service delivery, support, legal, tax and operational purposes."] },
  { title: "Your Rights", body: ["You may request access, correction or deletion of your personal information, subject to applicable law."] },
  { title: "Children's Privacy", body: ["Our services are not directed to children, and we do not knowingly collect personal information from children."] },
  { title: "International Transfers", body: ["Information may be processed in locations where our providers operate, with appropriate safeguards where required."] },
  { title: "Changes to Privacy Policy", body: ["We may update this policy periodically. The latest version and update date are always shown on this page."] },
  { title: "Contact Information", body: ["For privacy questions or requests, contact hello@kenoratech.com."] }
];
export default function Page() { return <LegalPage title="Privacy Policy" description="How KenoraTech collects, stores, uses and protects your personal information." updatedAt="July 30, 2026" sections={sections} />; }