import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import GoogleReviews from "@/components/GoogleReviews";
import LeadForm from "@/components/LeadForm";
import heroImage from "@/assets/facilities/batting-cages.jpg";
import battingCages from "@/assets/facilities/batting-cages.jpg";
import cageTee from "@/assets/facilities/batting-cage-tee.jpg";
import turfTraining from "@/assets/facilities/turf-training.jpg";

const REVIEWS = [
  { name: "Ms. B", quote: "Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!" },
  { name: "Chris H.", quote: "I really enjoy the coaches and their interaction with the parents and the players." },
];
const PHOTOS = [
  { src: battingCages, alt: "Batting cages at The Grind" },
  { src: cageTee, alt: "A batting cage with a tee" },
  { src: turfTraining, alt: "Turf training lane at The Grind" },
];

export default function CageMembership() {
  const formRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const bookingText = "Claim $59 a month";

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
      <div ref={offerRef}><OfferBar label="Cage membership $59 a month (was $84) · save $25 every month" shortLabel="$59/mo cages (was $84)" ctaText="Claim it" targetId="book" sticky={false} /></div>
      <section className="ad-hero">
        <img src={heroImage} alt="Batting cages at The Grind" width={768} height={1024} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo !object-center" />
        <div className="ad-hero-shade" />
        <div className="ad-hero-content !items-center !pt-0 pb-[64px] md:pb-[48px]">
          <h1 className="party-headline !transform-none font-heading font-bold uppercase"><span className="party-headline-lead !text-[min(9.6vw,62px)]">Hit all winter with a</span><span className="party-headline-free !text-[min(11vw,106px)] !px-2 md:!px-3.5 md:!text-[70px]">cage membership</span><span className="party-headline-close !text-[min(6.5vw,48px)]">$59 a month, was <s>$84</s></span></h1>
        </div>
        <GoogleReviews reviews={REVIEWS} />
      </section>
      <div className="party-card-stack">
        <section ref={formRef} id="book" className="party-content-card ad-reveal scroll-mt-16">
          <p className="party-section-label">Claim your spot</p>
          <h2 className="ad-heading text-center font-heading">Claim $59 a month</h2>
          <LeadForm offer="Cage Membership" extraFields={[{ name: "athlete_age", label: "Hitter's age", type: "number" }, { name: "sport", label: "Sport", type: "select", options: ["Baseball", "Softball"] }]} submitText="Claim $59 a month" finePrint="No payment today. We call you to set up your membership." successHeading="You're in." successText="We'll call you within one business day to set up your membership at $59 a month. Questions? Call 405-495-7800." />
          <p className="mt-5 text-center text-sm"><a href="https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=06767c85-c892-4f4c-aa58-a7970d0673a6" target="_blank" rel="noopener noreferrer" className="text-foreground/70 underline underline-offset-4 hover:text-foreground">Rather sign up online? Join in eSoft</a></p>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">What you get</p>
          <h2 className="ad-heading text-center font-heading">Your $59 membership</h2>
          <ul className="party-bullets space-y-3 text-base">{["Batting cage access all winter", "8 cage credits every month", "For baseball and softball hitters", "$59 a month, was $84: you save $25 every month", "Bring a friend for $15 a session"].map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">Inside The Grind</p>
          <h2 className="ad-heading text-center font-heading">The cages</h2>
          <div className="ad-photo-strip party-photo-strip">{PHOTOS.map((photo) => <div key={photo.src} className="ad-polaroid"><img src={photo.src} alt={photo.alt} width={720} height={900} loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>)}</div>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">How it works</p>
          <h2 className="ad-heading text-center font-heading">3 easy steps</h2>
          <div className="space-y-5">{[{ heading: "Claim your spot.", detail: "Takes 30 seconds." }, { heading: "We call to set it up.", detail: "Within one business day." }, { heading: "Start hitting.", detail: "Cages all winter, no matter the weather." }].map((step, i) => <div key={step.heading} className="flex items-start gap-3"><span className="party-step-number font-heading font-bold">{i + 1}</span><div className="min-w-0 text-left"><h3 className="text-lg uppercase">{step.heading}</h3><p className="mt-1 text-sm text-foreground/50">{step.detail}</p></div></div>)}</div>
        </section>
        <p className="mx-auto max-w-[560px] pb-6 text-center text-xs text-foreground/40">The Grind Training Center · 8001 NW 50th St, Oklahoma City · 405-495-7800 · <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
      </div>
      {showCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 h-[88px]" data-mobile-cta><div className="mx-auto max-w-[420px]"><Button type="button" size="xl" className="ad-button party-book-button h-11 w-full" onClick={() => scrollToOffer("book")}>{bookingText}<ArrowUp aria-hidden="true" /></Button><p className="mt-1.5 text-center text-xs text-foreground/60">No payment today. We call you to set it up.</p></div></div>}
    </div>
  );
}
