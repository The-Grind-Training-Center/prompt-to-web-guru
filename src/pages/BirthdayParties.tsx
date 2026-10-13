import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import GoogleReviews from "@/components/GoogleReviews";
import LeadForm from "@/components/LeadForm";
import heroMobile from "@/assets/party/party-hero-mobile.webp.asset.json";
import heroDesktop from "@/assets/party/party-hero-desktop.webp.asset.json";
import kidsGroup from "@/assets/party/party-kids-group.webp.asset.json";
import kidsHelmets from "@/assets/party/party-kids-helmets.webp.asset.json";
import turf from "@/assets/party/party-turf.webp.asset.json";
import fieldGame from "@/assets/party/party-field-game.webp.asset.json";

const assetUrl = (url: string) => new URL(url, "https://thegrindtrainingcenter.com").href;
const FREE_FOOD_DEADLINE = "2026-10-31";
const freeFoodOfferOn = () => {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
  return today <= FREE_FOOD_DEADLINE;
};
const REVIEWS = [
  { quote: "Coach Wimmer was awesome with our son! Great one on one session to go over some last minute techniques before the season begins.", name: "Johnny" },
  { quote: "Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!", name: "Ms. B" },
  { quote: "I really enjoy the coaches and their interaction with the parents and the players.", name: "Chris H." },
];
const GAMES = ["Dodgeball", "Soccer", "Wiffleball", "Football", "Kickball", "Home Run Derby"];
const INCLUDED = ["2 hours on our indoor turf", "Up to 15 kids", "All the games below"];
const PHOTOS = [kidsGroup, kidsHelmets, turf, fieldGame];

export default function BirthdayParties() {
  const offerOn = freeFoodOfferOn();
  const rootRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const bookingText = offerOn ? "Claim Free Food" : "Book Now";

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
        if (entry.target === bookRef.current) bookVisible = entry.isIntersecting;
        if (entry.target === offerRef.current) offerVisible = entry.isIntersecting;
      });
      setShowCta(!offerVisible && !bookVisible);
    }, { rootMargin: "0px 0px 88px 0px", threshold: 0 });
    [bookRef.current].forEach((el) => { if (el) ctaObserver.observe(el); });
    const offerObserver = new IntersectionObserver(([entry]) => {
      offerVisible = entry.isIntersecting;
      setShowCta(!offerVisible && !bookVisible);
    }, { threshold: 0 });
    if (offerRef.current) offerObserver.observe(offerRef.current);
    return () => { revealObserver.disconnect(); ctaObserver.disconnect(); offerObserver.disconnect(); };
  }, []);

  const dateButton = (className = "") => <Button type="button" size="xl" className={`ad-button party-book-button ${className}`} onClick={() => scrollToOffer("book")}>{bookingText}<ArrowUp aria-hidden="true" /></Button>;

  return (
    <div ref={rootRef} className="ad-landing ad-family party-page overflow-x-clip pb-24">

      <div ref={offerRef}><OfferBar
        label={offerOn ? "Free pizza and soda with your party when you book before October 31" : "$295 birthday party · 2 hours · up to 15 kids"}
        shortLabel={offerOn ? "Book before 10/31: free food" : "$295 birthday party"}
        ctaText={offerOn ? "Claim free food" : "Book now"}
        targetId="book"
        sticky={false}
      /></div>
      <section className="ad-hero">
        <picture>
          <source media="(min-width: 768px)" srcSet={assetUrl(heroDesktop.url)} />
          <img src={assetUrl(heroMobile.url)} alt="Kids at The Grind Training Center" width={860} height={1075} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo" />
        </picture>
        <div className="ad-hero-shade" />
        <div className="ad-hero-content">
          <h1 className="party-headline font-heading font-bold uppercase">{offerOn ? <><span className="party-headline-lead">Their birthday party,</span><span className="party-headline-free">Free pizza</span><span className="party-headline-close">when you book before 10/31</span></> : <><span>You show up.</span><span className="text-primary">We handle the rest.</span></>}</h1>
        </div>
        <GoogleReviews reviews={REVIEWS} />
      </section>

      <div className="party-card-stack">
      <section ref={bookRef} id="book" className="party-content-card ad-reveal scroll-mt-16">
        <p className="party-section-label">Book it</p>
        <h2 className="ad-heading text-center font-heading">Book your party</h2>
        <LeadForm offer="Birthday Party" extraFields={[{ name: "preferred_date", label: "Preferred date", type: "date" }]} submitText={bookingText} finePrint="No payment today. We call you to confirm." successHeading="We got your request." successText="We'll call you within one business day to confirm your date. Questions? Call 405-495-7800." />
      </section>


      <section className="party-content-card ad-reveal">
        <p className="party-section-label">What you get</p>
        <h2 className="ad-heading text-center">$295 for the party</h2>
        <ul className="party-bullets mx-auto max-w-md space-y-2 text-base">
          {INCLUDED.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {offerOn && <p className="mt-5 text-center font-semibold text-primary">Book before October 31 and the pizza and soda are free.</p>}
      </section>

      <section className="party-content-card ad-reveal">
        <p className="party-section-label">The games</p>
        <h2 className="ad-heading text-center">Pick their games</h2>
        <ul className="party-bullets mx-auto grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-base">
          {GAMES.map((game) => <li key={game}>{game}</li>)}
        </ul>
        <p className="mt-5 text-center text-sm text-foreground/50">And more. Ask us when we call.</p>
      </section>

      <section className="party-content-card ad-reveal">
        <p className="party-section-label">The space</p>
        <h2 className="ad-heading text-center">Inside The Grind</h2>
        <div className="ad-photo-strip party-photo-strip">{PHOTOS.map((photo) => <div key={photo.asset_id} className="ad-polaroid"><img src={assetUrl(photo.url)} alt="Kids at The Grind Training Center" width={720} height={900} loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>)}</div>
      </section>

      <section className="party-content-card ad-reveal">
        <p className="party-section-label">How it works</p>
        <h2 className="ad-heading text-center">3 easy steps</h2>
        <div className="space-y-5">{[{ heading: "Pick your date.", detail: "Takes 30 seconds." }, { heading: "We call you to confirm.", detail: "Within one business day." }, { heading: "Show up with the birthday kid.", detail: "We handle the rest." }].map((step, i) => <div key={step.heading} className="flex items-start gap-3"><span className="party-step-number font-heading font-bold">{i + 1}</span><div className="min-w-0 text-left"><h3 className="text-lg uppercase">{step.heading}</h3><p className="mt-1 text-sm text-foreground/50">{step.detail}</p></div></div>)}</div>
      </section>


      <p className="mx-auto max-w-[560px] pb-6 text-center text-xs text-foreground/40">The Grind Training Center · 8001 NW 50th St, Oklahoma City · 405-495-7800 · <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
      </div>
      {showCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 h-[88px]" data-mobile-cta><div className="mx-auto max-w-[420px]">{dateButton("h-11 w-full")}<p className="mt-1.5 text-center text-xs text-foreground/60">No payment today. We call you to confirm.</p></div></div>}
    </div>
  );
}
