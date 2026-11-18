import { useEffect, useState } from "react";
import { X } from "lucide-react";
import flyerAsset from "@/assets/flyers/black-friday-blitz-2026.png.asset.json";

const STORAGE_KEY = "grind-black-friday-2026-seen";
const SHOW_DELAY_MS = 1200;

export function BlackFridayPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Black Friday Blitz specials preview"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={close}
    >
      <div className="relative max-h-[90vh] w-full max-w-md" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={close}
          aria-label="Close Black Friday specials"
          className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={flyerAsset.url}
          alt="Black Friday Blitz specials preview: lesson package buy 4 get 1 free, Rapsodo special $35, all cages and mounds 25% off, Shop and Drop game time $25. Links go live Wednesday November 25."
          className="max-h-[90vh] w-full rounded-lg object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
