import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import indoorFieldImg from "@/assets/facilities/indoor-field.jpg";
import battingCagesImg from "@/assets/facilities/batting-cages.jpg";
import weightRoom1Img from "@/assets/facilities/weight-room-1.jpg";
import pitchingLaneImg from "@/assets/facilities/pitching-lane.jpg";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

const facilities = [
  {
    title: "Indoor Turf Field",
    size: "10,000 Sq Ft",
    description: "Our premium indoor turf field provides year-round training space for baseball, softball, soccer, and all sports. Perfect for team practices, individual workouts, and skill development.",
    features: ["Year-round availability", "Climate controlled", "Professional-grade turf", "Multi-sport use"],
    image: indoorFieldImg,
  },
  {
    title: "Batting Cages",
    size: "10 Lanes",
    description: "Ten professional batting cages equipped with pitching machines and HitTrax technology for detailed swing analysis and performance tracking.",
    features: ["HitTrax technology", "Variable speed machines", "Video analysis capable", "Multiple cage sizes"],
    image: battingCagesImg,
  },
  {
    title: "Pitching Lab",
    size: "Dedicated Area",
    description: "Our pitching lab features multiple mounds and bullpens for focused pitching development with velocity tracking and mechanics analysis.",
    features: ["Multiple mounds", "Velocity tracking", "Video analysis", "Mechanics training"],
    image: pitchingLaneImg,
  },
  {
    title: "Weight Room",
    size: "Full Equipment",
    description: "Complete weight room and functional training area for strength and conditioning, speed training, and overall athletic development.",
    features: ["Free weights", "Cardio equipment", "Functional training", "Speed & agility"],
    image: weightRoom1Img,
  },
];

export default function Facilities() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Our Space</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            World-Class <span className="text-primary">Facilities</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            20,000 square feet of premium training space designed for athletes who are serious about improvement.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid gap-12">
            {facilities.map((facility, index) => (
              <div
                key={facility.title}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-secondary rounded-lg h-80 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-heading text-3xl uppercase mb-4">{facility.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{facility.description}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {facility.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Ready to Train?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Book a session or rent our facilities for your team's next practice.
          </p>
          <Button variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
