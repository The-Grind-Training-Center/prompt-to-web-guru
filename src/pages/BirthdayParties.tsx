import { useRef } from "react";
import { Link } from "react-router-dom";
import LeadForm from "@/components/LeadForm";
import logoAsset from "@/assets/backstop-logo.webp.asset.json";
import heroAsset from "@/assets/party-hero.webp.asset.json";

const logo = new URL(logoAsset.url, "https://thegrindtrainingcenter.com").href;
const heroImage = new URL(heroAsset.url, "https://thegrindtrainingcenter.com").href;

const GAMES = ["Dodgeball", "Soccer", "Wiffleball", "Football", "Kickball", "Home Run Derby"];

export default function BirthdayParties() {
  const formRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen bg-[#08090C] text-white overflow-x-hidden">
      <div className="mx-auto w-full max-w-[680px] px-5 py-14 sm:py-20 flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-5">
          <img src={logo} alt="The Grind Training Center" width={280} height={207} className="w-[120px] sm:w-[140px] h-auto" />
          <h1 className="font-heading font-bold uppercase leading-[0.95] tracking-tight text-[2.25rem] sm:text-5xl lg:text-6xl">
            <span className="block text-white">Birthday Parties</span>
            <span className="block text-[#E0243A]">at The Grind</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Two hours of games, pizza and nonstop fun. Indoors, any weather.
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(224,36,58,0.35)]">
          <img src={heroImage} width={1200} height={382} alt="Indoor turf field at The Grind Training Center" className="w-full h-auto object-cover" />
        </div>

        <div className="w-full rounded-xl bg-[#0D0F13] border border-[#E0243A] p-6">
          <p className="font-heading font-bold text-6xl text-[#E0243A]">$295</p>
          <p className="mt-3 text-white/80">2 hours · up to 15 kids · 2 pizzas · <span className="whitespace-nowrap">2-liter soda</span></p>
          <p className="mt-3 text-white/50 text-sm uppercase tracking-widest">Friday to Sunday</p>
        </div>

        <div className="w-full">
          <p className="text-[#E0243A] text-xs font-semibold uppercase tracking-widest mb-3">Games</p>
          <div className="flex flex-wrap justify-center gap-2">
            {GAMES.map((g) => (
              <span key={g} className="rounded-full border border-white/15 bg-[#0D0F13] px-4 py-2 text-sm font-semibold">
                {g}
              </span>
            ))}
          </div>
        </div>

        <div ref={formRef} className="w-full rounded-2xl bg-[#0D0F13] border border-white/10 p-6 sm:p-8">
          <LeadForm
            offer="Birthday Party"
            extraFields={[
              { name: "child_age", label: "Birthday child's age", type: "number" },
              { name: "preferred_date", label: "Preferred date", type: "date" },
              { name: "kid_count", label: "How many kids", type: "number" },
            ]}
            submitText="Check My Date"
            successHeading="We got your request."
            successText="We'll call you within one business day to confirm your date. Questions? Call 405-495-7800."
          />
        </div>

        <div className="text-white/40 text-sm flex flex-col gap-1 pb-6">
          <p>The Grind Training Center · 8001 NW 50th St, Oklahoma City, OK 73132</p>
          <p>405-495-7800</p>
          <Link to="/privacy" className="underline-offset-2 hover:underline text-xs mt-1">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
