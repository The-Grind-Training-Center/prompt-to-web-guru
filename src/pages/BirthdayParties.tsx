import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
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

  const dateButton = (className = "") => <Button type="button" size="xl" className={`ad-button party-book-button ${className}`} onClick={() => scrollToOffer("book")}>{bookingText}<ArrowDown aria-hidden="true" /></Button>;

  return (
    <div ref={rootRef} className="ad-landing party-page overflow-x-clip pb-24">
      <style>{`
        .party-page { --review-surface: 0 0% 100%; --review-name: 0 0% 12%; --review-label: 210 4% 46%; --review-copy: 206 6% 25%; --review-gold: 45 97% 50%; --review-blue: 217 82% 51%; --review-orange: 31 100% 45%; --review-green: 139 68% 30%; --review-shadow: 0 2px 8px hsl(var(--background) / .18); }
        .party-page .party-reviews { position: absolute; left: 0; right: 0; bottom: 16px; overflow-x: clip; }
        .party-page .party-review-track { display: flex; width: max-content; animation: party-reviews-loop 35s linear infinite !important; }
        .party-page .party-review-group { display: flex; flex-shrink: 0; gap: 10px; padding-right: 10px; }
        .party-page .party-review-item { width: 210px; height: auto; padding: 10px 12px; border-radius: 12px; background: hsl(var(--review-surface)); box-shadow: var(--review-shadow); color: hsl(var(--review-copy)); }
        .party-page .review-avatar { position: relative; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; color: hsl(var(--review-surface)); background: hsl(var(--review-blue)); font-weight: 600; }
        .party-page .review-avatar-M { background: hsl(var(--review-orange)); }
        .party-page .review-avatar-C { background: hsl(var(--review-green)); }
        .party-page .review-google { position: absolute; right: -1px; bottom: -1px; width: 12px; height: 12px; border-radius: 50%; background: hsl(var(--review-surface)); }
        .party-page .review-name { color: hsl(var(--review-name)); font-size: 13px; font-weight: 700; }
        .party-page .review-label { color: hsl(var(--review-label)); font-size: 10px; }
        .party-page .review-stars { color: hsl(var(--review-gold)); }
        .party-page .party-headline { font-size: min(10vw, 72px); line-height: .95; text-align: center; text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6); transform: translateY(-40px); }
        .party-page .party-headline span { display: block; white-space: nowrap; }
        .party-page .party-headline .party-headline-lead { font-size: min(8.7vw, 56px); }
        .party-page .party-headline .party-headline-free { display: inline-block; margin: 6px 0; padding: 2px 14px 4px; background: hsl(var(--primary)); font-size: min(16.4vw, 104px); text-shadow: none; transform: rotate(-2deg); }
        .party-page .party-headline .party-headline-close { font-size: min(6.9vw, 44px); }

        .party-page .ad-hero { height: 76vh; max-height: 800px; }
        .party-page .ad-hero-shade { background: linear-gradient(to top, rgba(8, 9, 12, 0.85) 0%, rgba(8, 9, 12, 0.5) 30%, rgba(8, 9, 12, 0.5) 100%); }
        .party-page .ad-hero-content { inset: 0; display: flex; align-items: center; justify-content: center; }
        .party-page .ad-heading { font-size: 40px; font-weight: 700; line-height: 1.05; }
        .party-page .ad-heading::after { content: ""; display: block; width: 48px; height: 4px; background: hsl(var(--primary)); margin: 16px auto 0; }
        .party-page .party-bullets li { display: flex; align-items: baseline; gap: 10px; }
        .party-page .party-bullets li::before { content: ""; width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: hsl(var(--primary)); }
        .party-page .ad-mobile-cta { background: hsl(var(--card)); }
        .party-page .party-book-button { font-size: 16px; }
        .party-page { --party-card-border: 0 0% 100% / .08; }
        .party-page .party-content-card { max-width: 560px; margin: 0 auto 20px; padding: 28px 20px; border: 1px solid hsl(var(--party-card-border)); border-radius: 16px; background: hsl(var(--secondary)); }
        .party-page .party-card-stack { padding: 24px 16px 0; }
        .party-page .party-section-label { margin-bottom: 10px; color: hsl(var(--primary)); font-size: 12px; text-align: center; text-transform: uppercase; letter-spacing: .14em; }
        .party-page .party-photo-strip { display: flex; overflow-x: auto; }
        .party-page .party-photo-strip .ad-polaroid { flex: 0 0 70%; min-width: 0; }
        .party-page .party-step-number { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
        @keyframes party-reviews-loop { to { transform: translateX(-50%); } }
        @media (max-width: 767px) {
          .party-page .ad-hero { height: calc(100svh - 44px - 120px); min-height: 480px; max-height: none; }
        }
        @media (min-width: 768px) { .party-page .ad-heading { font-size: 56px; } }
      `}</style>
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
        <div className="party-reviews" aria-label="Google reviews">
        <div className="party-review-track">
          {[false, true].map((duplicate) => <div key={String(duplicate)} className="party-review-group" aria-hidden={duplicate || undefined}>
            {REVIEWS.map(({ quote, name }) => <div key={name} className="party-review-item">
              <div className="flex items-center gap-2">
                <div className={`review-avatar review-avatar-${name[0]}`}>{name[0]}<svg className="review-google" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"/></svg></div>
                <div><p className="review-name">{name}</p><p className="review-label">Google review</p></div>
              </div>
              <div className="review-stars mt-2 flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden="true" className="h-3 w-3 fill-current" />)}</div>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[16px]">{quote}</p>
            </div>)}
          </div>)}
          </div>
        </div>
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
