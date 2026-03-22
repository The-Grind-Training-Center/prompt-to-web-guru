import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import flyer images
import baseballCampFlyer from "@/assets/flyers/baseball-camp.png";
import highSchoolWorkoutFlyer from "@/assets/flyers/high-school-workout.jpg";
import bigLeaguerFlyer from "@/assets/flyers/big-leaguer.jpg";
import littleBigLeaguerFlyer from "@/assets/flyers/little-big-leaguer.jpg";

import softballPitchingCampApr1Flyer from "@/assets/flyers/softball-pitching-camp-apr1.jpg";
import softballPitchingCampApr8Flyer from "@/assets/flyers/softball-pitching-camp-apr8.jpg";
import speedAgilityCampFlyer from "@/assets/flyers/speed-agility-camp.jpg";


const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";

// Camp flyers ordered by date
const campFlyers = [
  {
    title: "Speed and Agility Camp - March 8 & 22",
    image: speedAgilityCampFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=e9e97022-8029-4f3e-8792-9fac51c1d64f"
  },
  {
    title: "HitTrax Hitting Camp with Kyle King - March 13",
    image: hittraxHittingCampFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=b4438eea-b3bc-4867-9bca-d9733ed8f09a"
  },
  {
    title: "Spring Break 3 Day Camp - March 16-18",
    image: springBreak3DayCampFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?membership_id=64d2d023-5d40-442d-8b98-7ed082cbd018"
  },
  {
    title: "Spring Break Softball Pitching Camp - March 17",
    image: springBreakSbCampFlyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=6546f623-8925-4306-8436-fcf8f5bd444a"
  },
  {
    title: "Softball Pitching Camp - April 1",
    image: softballPitchingCampApr1Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=ad4b00f1-3201-4f07-9d62-dd029009e3b6"
  },
  {
    title: "Softball Pitching Camp - April 8",
    image: softballPitchingCampApr8Flyer,
    registrationUrl: "https://thegrindtrainingcenter.myesoftplanner.com/api/dashboard/?camp_class_id=59af1d12-01aa-4945-b178-d1f5530998a7"
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
