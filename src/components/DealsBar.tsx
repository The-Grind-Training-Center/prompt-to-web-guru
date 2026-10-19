import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSiteDeals } from "@/lib/siteDeals";

type Props = { deals: ReturnType<typeof getSiteDeals> };

export function DealsBar({ deals }: Props) {
  const { membershipOn, countdown } = deals;
  return (
    <aside aria-label="Membership deal and field credits" className="site-deals-bar flex h-16 flex-col items-center justify-center gap-1 px-2 md:h-11 md:flex-row md:gap-3">
      <p className="text-xs font-semibold md:hidden">
        {membershipOn ? `$109/mo · ${countdown} · Field credits from $105/hr` : "Field credits from $105/hr"}
      </p>
      <div className="hidden items-center gap-3 whitespace-nowrap text-xs md:flex lg:text-sm">
        {membershipOn && <><strong>Membership deal</strong><span>Memberships $109/mo <s>$130</s></span><strong>{countdown}</strong></>}
        <span>Field credits from $105/hr</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {membershipOn && <Button variant="ghost" asChild className="site-deals-pill h-6 rounded-full px-3 text-xs">
          <Link to="/membership">Membership deal</Link>
        </Button>}
        <Button variant="ghost" asChild className="site-deals-pill h-6 rounded-full px-3 text-xs"><Link to="/rentals">Field credits</Link></Button>
      </div>
    </aside>
  );
}