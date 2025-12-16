import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

const coaches = [
  {
    name: "Chris Wimmer",
    title: "Hitting Instructor",
    bio: "Former professional player with extensive experience developing hitters at all levels.",
  },
  {
    name: "Shane Bailey",
    title: "Pitching Coach",
    bio: "Specializes in pitching mechanics and velocity development for youth through college athletes.",
  },
  {
    name: "Mickey Tettleton",
    title: "Hitting Instructor",
    bio: "Former MLB All-Star with 14 years of Major League experience. Known for power hitting expertise.",
  },
  {
    name: "Edwin Seda",
    title: "Hitting Instructor",
    bio: "Professional baseball experience with a focus on swing mechanics and approach at the plate.",
  },
  {
    name: "Anton Shinhoster",
    title: "Speed & Agility Coach",
    bio: "Athletic performance specialist focused on speed, agility, and overall athletic development.",
  },
  {
    name: "Leon Joyce",
    title: "Baseball Instructor",
    bio: "All-around baseball instructor with expertise in fielding, base running, and game strategy.",
  },
  {
    name: "Paige Sechrist",
    title: "Softball Instructor",
    bio: "Collegiate softball experience with a passion for developing female athletes in all aspects of the game.",
  },
  {
    name: "Kyle King",
    title: "Pitching Coach",
    bio: "Advanced pitching instructor specializing in arm care, mechanics, and pitch development.",
  },
  {
    name: "Ethan Flaherty",
    title: "Baseball Instructor",
    bio: "Young, energetic coach with recent playing experience and strong connection with youth athletes.",
  },
  {
    name: "Tanner Holliman",
    title: "Hitting Instructor",
    bio: "Hitting specialist with a data-driven approach using HitTrax technology for measurable improvement.",
  },
  {
    name: "Edie Thompson",
    title: "Softball Instructor",
    bio: "Experienced softball coach focused on fundamentals, confidence building, and game preparation.",
  },
];

export default function Coaches() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Our Team</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Expert <span className="text-primary">Coaches</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Learn from MLB veterans, collegiate athletes, and certified trainers who are passionate about developing the next generation of athletes.
          </p>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-card border border-border rounded-lg overflow-hidden card-hover group"
              >
                <div className="bg-secondary h-48 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-heading text-3xl text-primary">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl uppercase mb-1 group-hover:text-primary transition-colors">
                    {coach.name}
                  </h3>
                  <span className="text-primary text-sm font-semibold block mb-3">{coach.title}</span>
                  <p className="text-muted-foreground text-sm">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Train With the <span className="text-primary">Best</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Book a lesson with one of our expert coaches and start improving today.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Lesson
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
