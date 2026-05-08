import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Award, Handshake } from "lucide-react";

const JAW_BATS_URL = "https://officialcanesstore.com/collections/jaw-bats-x-canes";

export default function JawBats() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Official Partner</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            The Grind <span className="text-primary">×</span> JAW Bats
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mb-8">
            We've teamed up with JAW Bats to bring our athletes premium, hand-crafted wood bats —
            and as part of the partnership, you get <strong className="text-primary">FREE shipping</strong> on every order.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={JAW_BATS_URL} target="_blank" rel="noopener noreferrer">
              Shop JAW Bats
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 shadow-brand-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl uppercase mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Every JAW Bats order ships free when you order through The Grind partnership.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-brand-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl uppercase mb-2">Premium Wood</h3>
              <p className="text-muted-foreground">
                Hand-crafted bats built for serious hitters — quality you can feel at the plate.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-brand-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Handshake className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl uppercase mb-2">Trusted Partner</h3>
              <p className="text-muted-foreground">
                A brand we stand behind, backing the athletes who train at The Grind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Ready to Swing <span className="text-primary">JAW</span>?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Order your bat today and take advantage of free shipping through our partnership.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={JAW_BATS_URL} target="_blank" rel="noopener noreferrer">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
