import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, CalendarDays, Maximize, Star, Umbrella } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import LeadForm from "@/components/LeadForm";
import logoAsset from "@/assets/backstop-logo.webp.asset.json";
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
const REVIEWS = ["Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!"];
const GAMES = ["Dodgeball", "Soccer", "Wiffleball", "Football", "Kickball", "Home Run Derby"];
const INCLUDED = ["2 hours on our indoor turf", "Up to 15 kids", "All the games below"];
const PHOTOS = [kidsGroup, kidsHelmets, turf, fieldGame];

export default function BirthdayParties() {
  const offerOn = freeFoodOfferOn();
  const FAQ = [
    ["What's included?", offerOn
      ? "2 hours on our indoor turf and all the games, for up to 15 kids. $295 total. Book before October 31 and the pizza and soda are free."
      : "2 hours on our indoor turf and all the games, for up to 15 kids. $295 total."],
    ["What days can we book?", "Friday, Saturday and Sunday."],
    ["What if it rains?", "Nothing changes. Everything is indoors."],
    ["Do I pay today?", "No. Send your date and we call you to confirm everything first."],
    ["What if we need to cancel?", "Let us know at least 48 hours ahead. That's our policy for every booking."],
  ];
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>(".ad-reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-reveal", "visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: .08 });
    if (!reduced) sections.forEach((section) => { section.dataset.reveal = "pending"; revealObserver.observe(section); });
    let heroPast = false;
    let bookVisible = false;
    let footerVisible = false;
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroRef.current) heroPast = !entry.isIntersecting && entry.boundingClientRect.bottom <= 44;
        if (entry.target === bookRef.current) bookVisible = entry.isIntersecting;
        if (entry.target === footerRef.current) footerVisible = entry.isIntersecting;
      });
      setShowMobileCta(heroPast && !bookVisible && !footerVisible);
    }, { rootMargin: "-44px 0px 100px 0px", threshold: 0 });
    [heroRef.current, bookRef.current, footerRef.current].forEach((el) => { if (el) ctaObserver.observe(el); });
    return () => { revealObserver.disconnect(); ctaObserver.disconnect(); };
  }, []);

  const dateButton = (className = "") => <Button type="button" size="xl" className={`ad-button ${className}`} onClick={() => scrollToOffer("book")}>Check My Date<ArrowDown aria-hidden="true" /></Button>;

  return (
    <div ref={rootRef} className="ad-landing overflow-x-clip pb-24 md:pb-0">
      <OfferBar
        label={offerOn ? "Free pizza and soda with your party when you book before October 31" : "$295 birthday party · 2 hours · up to 15 kids"}
        shortLabel={offerOn ? "Book before 10/31: free food" : "$295 birthday party"}
        ctaText="Check my date"
        targetId="book"
      />
      <section ref={heroRef} className="ad-hero">
        <picture>
          <source media="(min-width: 768px)" srcSet={assetUrl(heroDesktop.url)} />
          <img src={assetUrl(heroMobile.url)} alt="Kids at The Grind Training Center" width={860} height={1075} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo" />
        </picture>
        <div className="ad-hero-shade" />
        <img src={assetUrl(logoAsset.url)} alt="The Grind Training Center" width={280} height={207} loading="lazy" className="absolute left-5 top-6 w-[72px] md:left-10 md:top-8" />
        <div className="ad-hero-content px-5 pb-9 md:px-10 md:pb-14">
          <div className="mx-auto max-w-[1040px]">
            <h1 className="party-headline mb-5 font-heading font-bold uppercase leading-[1.05]"><span className="block">You show up.</span><span className="block text-primary">We handle the rest.</span></h1>
            {dateButton("w-full md:w-auto md:min-w-64")}
            <p className="mt-3 text-center text-xs text-foreground/60 md:text-left">No payment today. We call you to confirm your date.</p>
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-8">
        <div className="ad-inner grid gap-7 md:grid-cols-2 md:items-center">
          <div>{REVIEWS.map((quote) => <div key={quote} className="border-l-2 border-primary pl-4"><div className="mb-2 flex gap-1 text-primary" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="text-sm leading-relaxed">{quote}</p><p className="mt-2 text-xs text-foreground/50">Google review</p></div>)}</div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:justify-end">{[{ icon: Umbrella, text: "100% indoors" }, { icon: Maximize, text: "10,000 sq ft of turf" }, { icon: CalendarDays, text: "Friday to Sunday" }].map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-2 text-xs font-semibold"><Icon className="h-5 w-5 text-primary" />{text}</div>)}</div>
        </div>
      </section>

      <section className="ad-section"><div className="ad-inner ad-reveal">
        <h2 className="ad-heading text-center">$295 for the party</h2>
        <ul className="mx-auto max-w-md list-disc space-y-2 pl-5 text-base">
          {INCLUDED.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {offerOn && <p className="mt-5 text-center font-semibold text-primary">Book before October 31 and the pizza and soda are free.</p>}
      </div></section>

      <section className="ad-section bg-card"><div className="ad-inner ad-reveal">
        <h2 className="ad-heading text-center">Pick their games</h2>
        <ul className="mx-auto grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-base">
          {GAMES.map((game) => <li key={game}>{game}</li>)}
        </ul>
        <p className="mt-5 text-center text-sm text-foreground/50">And more. Ask us when we call.</p>
      </div></section>

      <section className="ad-section"><div className="ad-inner ad-reveal">
        <h2 className="ad-heading text-center">Inside The Grind</h2>
        <div className="ad-photo-strip">{PHOTOS.map((photo) => <div key={photo.asset_id} className="ad-polaroid"><img src={assetUrl(photo.url)} alt="Kids at The Grind Training Center" width={720} height={900} loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>)}</div>
      </div></section>

      <section className="ad-section bg-card"><div className="ad-inner ad-reveal">
        <h2 className="ad-heading text-center">How it works</h2>
        <div className="grid gap-5 text-center md:grid-cols-3">{[{ heading: "Pick your date below.", detail: "Takes 30 seconds." }, { heading: "We call you to confirm.", detail: "Within one business day." }, { heading: "Show up with the birthday kid.", detail: "We handle the rest." }].map((step, i) => <div key={step.heading}><p className="mb-3 font-heading text-6xl font-bold text-primary">{i + 1}</p><h3 className="text-xl uppercase">{step.heading}</h3><p className="mt-2 text-sm text-foreground/50">{step.detail}</p>{i < 2 && <ArrowDown aria-hidden="true" className="mx-auto mt-6 h-6 w-6 text-primary md:hidden" />}</div>)}</div>
      </div></section>

      <section className="ad-section"><div ref={bookRef} id="book" className="ad-reveal mx-auto max-w-xl scroll-mt-16 rounded-lg border border-foreground/15 bg-secondary p-6 sm:p-8">
        <h2 className="mb-2 text-center font-heading text-3xl uppercase">Check your date</h2><p className="mb-7 text-center text-sm text-foreground/60">Fridays, Saturdays and Sundays</p>
        <LeadForm offer="Birthday Party" extraFields={[{ name: "preferred_date", label: "Preferred date", type: "date" }]} submitText="Check My Date" finePrint="No payment today. We call you to confirm." successHeading="We got your request." successText="We'll call you within one business day to confirm your date. Questions? Call 405-495-7800." />
      </div></section>

      <section className="ad-section"><div className="ad-inner ad-reveal max-w-2xl">
        <Accordion type="single" collapsible>{FAQ.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`} className="border-foreground/15"><AccordionTrigger className="gap-3 text-left text-base">{question}</AccordionTrigger><AccordionContent className="leading-relaxed text-foreground/65">{answer}</AccordionContent></AccordionItem>)}</Accordion>
        <div className="mt-9 text-center">{dateButton("w-full md:w-auto md:min-w-72")}</div>
      </div></section>
      <footer ref={footerRef} className="ad-footer bg-card text-center text-sm text-foreground/40"><p>The Grind Training Center · 8001 NW 50th St, Oklahoma City, OK 73132</p><a href="tel:4054957800" className="mt-2 block hover:text-foreground">405-495-7800</a><Link to="/privacy" className="mt-3 inline-block text-xs hover:underline">Privacy Policy</Link></footer>
      {showMobileCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 md:hidden" data-mobile-cta>{dateButton("w-full")}</div>}
    </div>
  );
}
