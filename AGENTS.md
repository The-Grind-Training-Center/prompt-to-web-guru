
- Meta pixel loads once site-wide via MetaPixelTracker in App (PageView per route); pages only call trackLead. Why: avoids double init/PageView.
- Main-site deals use lib/siteDeals for Chicago dates and minute refreshes; Layout coordinates DealsBar, Header offsets and main spacing. Why: keeps banner and main-site cards synchronized without changing ad pages.
- New offer landing pages use components/LeadForm writing to public.leads (offer + details jsonb). Why: one table and form for all ad offers; /backstop keeps backstop_leads.
- Ad landing pages share OfferBar and scoped landing-page CSS tokens, without Layout. Why: keeps offer navigation and theming consistent without changing normal site pages.
- Birthday, Backstop, Chris, Halloween and Membership share the ad-family styles and GoogleReviews component; Backstop retains its own form handler, while the other offers use LeadForm. Chris and Halloween share the exported Halloween expiry helper; Membership exports its own offer expiry helper. Dated offers use America/Chicago dates and refresh while open. Why: keeps visual parity and consistent offer expiry without changing existing submission behavior.
