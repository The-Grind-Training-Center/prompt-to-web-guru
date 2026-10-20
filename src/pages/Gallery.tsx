import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Facebook, X, ChevronLeft, ChevronRight, ChevronDown, CalendarCheck } from "lucide-react";
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
import turfTrainingImg from "@/assets/facilities/turf-training.jpg";
import battingCageTeeImg from "@/assets/facilities/batting-cage-tee.jpg";
import hittraxScreenImg from "@/assets/facilities/hittrax-screen.jpg";
import pitchingLaneImg from "@/assets/facilities/pitching-lane.jpg";
import weightRoom2Img from "@/assets/facilities/weight-room-2.jpg";
import rapsodoImg from "@/assets/rapsodo.jpg";
import rapsodoDeviceImg from "@/assets/rapsodo-device.webp";
import rapsodoUnitImg from "@/assets/rapsodo/IMG_2224.jpg.asset.json";
import rapsodoUnitFrontImg from "@/assets/rapsodo/IMG_2311.jpg.asset.json";
import rapsodoLiveScreenImg from "@/assets/rapsodo/IMG_2227.jpg.asset.json";
import cageStrikeZoneImg from "@/assets/facilities/cage-strike-zone.jpg.asset.json";
import pitchCatcherImg from "@/assets/pitching/IMG_2167.jpg.asset.json";
import pitchRubberImg from "@/assets/pitching/IMG_2084.jpg.asset.json";
import pitchLaneImg from "@/assets/pitching/IMG_2085.jpg.asset.json";
import pitchLane2Img from "@/assets/pitching/IMG_2086.jpg.asset.json";
import pitchTargetNetImg from "@/assets/pitching/IMG_2052.jpg.asset.json";
import pitchMachineImg from "@/assets/pitching/IMG_2048.jpg.asset.json";
import pitchZoneBannerImg from "@/assets/pitching/IMG_2043.jpg.asset.json";
import cageBatterStanceImg from "@/assets/cages/IMG_2174.jpg.asset.json";
import cageLaneViewImg from "@/assets/cages/IMG_2345.jpg.asset.json";
import cageTeeLanesImg from "@/assets/cages/IMG_2028.jpg.asset.json";
import cageTeeBallImg from "@/assets/cages/IMG_2337.jpg.asset.json";
import cageHomePlateImg from "@/assets/cages/IMG_2343.jpg.asset.json";
import cageCoachLessonImg from "@/assets/cages/IMG_2314.jpg.asset.json";
import cageBatterReadyImg from "@/assets/cages/IMG_2299.jpg.asset.json";
import cageCoachScreenImg from "@/assets/cages/IMG_2181-edited.jpg.asset.json";
import cageTeeCoachImg from "@/assets/cages/IMG_2212-edited.jpg.asset.json";
import cageLScreenImg from "@/assets/cages/IMG_2333-edited.jpg.asset.json";

const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";
const INSTAGRAM_URL = "https://www.instagram.com/thegrindtrainingcenter/";
const TIKTOK_URL = "https://www.tiktok.com/@thegrindtrainingcenter";
const FACEBOOK_URL = "https://www.facebook.com/thegrindsportstraining/";

type GalleryPhoto = { title: string; description: string; image: string; area?: string };

