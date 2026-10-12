
- Meta pixel loads once site-wide via MetaPixelTracker in App (PageView per route); pages only call trackLead. Why: avoids double init/PageView.
- New offer landing pages use components/LeadForm writing to public.leads (offer + details jsonb). Why: one table and form for all ad offers; /backstop keeps backstop_leads.
