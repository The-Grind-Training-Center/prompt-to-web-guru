import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

const galleryItems = [
  { title: "Indoor Turf Field", category: "Facility" },
  { title: "Batting Cages", category: "Training" },
  { title: "Youth Training", category: "Programs" },
  { title: "Pitching Lab", category: "Facility" },
  { title: "Team Practice", category: "Training" },
  { title: "HitTrax Session", category: "Technology" },
  { title: "Weight Room", category: "Facility" },
  { title: "Camps & Clinics", category: "Programs" },
];

export default function Gallery() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">See Our Space</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Photo <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Take a look at our world-class facilities and the athletes who train here.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-secondary rounded-lg overflow-hidden group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-4xl text-primary mb-2">{index + 1}</span>
                  <span className="text-secondary-foreground/60 text-xs uppercase tracking-wider">{item.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-secondary-foreground font-heading text-sm uppercase">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            More photos coming soon! Follow us on Instagram for the latest updates.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            See It <span className="text-primary">In Person</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
            Photos don't do it justice. Come visit The Grind and see our facility for yourself.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Visit
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
