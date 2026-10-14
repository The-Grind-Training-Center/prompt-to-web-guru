import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DealsBar } from "./DealsBar";
import { useSiteDeals } from "@/lib/siteDeals";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const deals = useSiteDeals();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-x-0 top-0 z-50"><DealsBar deals={deals} /></div>
      <Header dealsVisible={deals.membershipOn} />
      <main className={`flex-1 ${deals.membershipOn ? "pt-32 md:pt-[108px]" : "pt-16"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
