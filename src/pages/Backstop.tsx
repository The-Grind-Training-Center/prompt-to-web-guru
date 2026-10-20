import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferBar, { scrollToOffer } from "@/components/OfferBar";
import GoogleReviews from "@/components/GoogleReviews";
import { trackLead } from "@/lib/metaPixel";
import { getGoogleClickIds, trackGoogleLead } from "@/lib/googleAds";
import { getAttribution } from "@/lib/attribution";
import { supabase } from "@/integrations/supabase/client";
import codyFaceAsset from "@/assets/cody-face.png.asset.json";
import heroMobile from "@/assets/backstop/backstop-hero-mobile.webp.asset.json";
import heroDesktop from "@/assets/backstop/backstop-hero-desktop.webp.asset.json";

const assetUrl = (url: string) => new URL(url, "https://thegrindtrainingcenter.com").href;
const inputClass = "backstop-input";
const REVIEWS = [
  { name: "Ms. B", quote: "Great facility!! Great staff! They really care about your needs and provide a great experience for all sports!!" },
  { name: "Chris H.", quote: "I really enjoy the coaches and their interaction with the parents and the players." },
];

export default function Backstop() {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [athleteAge, setAthleteAge] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const age = parseInt(athleteAge, 10);
    if (!parentName.trim() || !phone.trim() || !email.trim() || !athleteAge.trim()) {
      setError("Please fill out every field.");
      return;
    }
    if (Number.isNaN(age) || age < 4 || age > 22) {
      setError("Please enter a valid athlete age.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const eventId = crypto.randomUUID();
    setSubmitting(true);
    const attribution = getAttribution();
    const { error: insertError } = await supabase.from("backstop_leads").insert({
      parent_name: parentName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      athlete_age: age,
      ...getGoogleClickIds(),
      ...attribution,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    // Fire-and-forget Telegram notification; never block or surface errors to the visitor.
    try {
      const readCookie = (name: string) => {
        const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return m ? decodeURIComponent(m[1]) : undefined;
      };
      await supabase.functions.invoke("notify-lead", {
        body: {
          parent_name: parentName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          athlete_age: age,
          ...attribution,
          event_id: eventId,
          page_url: window.location.href,
          fbp: readCookie("_fbp"),
          fbc:
            readCookie("_fbc") ??
            (attribution.fbclid ? `fb.1.${Date.now()}.${attribution.fbclid}` : undefined),
        },
      });
    } catch {
      // ignored
    }

    trackLead(eventId);
    trackGoogleLead(eventId);
    setSubmitted(true);
  };

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
      <div ref={offerRef}><OfferBar label="Save $25 on your first month · join any Tuesday" shortLabel="Save $25 your first month" ctaText="Claim $25 off" targetId="book" sticky={false} /></div>
      <section className="ad-hero">
        <picture>
          <source media="(min-width: 768px)" srcSet={assetUrl(heroDesktop.url)} />
          <img src={assetUrl(heroMobile.url)} alt="Cody Milligan at bat" width={768} height={1154} loading="eager" {...{ fetchpriority: "high" }} className="ad-hero-photo" />
        </picture>
        <div className="ad-hero-shade" />
        <div className="ad-hero-content">
          <h1 className="party-headline font-heading font-bold uppercase"><span className="party-headline-lead">Learn to catch from a</span><span className="party-headline-free">Braves draft pick</span><span className="party-headline-close">every Tuesday at The Grind</span></h1>
        </div>
        <GoogleReviews reviews={REVIEWS} />
      </section>
      <div className="party-card-stack">
        <section ref={formRef} id="book" className="party-content-card ad-reveal scroll-mt-16">
          <p className="party-section-label">Save your spot</p>
          <h2 className="ad-heading text-center font-heading">Claim $25 off</h2>
          {submitted ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <h2 className="font-heading font-bold uppercase text-3xl sm:text-4xl">
                You're on the list.
              </h2>
              <p className="text-white/70">
                Coach Cody's team will call you within one business day to place your athlete and
                take $25 off your first month. Questions? Call 405-495-7800.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <label htmlFor="parent-name" className="block text-sm text-white/70 mb-1.5">
                  Your name
                </label>
                <input
                  id="parent-name"
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-white/70 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-white/70 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="athlete-age" className="block text-sm text-white/70 mb-1.5">
                  Athlete's age
                </label>
                <input
                  id="athlete-age"
                  type="number"
                  required
                  min={4}
                  max={22}
                  inputMode="numeric"
                  value={athleteAge}
                  onChange={(e) => setAthleteAge(e.target.value)}
                  className={inputClass}
                />
              </div>
              {error && <p className="text-primary text-sm">{error}</p>}
              <Button type="submit" disabled={submitting} size="xl" className="ad-button party-book-button w-full">{submitting ? "Saving..." : "Claim $25 Off"}</Button>
              <p className="flex items-center justify-center gap-2 text-center text-sm text-foreground/50"><LockKeyhole aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />No payment today. We call you to place your athlete and take $25 off month one.</p>
            </form>
          )}
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">The coach</p>
          <h2 className="ad-heading text-center font-heading">Cody Milligan</h2>
          <img src={assetUrl(codyFaceAsset.url)} loading="lazy" width={80} height={80} alt="Coach Cody Milligan" className="mx-auto h-20 w-20 rounded-full object-cover border-2 border-primary" />
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">{[{ num: "9th", label: "round draft pick" }, { num: "6", label: "years pro ball" }, { num: "90", label: "days, catching only" }].map((stat) => <div key={stat.label}><p className="font-heading font-bold text-3xl text-primary">{stat.num}</p><p className="mt-1 text-xs text-foreground/50">{stat.label}</p></div>)}</div>
          <p className="mt-5 text-center text-foreground/70">A ninth round Atlanta Braves draft pick who spent six years in their organization. Now he coaches catchers every Tuesday at The Grind.</p>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">What they learn</p>
          <h2 className="ad-heading text-center font-heading">Catching, start to finish</h2>
          <ul className="party-bullets space-y-2 text-base">{["Stance and receiving", "Blocking", "Throwing and footwork", "Pop times", "Baseball IQ", "Monthly evaluations"].map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">The schedule</p>
          <h2 className="ad-heading text-center font-heading">Every Tuesday</h2>
          <ul className="party-bullets space-y-3 text-base">{["JV, 6 to 7 PM · $149 a month ($124 your first month)", "Varsity, 7 to 8 PM · $189 a month ($164 your first month)", "3-month commitment · join any Tuesday", "Baseball and softball catchers · placed by evaluation, not age"].map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="party-content-card ad-reveal">
          <p className="party-section-label">How it works</p>
          <h2 className="ad-heading text-center font-heading">3 easy steps</h2>
          <div className="space-y-5">{[{ heading: "Save your spot.", detail: "Takes 30 seconds." }, { heading: "We call to place your athlete.", detail: "Within one business day." }, { heading: "Show up Tuesday.", detail: "Bring your gear. We handle the rest." }].map((step, i) => <div key={step.heading} className="flex items-start gap-3"><span className="party-step-number font-heading font-bold">{i + 1}</span><div className="min-w-0 text-left"><h3 className="text-lg uppercase">{step.heading}</h3><p className="mt-1 text-sm text-foreground/50">{step.detail}</p></div></div>)}</div>
        </section>
        <p className="mx-auto max-w-[560px] pb-6 text-center text-xs text-foreground/40">The Grind Training Center · 8001 NW 50th St, Oklahoma City · 405-495-7800 · <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
      </div>
      {showCta && <div className="ad-mobile-cta fixed inset-x-0 bottom-0 z-40 h-[88px]" data-mobile-cta><div className="mx-auto max-w-[420px]"><Button type="button" size="xl" className="ad-button party-book-button h-11 w-full" onClick={() => scrollToOffer("book")}>Claim $25 Off<ArrowUp aria-hidden="true" /></Button><p className="mt-1.5 text-center text-xs text-foreground/60">No payment today. We call you to confirm.</p></div></div>}
    </div>
  );
}
