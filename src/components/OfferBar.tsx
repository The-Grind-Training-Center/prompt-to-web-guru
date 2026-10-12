import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/styles/landing-pages.css";

export const scrollToOffer = (targetId: string) => {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
};

type Props = { label: string; shortLabel: string; ctaText: string; targetId: string; sticky?: boolean };

export default function OfferBar({ label, shortLabel, ctaText, targetId, sticky = true }: Props) {
  return (
    <div className={`ad-landing offer-bar ${sticky ? "sticky top-0" : "relative"} z-50 w-full`}>
      <div className="mx-auto flex h-11 max-w-6xl items-center gap-2 px-3 sm:justify-center sm:gap-4">
        <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0" />
        <p className="min-w-0 flex-1 truncate font-heading text-xs font-bold uppercase sm:flex-none sm:text-base">
          <span className="sm:hidden">{shortLabel}</span><span className="hidden sm:inline">{label}</span>
        </p>
        <Button variant="ghost" className="offer-pill h-8 shrink-0 rounded-full px-3 text-xs font-bold" onClick={() => scrollToOffer(targetId)}>
          {ctaText}<ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}