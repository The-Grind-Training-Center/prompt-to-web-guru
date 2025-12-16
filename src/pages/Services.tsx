import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Target, Calendar } from "lucide-react";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

const services = [
  {
    icon: Target,
    title: "Private Lessons",
    price: "Starting at $50",
    description: "One-on-one instruction with our expert coaches. Personalized training plans focused on your specific goals and skill development.",
    features: ["30 or 60-minute sessions", "Video analysis", "Custom training plan", "All skill levels welcome"],
  },
  {
    icon: Users,
    title: "Group Lessons",
    price: "Starting at $25/player",
    description: "Small group training sessions for 2-6 players. Great for teammates or friends looking to improve together.",
    features: ["2-6 players per group", "Competitive drills", "Team building", "Cost effective"],
  },
  {
    icon: Calendar,
    title: "Camps & Clinics",
    price: "Varies by program",
    description: "Seasonal camps and specialty clinics throughout the year. Intensive training programs for accelerated improvement.",
    features: ["Summer & holiday camps", "Position-specific clinics", "Age-appropriate groups", "All-day programming"],
  },
  {
    icon: Clock,
    title: "Facility Rentals",
    price: "Hourly rates available",
    description: "Rent our batting cages, turf field, or full facility for team practices, private workouts, or special events.",
    features: ["Cage rentals", "Field rentals", "Full facility available", "Flexible scheduling"],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">What We Offer</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            From private lessons to facility rentals, we have everything you need to take your game to the next level.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border rounded-lg p-8 card-hover"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl uppercase">{service.title}</h3>
                    <span className="text-primary font-semibold">{service.price}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="default" asChild>
                  <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Not Sure Where to <span className="text-primary">Start?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
            Contact us and we'll help you find the perfect program for your goals and skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="dark" size="xl" asChild>
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
