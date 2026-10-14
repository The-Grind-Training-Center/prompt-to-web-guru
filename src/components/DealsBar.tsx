import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSiteDeals } from "@/lib/siteDeals";

type Props = { deals: ReturnType<typeof getSiteDeals> };

export function DealsBar({ deals }: Props) {
  const { fieldOn, membershipOn, countdown } = deals;
  if (!membershipOn) return null;
  return (
    <aside aria-label="Fall deals" className="site-deals-bar flex h-16 flex-col items-center justify-center gap-1 px-2 md:h-11 md:flex-row md:gap-3">
      <p className="text-xs font-semibold md:hidden">
        {fieldOn ? `Fall deals · ${countdown}` : <>Last day: memberships $109/mo <s>$130</s></>}
      </p>
      <div className="hidden items-center gap-3 whitespace-nowrap text-xs md:flex lg:text-sm">
        {fieldOn ? <><strong>Fall deals end soon</strong><span>Memberships $109/mo <s>$130</s></span><span>Field rentals $125/hr <s>$150</s></span><strong>{countdown}</strong></> : <strong>Last day: memberships $109/mo <s>$130</s></strong>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="ghost" asChild className="site-deals-pill h-6 rounded-full px-3 text-xs">
          <Link to="/membership"><span className="md:hidden">{fieldOn ? "$109 memberships" : "Membership deal"}</span><span className="hidden md:inline">Membership deal</span></Link>
        </Button>
        {fieldOn && <Button variant="ghost" asChild className="site-deals-pill h-6 rounded-full px-3 text-xs"><Link to="/rentals"><span className="md:hidden">$125/hr field</span><span className="hidden md:inline">Book the field</span></Link></Button>}
      </div>
    </aside>
  );
}