const facilityCards: { title: string; subtitle: string; photos: GalleryPhoto[] }[] = [
  { title: "Indoor Turf Field", subtitle: "10,000 sq ft", photos: [
    { title: "Full Field View", description: "The field end to end", image: turfFieldWideImg.url },
    { title: "Indoor Turf Field", description: "10,000 sq ft of indoor turf", image: indoorFieldImg },
    { title: "Field and Scoreboard", description: "Turf field with the overhead scoreboard", image: turfFieldScoreboardImg.url },
    { title: "Base on the Turf", description: "Ready for your next indoor practice", image: turfFieldBaseImg.url },
    { title: "Indoor Turf Base", description: "Practice all winter, rain or shine", image: turfFieldBase2Img.url },
    { title: "Turf Training", description: "Training on the turf", image: turfTrainingImg },
  ] },
  { title: "Batting Cages", subtitle: "8 batting cages", photos: [
    { title: "Batter in the Cage", description: "Ready in the box", image: cageBatterStanceImg.url },
    { title: "Cage and Tee", description: "Hitting off the tee", image: battingCageTeeImg },
    { title: "Batting Cages", description: "8 cages for hitting practice", image: battingCagesImg },
    { title: "Down the Cage Lane", description: "Hitting lanes under one roof", image: cageLaneViewImg.url },
    { title: "Tees on the Turf", description: "Tees set for your next session", image: cageTeeLanesImg.url },
    { title: "Tee and Ball", description: "Set up and ready to hit", image: cageTeeBallImg.url },
    { title: "Home Plate View", description: "Looking down the hitting lane", image: cageHomePlateImg.url },
    { title: "Hitting Lesson", description: "Coach and batter in the cage", image: cageCoachLessonImg.url },
    { title: "Ready in the Box", description: "Helmet on, gloves on, bat up", image: cageBatterReadyImg.url },
    { title: "Coach at the Screen", description: "Live work off the L-screen", image: cageCoachScreenImg.url },
    { title: "Tee Session", description: "Tee work with a coach", image: cageTeeCoachImg.url },
    { title: "Netted Hitting Lane", description: "Enclosed lanes for safe hitting", image: cageLScreenImg.url },
  ] },
  { title: "Rapsodo", subtitle: "Rapsodo Technology", photos: [
    { title: "Rapsodo Device", description: "Instant data on every rep", image: rapsodoDeviceImg },
    { title: "Rapsodo", description: "Pitch and hit tracking", image: rapsodoImg },
    { title: "Rapsodo on the Turf", description: "The tracking unit set up on the field", image: rapsodoUnitImg.url },
    { title: "Rapsodo Tracking Unit", description: "Every pitch and swing, measured", image: rapsodoUnitFrontImg.url },
    { title: "Rapsodo on the Big Screen", description: "Exit velocity, launch angle and distance live", image: rapsodoLiveScreenImg.url },
  ] },
  { title: "Pitching Tunnel", subtitle: "Pitching Tunnel", photos: [
    { title: "Strike Zone Target", description: "Pitching lane with a strike zone target", image: cageStrikeZoneImg.url },
    { title: "Pitching Tunnel", description: "Dedicated pitching lane", image: pitchingLaneImg },
    { title: "Catcher at the Target", description: "Full gear behind the plate", image: pitchCatcherImg.url },
    { title: "The Pitching Rubber", description: "Your spot on the mound", image: pitchRubberImg.url },
    { title: "Down the Lane", description: "Targets waiting at the far end", image: pitchLaneImg.url },
    { title: "From the Mound", description: "Work down the tunnel", image: pitchLane2Img.url },
    { title: "Catcher Target Net", description: "Location work on a hanging target", image: pitchTargetNetImg.url },
    { title: "Pitching Machine", description: "Reps on command", image: pitchMachineImg.url },
    { title: "Numbered Strike Zone", description: "Six zones to hit your spots", image: pitchZoneBannerImg.url },
  ] },
  { title: "HitTrax", subtitle: "HitTrax Technology", photos: [
    { title: "HitTrax Screen", description: "Exit velocity and distance", image: hittraxScreenImg },
    { title: "HitTrax Technology", description: "Data-driven hitting improvement", image: hittrax1Img },
    { title: "HitTrax Session", description: "Real-time performance metrics", image: hittrax2Img },
  ] },
  { title: "Weight Room", subtitle: "Weight Room", photos: [
    { title: "Train strong all year", description: "Train strong all year", image: weightRoom2Img },
    { title: "Weight Room", description: "Strength and conditioning", image: weightRoom1Img },
  ] },
];

