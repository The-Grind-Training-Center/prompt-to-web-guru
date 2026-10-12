import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { loadMetaPixel, trackPageView } from "@/lib/metaPixel";

export function MetaPixelTracker() {
  const { pathname } = useLocation();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (last.current === pathname) return; // guard against double fire (StrictMode)
    last.current = pathname;
    loadMetaPixel();
    trackPageView();
  }, [pathname]);
  return null;
}
