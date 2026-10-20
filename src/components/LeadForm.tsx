import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/metaPixel";
import { getGoogleClickIds, trackGoogleLead } from "@/lib/googleAds";
import { getAttribution } from "@/lib/attribution";
import { LockKeyhole } from "lucide-react";

export type LeadExtraField = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  options?: string[];
};

type Props = {
  offer: string;
  extraFields?: LeadExtraField[];
  submitText: string;
  successHeading: string;
  successText: string;
  finePrint?: string;
};

const inputClass =
  "h-[50px] w-full rounded-md bg-[#111318] border border-white/15 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#E0243A] focus:ring-1 focus:ring-[#E0243A]";

const dateInputClass =
  "block w-full min-w-0 max-w-full box-border [-webkit-appearance:none] [appearance:none]";


const readCookie = (name: string) => {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
};

export default function LeadForm({ offer, extraFields = [], submitText, successHeading, successText, finePrint }: Props) {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false); // prevents double submits

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    setError("");
    if (!parentName.trim() || !phone.trim() || !email.trim() || extraFields.some((f) => !(extra[f.name] ?? "").trim())) {
      setError("Please fill out every field.");
      return;
    }
    if (parentName.trim().length > 100 || phone.trim().length > 40 || email.trim().length > 200) {
      setError("Please shorten your entries.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    const details: Record<string, string> = {};
    for (const f of extraFields) {
      const v = (extra[f.name] ?? "").trim().slice(0, 200);
      if (f.type === "number" && (Number.isNaN(Number(v)) || Number(v) < 0 || Number(v) > 999)) {
        setError(`Please enter a valid number for "${f.label}".`);
        return;
      }
      details[f.label] = v;
    }

    const eventId = crypto.randomUUID();
    const attribution = getAttribution();
    busy.current = true;
    setSubmitting(true);
    const { error: insertError } = await supabase.from("leads").insert({
      offer,
      parent_name: parentName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      details,
      event_id: eventId,
      ...getGoogleClickIds(),
      ...attribution,
    });
    if (insertError) {
      busy.current = false;
      setSubmitting(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);

    supabase.functions
      .invoke("notify-lead", {
        body: {
          offer,
          details,
          parent_name: parentName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          ...attribution,
          event_id: eventId,
          page_url: window.location.href,
          fbp: readCookie("_fbp"),
          fbc:
            readCookie("_fbc") ??
            (attribution.fbclid ? `fb.1.${Date.now()}.${attribution.fbclid}` : undefined),
        },
      })
      .catch(() => {
        // ignored: never block the success screen
      });

    trackLead(eventId);
    trackGoogleLead(eventId);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <h2 className="font-heading font-bold uppercase text-3xl sm:text-4xl">{successHeading}</h2>
        <p className="text-white/70">{successText}</p>
      </div>
    );
  }

  const base = [
    { id: "lf-name", label: "Your name", type: "text", value: parentName, set: setParentName, ac: "name" },
    { id: "lf-phone", label: "Phone", type: "tel", value: phone, set: setPhone, ac: "tel" },
    { id: "lf-email", label: "Email", type: "email", value: email, set: setEmail, ac: "email" },
  ];

  return (
    <form onSubmit={handleSubmit} className="lead-form flex flex-col gap-4 text-left">
      <style>{`
        .lead-form input[type="date"] { display: block; width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; -webkit-appearance: none; appearance: none; height: 50px; font-size: 16px; }
        input[type="date"]::-webkit-date-and-time-value { text-align: left; margin: 0; }
      `}</style>

      {base.map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="block text-sm text-white/70 mb-1.5">{f.label}</label>
          <input id={f.id} type={f.type} required value={f.value} onChange={(e) => f.set(e.target.value)} className={inputClass} autoComplete={f.ac} />
        </div>
      ))}
      {extraFields.map((f) => {
        const id = `lf-${f.name}`;
        const value = extra[f.name] ?? "";
        const set = (v: string) => setExtra((p) => ({ ...p, [f.name]: v }));
        return (
          <div key={f.name}>
            <label htmlFor={id} className="block text-sm text-white/70 mb-1.5">{f.label}</label>
            {f.type === "select" ? (
              <select id={id} required value={value} onChange={(e) => set(e.target.value)} className={inputClass}>
                <option value="" disabled>Select...</option>
                {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                id={id}
                type={f.type}
                required
                value={value}
                onChange={(e) => set(e.target.value)}
                inputMode={f.type === "number" ? "numeric" : undefined}
                min={f.type === "number" ? 0 : undefined}
                className={`${inputClass}${f.type === "date" ? ` ${dateInputClass}` : ""} [color-scheme:dark]`}
              />
            )}
          </div>
        );
      })}
      {error && <p className="text-[#E0243A] text-sm">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-[#E0243A] hover:bg-[#C41D31] disabled:opacity-60 transition-colors py-4 font-heading font-bold uppercase tracking-wider text-lg"
      >
        {submitting ? "Saving..." : submitText}
      </button>
      {finePrint && <p className="flex items-center justify-center gap-2 text-center text-sm text-white/50"><LockKeyhole aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />{finePrint}</p>}
    </form>
  );
}
