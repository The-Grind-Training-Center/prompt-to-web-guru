import { Layout } from "@/components/Layout";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const [googleOptedOut, setGoogleOptedOut] = useState(() => window.grindGoogleAds?.optedOut() ?? false);
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Legal</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Effective October 20, 2026
          </p>
        </div>
      </section>

      {/* Policy */}
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-3xl">
          {/* Who we are */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl uppercase mb-2">Who we are</h2>
                <p className="text-muted-foreground">About The Grind and this policy</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The Grind Training Center ("The Grind," "we") is a sports training facility at 8001 NW 50th St, Oklahoma City, OK 73132. This policy explains what we collect when you contact us, sign up through our website, or fill out a form in one of our Facebook or Instagram ads.
              </p>
            </div>
          </div>

          {/* What we collect */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">What we collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When you sign up or ask about a program, we collect the details you give us: your name, phone number, email address, your athlete's age, and the program you are interested in. If you use a form inside a Facebook or Instagram ad, Meta may fill in some of these details from your profile, and you can edit them before you submit.
              </p>
              <p>
                Our website also uses the Meta Pixel, which uses cookies to tell us which ads led to visits and sign-ups. This helps us measure our advertising.
              </p>
              <p>
                We also use Google Ads to measure ad visits and successful parent or guardian inquiries and help optimize our ads. Google receives page visits and a unique inquiry event ID, not the name, email address, phone number or athlete details entered in our forms. Google may use advertising cookies. We store Google click IDs (gclid, gbraid and wbraid) in your browser for up to 90 days and include them with your saved inquiry when tracking is permitted.
              </p>
              <p>
                No consent banner is shown. Google tracking and click ID storage are blocked in the European Economic Area, United Kingdom and Switzerland, and when your country cannot be determined. We honor Global Privacy Control and your Google advertising opt-out below. Ad clicks and impressions may still be counted by the advertising platform.
              </p>
            </div>
          </div>

          {/* How we use it */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">How we use it</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use your details to call, text or email you about the program you asked about, to place your athlete, to schedule sessions, and to tell you about Grind programs and offers. You can ask us to stop contacting you at any time.
              </p>
            </div>
          </div>

          {/* Who we share it with */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">Who we share it with</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We do not sell your information. We share it only with the service providers that help us run The Grind, such as our website and database host, our booking and payment system, and Meta and Google for ad measurement. They may use it only to provide their service to us.
              </p>
            </div>
          </div>

          {/* Children */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">Children</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our programs are for young athletes, but our forms are meant to be completed by a parent or guardian. We ask only for an athlete's age, not other details about the athlete. We do not knowingly collect personal information directly from children under 13.
              </p>
            </div>
          </div>

          {/* How long we keep it */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">How long we keep it</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We keep your details as long as we need them to work with you, and we delete them when you ask.
              </p>
            </div>
          </div>

          {/* Your choices */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">Your choices</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To see, correct or delete the information we have about you, or to stop hearing from us, email contact@thegrindsports.com or call 405-495-7800.
              </p>
              <p>
                You can stop this website's Google advertising tracking using the button below. Your refusal applies immediately, including in other open tabs, and removes saved Google click IDs from this browser. We retain the refusal date, country if known, and policy version to honor your choice. You can also contact us to request deletion of previously saved inquiry data.
              </p>
              <Button disabled={googleOptedOut} onClick={() => { window.grindGoogleAds?.optOut(); setGoogleOptedOut(true); }}>
                {googleOptedOut ? "Google advertising tracking disabled" : "Disable Google advertising tracking"}
              </Button>
            </div>
          </div>

          {/* Changes */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="font-heading text-2xl uppercase mb-6">Changes</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If we change this policy, we will post the new version on this page with a new effective date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
