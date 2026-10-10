import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, X } from "lucide-react";
import { navItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#040814] text-white">
      <div className="container grid gap-10 py-5 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.9fr_0.8fr_1.18fr_1.1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/kenora-tech-logo.png"
              alt="Kenora Tech"
              width={46}
              height={46}
              className="h-11 w-11 rounded-md object-contain"
            />
            <span className="text-xl font-extrabold">
              Kenora<span className="text-[#7d3cff]">Tech</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            We build intelligent digital experiences that help businesses go online, scale and succeed in the digital world.
          </p>
          <div className="mt-5 flex gap-3">
            {/* {[Linkedin, Github, Instagram, X].map((Icon, index) => (
              <span
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1225] text-white/78"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))} */}
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-white">Company</h3>
          <div className="mt-4 grid gap-2">
            {navItems.filter((item) => item.label !== "Home").map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/70 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-white">Services</h3>
          <div className="mt-4 grid gap-2">
            {["Web Development", "Mobile Development", "UI/UX Design"].map((item) => (
              <span key={item} className="text-sm text-white/70">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-white">Quick Links</h3>
          <div className="mt-4 grid gap-2">
            {navItems.slice(3).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/70 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-white">Contact Us</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/72">
            <span className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-white" />
              hello@kenoratech.com
            </span>
            <span className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-white" />
              +91 73835 30982
            </span>
            <span className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-white" />
              Valsad, Gujarat, India
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium text-white">Newsletter</h3>
          <p className="mt-4 text-sm leading-6 text-white/78">Stay updated with our latest projects and insights.</p>
          <form className="mt-4 flex overflow-hidden rounded-md border border-white/16 bg-[#070c19]">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/55"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-10 w-11 items-center justify-center bg-gradient-to-r from-[#8c1cff] to-[#19a8ff]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/8 py-4">
        <div className="container text-center text-sm text-white/45">
          <p>{"\u00a9"} 2025 KenoraTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
