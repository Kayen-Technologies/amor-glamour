import type { Metadata } from "next";
import Landing from "./Landing";

export const metadata: Metadata = {
  title: "Amor Glamour | Beauty, Redefined",
  description: "Discover hair styling, nail art, wig styling, and beauty treatments at Amor Glamour.",
};

export default function Page() {
  return <Landing />;
}
