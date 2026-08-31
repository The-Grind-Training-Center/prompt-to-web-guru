import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-transparent.png";
import codyPhoto from "@/assets/coaches/cody-milligan.jpg";
// HERO IMAGE: swap this one import to change the main photo (e.g. Cody at the plate).
import heroImage from "@/assets/hero-training.jpg";

// ESOFT REGISTRATION URL: change this single constant to update the registration link.
const ESOFT_REGISTRATION_URL =
  "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";

// META PIXEL ID: paste your pixel ID here to enable tracking. Leave empty to disable.
const META_PIXEL_ID = "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;
  const w = window as unknown as Record<string, unknown>;
  const fbq = function (...args: unknown[]) {
    (fbq.queue as unknown[]).push(args);
  } as { (...args: unknown[]): void; queue: unknown[]; loaded?: boolean; version?: string };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  w.fbq = fbq;
  w._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq!("init", pixelId);
  window.fbq!("track", "PageView");
}

const inputClass =
  "w-full rounded-md bg-[#111318] border border-white/15 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#E0243A] focus:ring-1 focus:ring-[#E0243A]";

export default function Backstop() {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [athleteAge, setAthleteAge] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (META_PIXEL_ID) {
      loadMetaPixel(META_PIXEL_ID);
    }
  }, []);

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

    setSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    const { error: insertError } = await supabase.from("backstop_leads").insert({
      parent_name: parentName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      athlete_age: age,
      fbclid: params.get("fbclid"),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    if (META_PIXEL_ID && window.fbq) {
      window.fbq("track", "Lead");
    }
    setSubmitted(true);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white overflow-x-hidden">
      <div className="mx-auto w-full max-w-[680px] px-5 py-14 sm:py-20 flex flex-col items-center gap-14 text-center">
        {/* Logo */}
        <img src={logo} alt="The Grind Training Center" className="w-[140px] h-auto" />

        {/* Headline */}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading font-bold uppercase leading-none tracking-tight text-5xl sm:text-6xl">
            <span className="block text-white">Experience the</span>
            <span className="block text-[#E0243A]">Backstop Program</span>
          </h1>
          <p className="text-white/60 text-lg">Level up your catching game with a pro.</p>
        </div>

        {/* Hero image */}
        <div className="w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(224,36,58,0.35)]">
          <img
            src={heroImage}
            alt="Catcher training at The Grind Training Center"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Urgency block */}
        <div className="w-full rounded-xl bg-[#2A0A10] border border-[#E0243A] px-6 py-8">
          <p className="font-heading font-bold uppercase text-4xl sm:text-5xl text-white tracking-wide">
            Limited Spots
          </p>
          <p className="mt-3 text-white/70">
            Capped by cage space. Save $10 if you register by September 10.
          </p>
        </div>

        {/* Lead form / confirmation */}
        <div ref={formRef} className="w-full rounded-2xl bg-[#0D0F13] border border-white/10 p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <h2 className="font-heading font-bold uppercase text-3xl sm:text-4xl">
                You're on the list.
              </h2>
              <p className="text-white/70">Finish registering to lock the spot in.</p>
              <a
                href={ESOFT_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-md bg-[#E0243A] hover:bg-[#C41D31] transition-colors py-4 font-heading font-bold uppercase tracking-wider text-lg"
              >
                Finish Registration
              </a>
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
              {error && <p className="text-[#E0243A] text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-[#E0243A] hover:bg-[#C41D31] disabled:opacity-60 transition-colors py-4 font-heading font-bold uppercase tracking-wider text-lg"
              >
                {submitting ? "Saving..." : "Save a Spot"}
              </button>
              <p className="text-white/40 text-sm text-center">
                Twenty seconds. Cody places every athlete by evaluation.
              </p>
            </form>
          )}
        </div>

        {/* Info grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Starts", value: "Tuesday, Sep 15", note: "Then every Tuesday for 90 days" },
            { label: "Time", value: "6 to 8PM", note: "JV 6 to 7, Varsity 7 to 8" },
            { label: "Where", value: "The Grind", note: "8001 NW 50th St, Oklahoma City" },
            { label: "Who", value: "Baseball + Softball", note: "Placement by evaluation, not age" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-[#0D0F13] border border-white/10 p-5">
              <p className="text-[#E0243A] text-xs font-semibold uppercase tracking-widest">
                {item.label}
              </p>
              <p className="mt-2 font-heading font-bold text-xl uppercase">{item.value}</p>
              <p className="mt-1 text-white/50 text-sm">{item.note}</p>
            </div>
          ))}
        </div>

        {/* Level cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#0D0F13] border border-white/10 p-6">
            <p className="font-heading font-bold uppercase text-2xl">
              <span className="text-[#E0243A]">JV</span> Foundation
            </p>
            <p className="mt-2 text-white/60 text-sm">Developing catchers, typically 8 to 13</p>
            <p className="mt-4 font-heading font-bold text-3xl">$149<span className="text-base text-white/50">/month</span></p>
          </div>
          <div className="rounded-xl bg-[#0D0F13] border border-[#E0243A] p-6">
            <p className="font-heading font-bold uppercase text-2xl">
              <span className="text-[#E0243A]">Varsity</span> Performance
            </p>
            <p className="mt-2 text-white/60 text-sm">Experienced catchers, typically 13+</p>
            <p className="mt-4 font-heading font-bold text-3xl">$189<span className="text-base text-white/50">/month</span></p>
          </div>
        </div>

        {/* Credibility block */}
        <div className="w-full flex flex-col items-center gap-5 pb-10 border-b border-white/10">
          <img
            src={codyPhoto}
            alt="Coach Cody Milligan"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#E0243A]"
          />
          <p className="text-white/70 max-w-md">
            Run by Cody Milligan, a ninth round Atlanta Braves draft pick who spent six years in
            their organization.
          </p>
          <div className="flex items-start justify-center gap-10">
            {[
              { num: "9th", label: "round draft pick" },
              { num: "6", label: "years pro ball" },
              { num: "90", label: "days, catching only" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-heading font-bold text-3xl text-[#E0243A]">{stat.num}</span>
                <span className="text-white/50 text-xs mt-1 max-w-[90px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <button
          onClick={scrollToForm}
          className="w-full rounded-md bg-[#E0243A] hover:bg-[#C41D31] transition-colors py-4 font-heading font-bold uppercase tracking-wider text-lg"
        >
          Save a Spot
        </button>

        {/* Footer (no links) */}
        <div className="text-white/40 text-sm flex flex-col gap-1 pb-6">
          <p>The Grind Training Center · 8001 NW 50th St, Oklahoma City, OK 73132</p>
          <p>405-495-7800</p>
        </div>
      </div>
    </div>
  );
}
