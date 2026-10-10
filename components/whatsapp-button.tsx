import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/+917383530982?text=Hi%20Kenora%20Tech%2C%20I%20would%20like%20a%20free%20consultation."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kenora Tech on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1fb66b] text-white shadow-soft-lg transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
