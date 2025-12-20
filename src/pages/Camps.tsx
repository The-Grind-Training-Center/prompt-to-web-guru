import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import flyer images
import infieldClinicFlyer from "@/assets/flyers/infield-clinic.jpg";
import speedAgilityFlyer from "@/assets/flyers/speed-agility.png";
import shaneBaileyFlyer from "@/assets/flyers/shane-bailey-pitching.jpg";
import santaHittingFlyer from "@/assets/flyers/santa-hitting-clinic.jpg";
import hittraxBpFlyer from "@/assets/flyers/hittrax-bp.png";
import winterWorkoutFlyer from "@/assets/flyers/winter-workout.png";
import indoorTournamentFlyer from "@/assets/flyers/indoor-tournament.jpg";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

// Camp flyers with registration links
const campFlyers = [
  {
    title: "Wimmer and Walton Weekly Infield Clinic",
    image: infieldClinicFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4827270-wimmer-and-walton-weekly-infield-clinic"
  },
  {
    title: "Speed & Agility Class with Chris Wimmer",
    image: speedAgilityFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4778005-speed--agility-class-w-chris-wimmer"
  },
  {
    title: "Shane Bailey Pitching Camp",
    image: shaneBaileyFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4825565-shane-bailey-pitching-camp"
  },
  {
    title: "Santa Hitting Clinic",
    image: santaHittingFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4841703-santa-hitting-clinic"
  },
  {
    title: "HitTrax BP Days",
    image: hittraxBpFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4770107-hittrax-bp-days--the-grind"
  },
  {
    title: "Winter Workout Program",
    image: winterWorkoutFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4777964-winter-workout-program"
  },
  {
    title: "Indoor Baseball Tournament (6U-8U)",
    image: indoorTournamentFlyer,
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4764910-january-10-11th-6u-8u-indoor-baseball-tournament-coach-pitch"
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
