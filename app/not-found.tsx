import type { Metadata } from "next";
import { NotFoundExperience } from "@/components/not-found-experience";

export const metadata: Metadata = {
  title: "404",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return <NotFoundExperience />;
}