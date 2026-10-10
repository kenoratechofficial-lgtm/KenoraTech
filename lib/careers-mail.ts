import nodemailer from "nodemailer";
import type { Application } from "@/lib/applications";

type SmtpConfiguration = { host: string; port: number; user: string; pass: string; from: string };
export type DemoApprovalEmailResult = "sent" | "not_configured" | "failed";
type SmtpConfigurationStatus = { SMTP_HOST: boolean; SMTP_PORT: boolean; SMTP_USER: boolean; SMTP_PASS: boolean; MAIL_FROM: boolean };

function value(name: "SMTP_HOST" | "SMTP_PORT" | "SMTP_USER" | "SMTP_PASS" | "MAIL_FROM") { return process.env[name]?.trim() || ""; }

export function smtpConfigurationStatus(): SmtpConfigurationStatus {
  const portValue = value("SMTP_PORT"), port = Number(portValue);
  return { SMTP_HOST: Boolean(value("SMTP_HOST")), SMTP_PORT: Boolean(portValue) && Number.isInteger(port) && port >= 1 && port <= 65535, SMTP_USER: Boolean(value("SMTP_USER")), SMTP_PASS: Boolean(value("SMTP_PASS")), MAIL_FROM: Boolean(value("MAIL_FROM")) };
}

function smtpConfiguration(): SmtpConfiguration | null {
  const host = value("SMTP_HOST"), portValue = value("SMTP_PORT"), user = value("SMTP_USER"), pass = value("SMTP_PASS"), from = value("MAIL_FROM"), port = Number(portValue);
  const status = smtpConfigurationStatus();
  if (!Object.values(status).every(Boolean)) {
    console.error("SMTP configuration is incomplete.", { SMTP_HOST_configured: status.SMTP_HOST, SMTP_PORT_configured: status.SMTP_PORT, SMTP_USER_configured: status.SMTP_USER, SMTP_PASS_configured: status.SMTP_PASS, MAIL_FROM_configured: status.MAIL_FROM });
    return null;
  }
  return { host, port, user, pass, from };
}

function transport(config: SmtpConfiguration) { return nodemailer.createTransport({ host: config.host, port: config.port, secure: false, auth: { user: config.user, pass: config.pass } }); }

export async function sendApplicationEmails(application: Application) {
  const config = smtpConfiguration();
  if (!config) return false;
  const mailer = transport(config);
  await mailer.sendMail({ from: config.from, to: application.email, subject: `Application received — ${application.jobTitle}`, text: `Hi ${application.fullName},\n\nThank you for applying for ${application.jobTitle} at KenoraTech. Our team will review your application and contact you if there is a match.\n\nKenoraTech` });
  if (process.env.CAREERS_ADMIN_EMAIL) await mailer.sendMail({ from: config.from, to: process.env.CAREERS_ADMIN_EMAIL, subject: `New application — ${application.jobTitle}`, text: `${application.fullName} (${application.email}) applied for ${application.jobTitle}.\n\nReview it in the Careers admin panel.` });
  return true;
}

export async function sendMaintenanceSubscriptionEmail(email: string) {
  const config = smtpConfiguration();
  if (!config) return false;
  await transport(config).sendMail({ from: config.from, to: email, subject: "You're on the KenoraTech maintenance update list", text: "Thanks for subscribing. We'll email you when KenoraTech is back online." });
  return true;
}

export async function sendDemoApprovalEmail({ to, name, projectTitle, accessUrl, durationLabel }: { to: string; name?: string; projectTitle: string; accessUrl: string; durationLabel: string }): Promise<DemoApprovalEmailResult> {
  const config = smtpConfiguration();
  if (!config) return "not_configured";
  const greeting = name ? `Hello ${name},` : "Hello,";
  try {
    await transport(config).sendMail({ from: config.from, to, replyTo: to, subject: "Your KenoraTech Demo Access", text: `${greeting}\n\nYour KenoraTech demo access request has been approved.\n\nYou can access your demo using the link below:\n\n${accessUrl}\n\nThis access link is valid for ${durationLabel} after you first open the demo. Please do not share this link.\n\nRegards,\nKenoraTech\nBuild • Innovate • Elevate\nhello@kenoratech.com` });
    return "sent";
  } catch (error) {
    console.error("Demo approval email could not be sent.", { errorName: error instanceof Error ? error.name : "UnknownError" });
    return "failed";
  }
}
