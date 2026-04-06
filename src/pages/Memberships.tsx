import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Users, Zap } from "lucide-react";

const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/booking/memberships";

const basicMemberships = [
  {
    title: "Swing Membership",
    price: "$59",
    period: "/month",
    credits: "+8 credits",
    features: ["Access to batting cages", "8 monthly credits"],
    url: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=06767c85-c892-4f4c-aa58-a7970d0673a6",
  },
  {
    title: "HitTrax Access",
    price: "$75",
    period: "/month",
    credits: "+8 credits",
    features: ["HitTrax access", "8 monthly credits", "Performance tracking"],
  },
  {
    title: "Mound Members",
    price: "$75",
    period: "/month",
    credits: "+8 credits",
    features: ["Pitching mound access", "8 monthly credits"],
  },
];

const premiumMemberships = [
  {
    title: "High Access",
    price: "$99",
    period: "/month",
    credits: "+12 credits",
    features: ["Full facility access", "12 monthly credits", "Priority booking"],
    popular: true,
  },
  {
    title: "High Access + HitTrax",
    price: "$109–$115",
    period: "/month",
    credits: "+12 credits",
    features: ["Full facility access", "HitTrax access included", "12 monthly credits", "Priority booking"],
  },
];

export default function Memberships() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Summer Pricing</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Grind <span className="text-primary">Memberships</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Choose the membership that fits your training goals. All memberships include monthly credits for cage time, lessons, and more.
          </p>
        </div>
      </section>

      {/* Basic Memberships */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-2 text-center">
            Basic <span className="text-primary">Memberships</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Great starting options for athletes focused on specific training areas
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {basicMemberships.map((plan) => (
              <div
                key={plan.title}
                className="bg-card border border-border rounded-lg p-6 card-hover flex flex-col"
              >
                <h3 className="font-heading text-xl uppercase mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading text-4xl text-primary">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <span className="text-primary font-semibold text-sm mb-4">{plan.credits}</span>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="default" asChild className="w-full">
                  <a href={plan.url || SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>

          {/* Premium Memberships */}
          <h2 className="font-heading text-3xl uppercase mb-2 text-center">
            Premium <span className="text-primary">Memberships</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Full access for serious athletes looking to maximize their training
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {premiumMemberships.map((plan) => (
              <div
                key={plan.title}
                className={`bg-card border rounded-lg p-6 card-hover flex flex-col relative ${
                  plan.popular ? "border-primary shadow-brand-md" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-heading uppercase tracking-wider flex items-center gap-1">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <h3 className="font-heading text-xl uppercase mb-2 mt-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading text-4xl text-primary">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <span className="text-primary font-semibold text-sm mb-4">{plan.credits}</span>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="hero" asChild className="w-full">
                  <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Plan */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto bg-card border border-primary rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="font-heading text-3xl uppercase">
                Family <span className="text-primary">High Access Plan</span>
              </h2>
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-heading text-5xl text-primary">$149</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <span className="text-primary font-semibold">+12 credits</span>
            <ul className="space-y-3 mt-6 mb-8 text-left max-w-md mx-auto">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                $25 each additional athlete
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                Up to 4 family members (same household)
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                Full facility access for the whole family
              </li>
            </ul>
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Sign Up Your Family
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            <span className="text-primary">Add-Ons</span> & Extras
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg uppercase">Friends Add-On</h3>
                <p className="text-primary font-semibold">$15 / session</p>
                <p className="text-sm text-muted-foreground mt-1">Bring a friend to train with you</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg uppercase">Rapsodo Sessions</h3>
                <p className="text-primary font-semibold">$35 / session for members</p>
                <p className="text-sm text-muted-foreground mt-1">Discounted Rapsodo pitching analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Ready to <span className="text-primary">Join?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Sign up online or give us a call to get started with your membership today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Sign Up Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="tel:405-495-7800">
                Call 405-495-7800
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
