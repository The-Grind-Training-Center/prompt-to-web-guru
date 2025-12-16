import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";
const INSTAGRAM_URL = "https://www.instagram.com/thegrindtrainingcenter/";
const FACEBOOK_URL = "https://www.facebook.com/thegrindsportstraining/";

const defaultGalleryItems = [
  { title: "Indoor Turf Field", category: "Facility", description: "10,000 sq ft of premium indoor turf" },
  { title: "Batting Cages", category: "Training", description: "10 cages for hitting practice" },
  { title: "Youth Training", category: "Programs", description: "Developing young athletes" },
  { title: "Pitching Lab", category: "Facility", description: "Advanced pitching analysis" },
  { title: "Team Practice", category: "Training", description: "Group sessions and team rentals" },
  { title: "HitTrax Session", category: "Technology", description: "Data-driven hitting improvement" },
  { title: "Weight Room", category: "Facility", description: "Strength and conditioning" },
  { title: "Camps & Clinics", category: "Programs", description: "Seasonal skill development" },
];

export default function Gallery() {
  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery_images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

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
            Take a look at our world-class facilities and the athletes who train here. Follow us on social media for the latest photos and updates!
          </p>
        </div>
      </section>

      {/* Gallery from Database */}
      {galleryImages.length > 0 && (
        <section className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg overflow-hidden group relative cursor-pointer"
                >
                  <img 
                    src={image.image_url} 
                    alt={image.caption || 'Gallery image'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {image.caption && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <span className="text-secondary-foreground font-heading text-sm uppercase">{image.caption}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Default Gallery Grid */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            Our <span className="text-primary">Facilities</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {defaultGalleryItems.map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-secondary rounded-lg overflow-hidden group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-heading text-4xl text-primary mb-2">{index + 1}</span>
                  <span className="text-secondary-foreground text-sm font-medium">{item.title}</span>
                  <span className="text-secondary-foreground/60 text-xs uppercase tracking-wider mt-1">{item.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-secondary-foreground text-xs">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-3xl uppercase mb-4">
            Follow Us on <span className="text-primary">Social Media</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stay up to date with the latest photos, training tips, and announcements by following us on Instagram and Facebook!
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
            </Button>
            <Button variant="default" size="lg" asChild>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                <Facebook className="mr-2 h-5 w-5" />
                Facebook
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            See It <span className="text-primary">In Person</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
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
