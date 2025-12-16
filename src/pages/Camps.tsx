import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, DollarSign, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

// Featured camps from the old website
const featuredCamps = [
  {
    title: "Catchers Camp with Former Pro CJ Medlin",
    description: "Elite catching camp with former pro CJ Medlin. Advanced fundamentals, Game IQ, and pro-level skills.",
    date: "January 4, 2025",
    ageRange: "Ages 9-18",
    price: "$125",
    registrationUrl: "https://thegrindtrainingcenter.leagueapps.com/events/4777980-catchers-camp-with-former-pro-cj-medlin"
  },
  {
    title: "Shane Bailey Pitching Camp",
    description: "Train with Shane Bailey (30+ years elite experience) in a 2-hour pitching camp. More velo, better command, real feedback.",
    date: "December 17, 2024",
    ageRange: "Ages 10-15",
    price: "$75",
    registrationUrl: "https://thegrindtrainingcenter.leagueapps.com/events/4825565-shane-bailey-pitching-camp"
  },
  {
    title: "Speed & Agility Program",
    description: "Balance & coordination, jumping & landing mechanics, speed, agility & lateral movement, confidence through fun training.",
    date: "Mondays 6-7 PM, Saturdays 12-1 PM",
    ageRange: "Ages 5-10",
    price: "$40/session",
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4838247-speed--agility-program"
  },
  {
    title: "Wimmer and Walton Weekly Infield",
    description: "Weekly infield training focused on footwork, glove work, and game-speed reps with Rob Walton & Chris Wimmer.",
    date: "Sundays",
    ageRange: "Ages 8-12: 3-4 PM, Ages 13-17: 4-5 PM",
    price: "$40/session",
    registrationUrl: "http://thegrindtrainingcenter.leagueapps.com/events/4827270-wimmer-and-walton-weekly-infield-clinic"
  },
  {
    title: "Little Big Leaguer Program",
    description: "Foundation program for young athletes to develop fundamental baseball and softball skills in a fun environment.",
    date: "Tuesdays & Thursdays, 6:00-7:00 PM",
    ageRange: "Youth",
    price: "Contact for pricing",
    registrationUrl: SCHEDULE_URL
  },
  {
    title: "Big Leaguer Program",
    description: "Advanced training program for competitive players looking to take their game to the next level.",
    date: "Thursdays, 7:00-8:00 PM",
    ageRange: "Teens",
    price: "Contact for pricing",
    registrationUrl: SCHEDULE_URL
  },
];

export default function Camps() {
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['camps_clinics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('camps_clinics')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

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
            We have tons of camps and clinics happening throughout the year! Covering all softball and baseball skills, hitting, speed and agility, and hand-eye coordination. Check out what's available and register today!
          </p>
        </div>
      </section>

      {/* Featured Camps */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            Featured <span className="text-primary">Programs</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCamps.map((camp, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden card-hover flex flex-col"
              >
                <div className="p-6 flex-1">
                  <h3 className="font-heading text-xl uppercase mb-3">{camp.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{camp.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{camp.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{camp.ageRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>{camp.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <Button variant="default" className="w-full" asChild>
                    <a href={camp.registrationUrl} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Camps */}
      {camps.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container-wide mx-auto">
            <h2 className="font-heading text-3xl uppercase mb-8 text-center">
              More <span className="text-primary">Upcoming Programs</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {camps.map((camp) => (
                <div 
                  key={camp.id}
                  className="bg-card border border-border rounded-lg overflow-hidden card-hover flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <h3 className="font-heading text-xl uppercase mb-3">{camp.title}</h3>
                    {camp.description && (
                      <p className="text-muted-foreground text-sm mb-4">{camp.description}</p>
                    )}
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {format(parseISO(camp.start_date), 'MMM d, yyyy')}
                          {camp.end_date && ` - ${format(parseISO(camp.end_date), 'MMM d, yyyy')}`}
                        </span>
                      </div>
                      {camp.age_range && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{camp.age_range}</span>
                        </div>
                      )}
                      {camp.price && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${camp.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0">
                    <Button variant="default" className="w-full" asChild>
                      <a href={camp.registration_url} target="_blank" rel="noopener noreferrer">
                        Register Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