function PhotoStrip({ photos, area, onOpen }: { photos: GalleryPhoto[]; area: string; onOpen: (index: number) => void }) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = stripRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollStep = (dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollable = !atStart || !atEnd;

  return (
    <div className="animate-fade-in border-t-4 border-primary bg-secondary px-3 py-4 sm:px-5">
      <div className="relative">
        <div
          ref={stripRef}
          onScroll={sync}
          tabIndex={0}
          aria-label={`${area} photos`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollStep(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollStep(-1); }
          }}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-primary [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50"
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); scrollStep(1); }
                if (e.key === "ArrowLeft") { e.preventDefault(); scrollStep(-1); }
              }}
              aria-label={`Open ${photo.title}`}
              className="group aspect-[4/3] w-[85%] shrink-0 snap-start overflow-hidden rounded-lg ring-1 ring-border"
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
        {scrollable && (
          <>
            <button
              type="button"
              onClick={() => scrollStep(-1)}
              disabled={atStart}
              aria-label={`Show earlier ${area} photos`}
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg transition-opacity hover:bg-primary/80 disabled:cursor-default disabled:opacity-25 sm:left-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollStep(1)}
              disabled={atEnd}
              aria-label={`Show more ${area} photos`}
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg transition-opacity hover:bg-primary/80 disabled:cursor-default disabled:opacity-25 sm:right-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {scrollable && (
        <p className="mt-2 text-center font-heading text-[11px] uppercase tracking-widest text-secondary-foreground/50">
          Swipe or use the arrows to see more
        </p>
      )}
    </div>
  );
}

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

  const [viewerPhotos, setViewerPhotos] = useState<GalleryPhoto[]>([]);
  const photos = viewerPhotos;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [openIndex]);

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

  const openPhoto = (index: number, list: GalleryPhoto[] = dbPhotos, area = "Gallery") => {
    setViewerPhotos(list.map((photo) => ({ ...photo, area })));
    setOpenIndex(index);
  };
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

      {/* Facility Cards */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">
            Our <span className="text-primary">Facilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {facilityCards.map((card) => {
              const isOpen = expanded === card.title;
              const [cover, ...rest] = card.photos;
              return (
                <div key={card.title} className="bg-card rounded-lg overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => openPhoto(0, card.photos, card.title)}
                    aria-label={`Open ${card.title}`}
                    className="block w-full aspect-[4/3] overflow-hidden group"
                  >
                    <img src={cover.image} alt={cover.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </button>
                  <div className="p-5">
                    <h3 className="font-heading text-2xl uppercase">{card.title}</h3>
                    <p className="text-primary font-heading uppercase text-sm tracking-wider">{card.subtitle}</p>
                    <Button variant="hero" size="lg" asChild className="mt-4 w-full">
                      <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" aria-label={`Schedule online for ${card.title}`}>
                        <CalendarCheck />
                        Schedule Online
                      </a>
                    </Button>
                    {rest.length > 0 && (
                      <Button variant="outline" size="lg" className="mt-2 w-full font-heading uppercase tracking-wider hover:bg-muted hover:text-foreground" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : card.title)}>
                        {isOpen ? "Show less" : `Click to see more (${rest.length})`}
                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </Button>
                    )}
                  </div>
                  {isOpen && (
                    <PhotoStrip
                      photos={rest}
                      area={card.title}
                      onOpen={(i) => openPhoto(i + 1, card.photos, card.title)}
                    />
                  )}
                </div>
              );
            })}
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
          className="fixed inset-0 z-[100] flex flex-col bg-secondary"
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
              className="max-h-[62vh] max-w-full rounded-lg object-contain"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary/80 md:left-6 md:p-4"
                >
                  <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary/80 md:right-6 md:p-4"
                >
                  <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pb-3 pt-3 text-center" onClick={(event) => event.stopPropagation()}>
            <span className="inline-block rounded-full bg-primary px-3 py-1 font-heading text-xs uppercase tracking-widest text-primary-foreground">
              {activePhoto.area || "Gallery"}
            </span>
            <p className="mt-2 font-heading text-lg uppercase text-secondary-foreground">{activePhoto.title}</p>
            {activePhoto.description && (
              <p className="mt-1 text-sm text-secondary-foreground/60">{activePhoto.description}</p>
            )}
          </div>

          {photos.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto px-4 pb-5 pt-1"
              onClick={(event) => event.stopPropagation()}
            >
              {photos.map((photo, index) => {
                const isActive = index === openIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    ref={isActive ? activeThumbRef : undefined}
                    onClick={() => setOpenIndex(index)}
                    aria-label={`View ${photo.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`shrink-0 cursor-pointer overflow-hidden rounded-md transition-opacity ${
                      isActive ? "ring-2 ring-primary" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.image}
                      alt=""
                      loading="lazy"
                      className="h-14 w-20 object-cover sm:h-16 sm:w-24"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
