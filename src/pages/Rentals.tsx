import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import GoogleReviews from "@/components/GoogleReviews";
import LeadForm from "@/components/LeadForm";
import heroImage from "@/assets/facilities/moody-complex.png";
import indoorField from "@/assets/facilities/indoor-field.jpg";
import turfTraining from "@/assets/facilities/turf-training.jpg";
import battingCages from "@/assets/facilities/batting-cages.jpg";

export const isRentalOfferOn = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${getPart("year")}-${getPart("month")}-${getPart("day")}` <= "2026-10-31";
};
const REVIEWS = [
  { name: "Ms. B", quote: "Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!" },
  { name: "Chris H.", quote: "I really enjoy the coaches and their interaction with the parents and the players." },
];
const PHOTOS = [
  { src: indoorField, alt: "The indoor field at The Grind" },
  { src: turfTraining, alt: "Turf training lane at The Grind" },
  { src: battingCages, alt: "Batting cages at The Grind" },
];

export default function Rentals() {
  const formRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const [offerOn, setOfferOn] = useState(() => isRentalOfferOn());
  const bookingText = offerOn ? "Get $25 off" : "Book the field";

  useEffect(() => {
    const timer = window.setInterval(() => setOfferOn(isRentalOfferOn()), 60_000);
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
      <div ref={offerRef}><OfferBar label={offerOn ? "Get $25 off: indoor field rentals are $125 an hour (was $150) when you book before Oct. 31" : "Indoor field rentals · $125 an hour"} shortLabel={offerOn ? "$125/hr field · book by 10/31" : "Field rentals · $125/hr"} ctaText={offerOn ? "Book now" : "Book"} targetId="book" sticky={false} /></div>
      <section className="ad-hero">
        <img src={heroImage} alt="The Grind's 10,000 sq ft indoor turf field with lights and batting cages" width={768} height={1024} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo !object-center" />
        <div className="ad-hero-shade" />
        <div className="ad-hero-content !items-center !pt-0 pb-[64px] md:pb-[48px]">
          <h1 className="party-headline !transform-none font-heading font-bold uppercase"><span className="party-headline-lead !text-[min(9.6vw,62px)]">Rent this</span><span className="party-headline-free !text-[min(11vw,106px)] !px-2 md:!px-3.5 md:!text-[70px]">10,000 sq ft field</span><span className="party-headline-close !text-[min(7.6vw,48px)]">{offerOn ? <>$125 an hour, was <s>$150</s></> : "$125 an hour"}</span></h1>
        </div>
        <GoogleReviews reviews={REVIEWS} />
      </section>
      <div className="party-card-stack">
        <section ref={formRef} id="book" className="party-content-card ad-reveal scroll-mt-16">
          <p className="party-section-label">Book your team's time</p>
          <h2 className="ad-heading text-center font-heading">{offerOn ? "Get $25 off an hour" : "Book the field"}</h2>
          <LeadForm offer="Field Rental" extraFields={[{ name: "team_name", label: "Team or group name", type: "text" }, { name: "sport", label: "Sport", type: "select", options: ["Baseball", "Softball", "Soccer", "Football", "Other"] }, { name: "times", label: "Days and times you want", type: "text" }]} submitText={bookingText} finePrint="No payment today. We call you to set your times." successHeading="We got it." successText="We'll call you within one business day to lock in your times. Questions? Call 405-495-7800." />
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">The field</p>
          <h2 className="ad-heading text-center font-heading">Your team's winter home</h2>
          <ul className="party-bullets space-y-3 text-base">{["10,000 sq ft of indoor turf", "Baseball, softball, soccer, football and more", offerOn ? "$125 an hour (was $150)" : "$125 an hour", "100% indoors, so weather never cancels practice"].map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">Inside The Grind</p>
          <h2 className="ad-heading text-center font-heading">Practice all winter</h2>
          <div className="ad-photo-strip party-photo-strip">{PHOTOS.map((photo) => <div key={photo.src} className="ad-polaroid"><img src={photo.src} alt={photo.alt} width={720} height={900} loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>)}</div>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">How it works</p>
          <h2 className="ad-heading text-center font-heading">3 easy steps</h2>
          <div className="space-y-5">{[{ heading: "Tell us what you need.", detail: "Takes 30 seconds." }, { heading: "We call to set your times.", detail: "Within one business day." }, { heading: "Bring your team.", detail: "Practice all winter, no matter the weather." }].map((step, i) => <div key={step.heading} className="flex items-start gap-3"><span className="party-step-number font-heading font-bold">{i + 1}</span><div className="min-w-0 text-left"><h3 className="text-lg uppercase">{step.heading}</h3><p className="mt-1 text-sm text-foreground/50">{step.detail}</p></div></div>)}</div>
        </section>
        <p className="mx-auto max-w-[560px] pb-6 text-center text-xs text-foreground/40">The Grind Training Center · 8001 NW 50th St, Oklahoma City · 405-495-7800 · <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
      </div>
      {showCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 h-[88px]" data-mobile-cta><div className="mx-auto max-w-[420px]"><Button type="button" size="xl" className="ad-button party-book-button h-11 w-full" onClick={() => scrollToOffer("book")}>{bookingText}<ArrowUp aria-hidden="true" /></Button><p className="mt-1.5 text-center text-xs text-foreground/60">No payment today. We call you to set your times.</p></div></div>}
    </div>
  );
}
