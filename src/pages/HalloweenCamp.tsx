import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Candy, Ghost, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import LeadForm from "@/components/LeadForm";
import logoAsset from "@/assets/backstop-logo.webp.asset.json";
import hittrax from "@/assets/facilities/hittrax-1.jpg";
import chris from "@/assets/coaches/chris-wimmer.jpg";

export const isHalloweenCampOver = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${getPart("year")}-${getPart("month")}-${getPart("day")}` > "2026-10-29";
};

const FEATURES = [
  { icon: Target, title: "Spooky BP on HitTrax", detail: "Every swing shows exit velocity and distance." },
  { icon: Ghost, title: "Costumes welcome", detail: "Optional, but encouraged." },
  { icon: Candy, title: "Candy", detail: "For every hitter." },
];

export default function HalloweenCamp() {
  const [campOver, setCampOver] = useState(() => isHalloweenCampOver());
  useEffect(() => {
    const timer = window.setInterval(() => setCampOver(isHalloweenCampOver()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ad-landing overflow-x-clip">
      {!campOver && <OfferBar label="Oct 29 only · Halloween HitTrax camp · 6 to 7 PM · candy + costumes" shortLabel="Oct 29 · Halloween HitTrax camp" ctaText="Save my spot" targetId="book" />}
      <section className="ad-hero">
        <img src={hittrax} alt="HitTrax at The Grind Training Center" width={1024} height={768} loading="eager" {...{ fetchpriority: "high" }} style={{ objectPosition: "64% center" }} className="ad-hero-photo" />
        <div className="ad-hero-shade" />
        <img src={new URL(logoAsset.url, "https://thegrindtrainingcenter.com").href} alt="The Grind Training Center" width={280} height={207} loading="lazy" className="absolute left-5 top-6 w-[72px] md:left-10 md:top-8" />
        <div className="ad-hero-content px-5 pb-9 md:px-10 md:pb-14"><div className="ad-inner">
          <div className="mb-6 flex items-center gap-4"><div className="w-20 overflow-hidden rounded-md bg-foreground text-center text-background"><p className="bg-primary py-1 font-heading text-sm font-bold text-primary-foreground">OCT</p><p className="font-heading text-5xl font-bold leading-tight">29</p><p className="pb-2 text-[10px] font-bold">THURSDAY</p></div><p className="font-heading text-xl font-bold uppercase">6 to 7 PM</p></div>
          <h1 className="mb-5 font-heading text-[44px] font-bold uppercase leading-[1.05] md:text-[64px]"><span className="block">Hit a home run</span><span className="block text-primary">this Halloween.</span></h1>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">Spooky BP on HitTrax with Chris Wimmer, 1992 U.S. Olympian and 7 years in pro ball. Costumes welcome. Candy for every hitter.</p>
          {!campOver && <><Button size="xl" className="ad-button w-full md:w-auto md:min-w-64" onClick={() => scrollToOffer("book")}>Save My Spot<ArrowDown aria-hidden="true" /></Button><p className="mt-3 text-center text-xs text-foreground/60 md:text-left">No payment today. We call you to finish signing up.</p></>}
        </div></div>
      </section>
      <section className="ad-section bg-card"><div className="ad-inner grid gap-4 md:grid-cols-3">{FEATURES.map(({ icon: Icon, title, detail }) => <div key={title} className="rounded-lg border border-foreground/10 bg-secondary p-6 text-center"><Icon className="mx-auto mb-4 h-8 w-8 text-primary" /><h2 className="mb-3 font-heading text-xl uppercase">{title}</h2><p className="text-sm leading-relaxed text-foreground/60">{detail}</p></div>)}</div></section>
      <section className="ad-section"><div className="ad-inner flex flex-col items-center justify-center gap-5 text-center md:flex-row md:text-left"><img src={chris} alt="Chris Wimmer" width={1024} height={1024} loading="lazy" className="h-28 w-28 rounded-full border-2 border-primary object-cover" /><div><h2 className="font-heading text-3xl uppercase">Chris Wimmer</h2><p className="mt-2 text-sm text-foreground/60">1992 U.S. Olympian · 7 years pro ball</p></div></div></section>
      <section className="ad-section bg-card"><div id="book" className="mx-auto max-w-xl scroll-mt-16 rounded-lg border border-foreground/15 bg-secondary p-6 sm:p-8">
        {campOver ? <p className="text-center leading-relaxed">This camp is over. Call 405-495-7800 to hear what's next.</p> : <><h2 className="mb-7 text-center font-heading text-3xl uppercase">Save your spot</h2><LeadForm offer="Halloween HitTrax Camp" extraFields={[{ name: "athlete_age", label: "Hitter's age", type: "number" }]} submitText="Save My Spot" finePrint="No payment today. We call you to finish signing up." successHeading="You're on the list." successText="We'll call you within one business day to finish signing up. Questions? Call 405-495-7800." /></>}
      </div></section>
      <footer className="ad-footer text-center text-sm text-foreground/40"><p>The Grind Training Center · 8001 NW 50th St, Oklahoma City, OK 73132</p><a href="tel:4054957800" className="mt-2 block hover:text-foreground">405-495-7800</a><Link to="/privacy" className="mt-3 inline-block text-xs hover:underline">Privacy Policy</Link></footer>
    </div>
  );
}