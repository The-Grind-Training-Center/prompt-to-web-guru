import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">About Us</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Built by athletes, for athletes. The Grind Training Center is dedicated to developing 
            the next generation of champions in Oklahoma City.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl uppercase mb-6">
                More Than Just a <span className="text-primary">Facility</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The Grind Training Center offers 20,000 sq. ft. of turf space including 8 batting cages 
                (five 55ft cages and two 60-65ft cages), a pitching lab, weight room, and a 10,000 sq. ft. 
                indoor turf field for all sports. We've created a space where athletes can push their 
                limits, learn from the best, and achieve their full potential.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our state-of-the-art facility features HitTrax technology, professional-grade equipment, 
                and expert instruction from coaches who have played and coached at the highest levels, 
                including Major League Baseball.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're a beginner looking to learn the fundamentals or an elite athlete 
                preparing for the next level, The Grind has the resources and expertise to help 
                you reach your goals.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl uppercase mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide world-class training facilities and expert coaching to develop 
                      athletes of all ages and skill levels.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl uppercase mb-2">Our Community</h3>
                    <p className="text-muted-foreground">
                      We serve athletes from across Oklahoma City and beyond, building a supportive 
                      community of dedicated players and families.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl uppercase mb-2">Our Results</h3>
                    <p className="text-muted-foreground">
                      Our athletes have gone on to play at collegiate and professional levels, 
                      proving that hard work and expert training pay off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Come See Us <span className="text-primary">In Person</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Schedule a tour of our facility or book your first training session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
