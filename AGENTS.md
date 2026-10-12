
- Meta pixel loads once site-wide via MetaPixelTracker in App (PageView per route); pages only call trackLead. Why: avoids double init/PageView.
- New offer landing pages use components/LeadForm writing to public.leads (offer + details jsonb). Why: one table and form for all ad offers; /backstop keeps backstop_leads.
- Ad landing pages share OfferBar and scoped landing-page CSS tokens, without Layout. Why: keeps offer navigation and theming consistent without changing normal site pages.
