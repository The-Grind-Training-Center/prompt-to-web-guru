import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import flyer images
import baseballCampFlyer from "@/assets/flyers/baseball-camp.png";
import highSchoolWorkoutFlyer from "@/assets/flyers/high-school-workout.jpg";
import bigLeaguerFlyer from "@/assets/flyers/big-leaguer.jpg";
import littleBigLeaguerFlyer from "@/assets/flyers/little-big-leaguer.jpg";
import robWaltonMay21Flyer from "@/assets/flyers/rob-walton-pitching-may21.png";
import butlerHittingDefenseMay20Flyer from "@/assets/flyers/butler-hitting-defense-may20.png";



const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";

// Camp flyers ordered by date
const campFlyers = [
  {
    title: "Rob Walton Pitching Camp (High School) - May 21",
    image: robWaltonMay21Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/auth/login"
  },
  {
    title: "Situational Hitting & Base Running Camp - May 15",
    image: situationalHittingFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=eedd6691-e227-47b8-8fbb-b5471930dc3e"
  },
  {
    title: "Butler Hitting & Defense Camp - May 20",
    image: butlerHittingDefenseMay20Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=f40abfc4-f9e9-460f-8585-4c9390f6d136"
  },
  {
    title: "Catching Camp with Cody Milligan - May 18",
    image: catchingCampMay18Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=ec4eb013-3c2c-454b-a103-c5ce5b9f30d9"
  },
  {
    title: "Softball Pitching Camp with Paige Sechrist - May 13",
    image: paigePitchingMay13Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=87dba472-ad07-499d-ab24-fc56b23a113c"
  },
  {
    title: "High School Workout Program",
    image: highSchoolWorkoutFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=530076ba-6f86-4e6a-b43f-05764bdefce8"
  },
  {
    title: "Big Leaguer Program",
    image: bigLeaguerFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=1735f47d-4c9d-41af-93a1-dd1f23d63a0c"
  },
  {
    title: "Little Big Leaguer Program",
    image: littleBigLeaguerFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=3384c398-1655-4408-b76e-a66cd2a230ab"
  },
];

export default function Camps() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Level Up Your Game</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Camps & <span className="text-primary">Clinics</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            We have tons of camps and clinics happening throughout the year! Covering all softball and baseball skills, hitting, speed and agility, and hand-eye coordination. Click on any flyer below to register!
          </p>
        </div>
      </section>

      {/* Camp Flyers Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            Current <span className="text-primary">Programs</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Click on any flyer to register for that program
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campFlyers.map((flyer, index) => (
              <a
                key={index}
                href={flyer.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-border rounded-lg overflow-hidden card-hover transition-all duration-300 hover:shadow-xl hover:border-primary/50"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={flyer.image} 
                    alt={flyer.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-secondary/50">
                  <h3 className="font-heading text-sm uppercase text-center group-hover:text-primary transition-colors">
                    {flyer.title}
                  </h3>
                  <p className="text-xs text-center text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Register →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Don't See What You <span className="text-primary">Need?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            We also offer private lessons, group training, and facility rentals. Schedule online or give us a call!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Online
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
