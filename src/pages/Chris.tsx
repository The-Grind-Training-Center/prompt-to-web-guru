import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import GoogleReviews from "@/components/GoogleReviews";
import LeadForm from "@/components/LeadForm";
import { isHalloweenCampOver } from "@/pages/HalloweenCamp";
import chrisFace from "@/assets/coaches/chris-wimmer.jpg";

const isChrisOfferOn = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${getPart("year")}-${getPart("month")}-${getPart("day")}` <= "2026-10-31";
};
const OFFER_LABEL = "Free Rapsodo swing metrics when you book with Chris by Oct 31";
const OFFER_SHORT = "Free Rapsodo metrics · by 10/31";
const STANDARD_OFFER_LABEL = "Train with a 1992 U.S. Olympian · lessons and camps at The Grind";
const STANDARD_OFFER_SHORT = "Train with a 1992 Olympian";
const REVIEWS = [
  { name: "Johnny", quote: "Coach Wimmer was awesome with our son! Great one on one session to go over some last minute techniques before the season begins." },
  { name: "Ms. B", quote: "Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!" },
  { name: "Chris H.", quote: "I really enjoy the coaches and their interaction with the parents and the players." },
];

export default function Chris() {
  const formRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const [campOver, setCampOver] = useState(() => isHalloweenCampOver());
  const [offerOn, setOfferOn] = useState(() => isChrisOfferOn());

  useEffect(() => {
    const timer = window.setInterval(() => { setCampOver(isHalloweenCampOver()); setOfferOn(isChrisOfferOn()); }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>(".ad-reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-reveal", "visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: .08 });
    if (!reduced) sections.forEach((section) => { section.dataset.reveal = "pending"; revealObserver.observe(section); });
    let bookVisible = false;
    let offerVisible = true;
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === formRef.current) bookVisible = entry.isIntersecting;
        if (entry.target === offerRef.current) offerVisible = entry.isIntersecting;
      });
      setShowCta(!offerVisible && !bookVisible);
    }, { rootMargin: "0px 0px 88px 0px", threshold: 0 });
    [formRef.current].forEach((el) => { if (el) ctaObserver.observe(el); });
    const offerObserver = new IntersectionObserver(([entry]) => {
      offerVisible = entry.isIntersecting;
      setShowCta(!offerVisible && !bookVisible);
    }, { threshold: 0 });
    if (offerRef.current) offerObserver.observe(offerRef.current);
    return () => { revealObserver.disconnect(); ctaObserver.disconnect(); offerObserver.disconnect(); };
  }, []);

  return (
    <div ref={rootRef} className="ad-landing ad-family backstop-page overflow-x-clip pb-24">
      <div ref={offerRef}><OfferBar label={offerOn ? OFFER_LABEL : STANDARD_OFFER_LABEL} shortLabel={offerOn ? OFFER_SHORT : STANDARD_OFFER_SHORT} ctaText="Book now" targetId="book" sticky={false} /></div>
      <section className="ad-hero">
        <img src={chrisFace} alt="Coach Chris Wimmer" width={768} height={768} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo !object-top" />
        <div className="ad-hero-shade" />
        <div className="ad-hero-content !items-end !pt-0 pb-[202px] md:pb-[146px]">
          <h1 className="party-headline !transform-none font-heading font-bold uppercase"><span className="party-headline-lead">Train with a</span><span className="party-headline-free">1992 Olympian</span><span className="party-headline-close">at The Grind</span></h1>
        </div>
        <GoogleReviews reviews={REVIEWS} />
      </section>
      <div className="party-card-stack">
        <section ref={formRef} id="book" className="party-content-card ad-reveal scroll-mt-16">
          <p className="party-section-label">Book with Chris</p>
          <h2 className="ad-heading text-center font-heading">Schedule with Chris</h2>
          <LeadForm
            key={String(campOver)}
            offer="Chris Wimmer"
            extraFields={[
              { name: "booking", label: "What are you booking?", type: "select", options: campOver ? ["1-on-1 hitting lessons"] : ["1-on-1 hitting lessons", "Halloween HitTrax Camp (Oct 29)"] },
              { name: "athlete_age", label: "Hitter's age", type: "number" },
            ]}
            submitText="Schedule with Chris"
            finePrint="No payment today. We call you to set your time."
            successHeading="We got it."
            successText="We'll call you within one business day to set your time with Chris. Questions? Call 405-495-7800."
          />
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">The coach</p>
          <h2 className="ad-heading text-center font-heading">Chris Wimmer</h2>
          <img src={chrisFace} loading="lazy" width={80} height={80} alt="Coach Chris Wimmer" className="mx-auto h-20 w-20 rounded-full object-cover border-2 border-primary" />
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">{[{ num: "1992", label: "U.S. Olympian" }, { num: "2x", label: "All-American" }, { num: "7", label: "years pro ball" }].map((stat) => <div key={stat.label}><p className="font-heading font-bold text-3xl text-primary">{stat.num}</p><p className="mt-1 text-xs text-foreground/50">{stat.label}</p></div>)}</div>
          <p className="mt-5 text-center text-foreground/70">A 1992 U.S. Olympian and two-time All-American at Wichita State, where he led the NCAA in hits in 1991. Then 7 years of pro ball. Now he coaches hitters at The Grind.</p>
        </section>
        {!campOver && <section className="party-content-card ad-reveal">
          <p className="party-section-label">His next camp</p>
          <h2 className="ad-heading text-center font-heading">Halloween HitTrax Camp</h2>
          <ul className="party-bullets space-y-3 text-base">{["Thursday, Oct 29 · 6 to 7 PM", "Spooky BP on HitTrax", "Costumes welcome", "Candy for every hitter"].map((item) => <li key={item}>{item}</li>)}</ul>
          <Button type="button" size="xl" className="ad-button party-book-button mt-6 w-full" onClick={() => scrollToOffer("book")}>Save a camp spot</Button>
        </section>}
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">How it works</p>
          <h2 className="ad-heading text-center font-heading">3 easy steps</h2>
          <div className="space-y-5">{[{ heading: "Tell us what you want.", detail: "Takes 30 seconds." }, { heading: "We call to set your time.", detail: "Within one business day." }, { heading: "Show up and hit.", detail: "Bring your bat. Chris handles the rest." }].map((step, i) => <div key={step.heading} className="flex items-start gap-3"><span className="party-step-number font-heading font-bold">{i + 1}</span><div className="min-w-0 text-left"><h3 className="text-lg uppercase">{step.heading}</h3><p className="mt-1 text-sm text-foreground/50">{step.detail}</p></div></div>)}</div>
        </section>
        <p className="mx-auto max-w-[560px] pb-6 text-center text-xs text-foreground/40">The Grind Training Center · 8001 NW 50th St, Oklahoma City · 405-495-7800 · <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
      </div>
      {showCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 h-[88px]" data-mobile-cta><div className="mx-auto max-w-[420px]"><Button type="button" size="xl" className="ad-button party-book-button h-11 w-full" onClick={() => scrollToOffer("book")}>Schedule with Chris<ArrowUp aria-hidden="true" /></Button><p className="mt-1.5 text-center text-xs text-foreground/60">No payment today. We call you to set your time.</p></div></div>}
    </div>
  );
}
