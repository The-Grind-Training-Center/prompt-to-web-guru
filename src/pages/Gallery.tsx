import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Facebook, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Facility images
import indoorFieldImg from "@/assets/facilities/indoor-field.jpg";
import battingCagesImg from "@/assets/facilities/batting-cages.jpg";
import hittrax1Img from "@/assets/facilities/hittrax-1.jpg";
import hittrax2Img from "@/assets/facilities/hittrax-2.jpg";
import weightRoom1Img from "@/assets/facilities/weight-room-1.jpg";
import turfFieldWideImg from "@/assets/facilities/turf-field-wide.jpg.asset.json";
import turfFieldScoreboardImg from "@/assets/facilities/turf-field-scoreboard.jpg.asset.json";
import turfFieldBaseImg from "@/assets/facilities/turf-field-base.jpg.asset.json";
import turfFieldBase2Img from "@/assets/facilities/turf-field-base-2.jpg.asset.json";
import cageStrikeZoneImg from "@/assets/facilities/cage-strike-zone.jpg.asset.json";

const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";
const INSTAGRAM_URL = "https://www.instagram.com/thegrindtrainingcenter/";
const TIKTOK_URL = "https://www.tiktok.com/@thegrindtrainingcenter";
const FACEBOOK_URL = "https://www.facebook.com/thegrindsportstraining/";

const facilityGalleryItems = [
  { title: "Indoor Turf Field", category: "Facility", description: "10,000 sq ft of premium indoor turf", image: indoorFieldImg },
  { title: "Full Field View", category: "Facility", description: "The 10,000 sq ft field end to end", image: turfFieldWideImg.url },
  { title: "Field and Scoreboard", category: "Facility", description: "Turf field with the overhead scoreboard", image: turfFieldScoreboardImg.url },
  { title: "Base on the Turf", category: "Facility", description: "Ready for your next indoor practice", image: turfFieldBaseImg.url },
  { title: "Indoor Turf Base", category: "Facility", description: "Practice all winter, rain or shine", image: turfFieldBase2Img.url },
  { title: "Batting Cages", category: "Training", description: "8 cages for hitting practice", image: battingCagesImg },
  { title: "Strike Zone Target", category: "Training", description: "Pitching lane with a strike zone target", image: cageStrikeZoneImg.url },
  { title: "HitTrax Technology", category: "Technology", description: "Data-driven hitting improvement", image: hittrax1Img },
  { title: "HitTrax Session", category: "Technology", description: "Real-time performance metrics", image: hittrax2Img },
  { title: "Weight Room", category: "Facility", description: "Strength and conditioning", image: weightRoom1Img },
];

type GalleryPhoto = { title: string; description: string; image: string };

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

  const dbPhotos: GalleryPhoto[] = galleryImages.map((image) => ({
    title: image.caption || 'Gallery image',
    description: '',
    image: image.image_url,
  }));

  const photos: GalleryPhoto[] = [...dbPhotos, ...facilityGalleryItems];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = (dir: number) =>
    setOpenIndex((current) =>
      current === null ? current : (current + dir + photos.length) % photos.length
    );

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const openPhoto = (index: number) => setOpenIndex(index);
  const closePhoto = () => setOpenIndex(null);
  const activePhoto = openIndex === null ? null : photos[openIndex];

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
            Take a look at our world-class facilities and the athletes who train here. Click any photo to see it up close. Follow us on social media for the latest photos and updates!
          </p>
        </div>
      </section>

      {/* Gallery from Database */}
      {galleryImages.length > 0 && (
        <section className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${image.caption || 'Gallery image'}`}
                  onClick={() => openPhoto(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openPhoto(index);
                    }
                  }}
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

      {/* Facility Gallery Grid */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            Our <span className="text-primary">Facilities</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {facilityGalleryItems.map((item, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.title}`}
                onClick={() => openPhoto(dbPhotos.length + index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPhoto(dbPhotos.length + index);
                  }
                }}
                className="aspect-square rounded-lg overflow-hidden group relative cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-secondary-foreground font-heading text-sm uppercase block">{item.title}</span>
                  <span className="text-secondary-foreground/70 text-xs">{item.description}</span>
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
            Stay up to date with the latest photos, training tips, and announcements by following us on social media!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                <Facebook className="mr-2 h-5 w-5" />
                Facebook
              </a>
            </Button>
            <Button variant="default" size="lg" asChild>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
            </Button>
            <Button variant="default" size="lg" asChild>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                TikTok
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

      {/* Photo viewer */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-[100] flex flex-col bg-secondary/95"
          onClick={closePhoto}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-heading text-xs uppercase tracking-widest text-secondary-foreground/60">
              {(openIndex ?? 0) + 1} of {photos.length}
            </span>
            <button
              type="button"
              onClick={closePhoto}
              aria-label="Close photo"
              className="rounded-full bg-secondary-foreground/10 p-2 text-secondary-foreground transition-colors hover:bg-secondary-foreground/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[72vh] max-w-full rounded-lg object-contain"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary-foreground/10 p-2 text-secondary-foreground transition-colors hover:bg-secondary-foreground/20 md:left-6 md:p-3"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary-foreground/10 p-2 text-secondary-foreground transition-colors hover:bg-secondary-foreground/20 md:right-6 md:p-3"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pb-6 pt-4 text-center" onClick={(event) => event.stopPropagation()}>
            <p className="font-heading text-lg uppercase text-secondary-foreground">{activePhoto.title}</p>
            {activePhoto.description && (
              <p className="mt-1 text-sm text-secondary-foreground/60">{activePhoto.description}</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
