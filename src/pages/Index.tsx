import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Dumbbell, Calendar, Clock, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "@/assets/facilities/indoor-field.jpg";
import rapsodoImg from "@/assets/rapsodo.jpg";
// Slideshow images
import instructorsImg from "@/assets/slideshow/instructors.jpg";
import facilityExteriorImg from "@/assets/slideshow/facility-exterior.jpg";
import trainingActionImg from "@/assets/flyers/training-action.jpg";
import indoorFieldImg from "@/assets/facilities/indoor-field.jpg";
import battingCagesImg from "@/assets/facilities/batting-cages.jpg";
import weightRoomImg from "@/assets/facilities/weight-room-1.jpg";

const slideshowImages = [
  { src: indoorFieldImg, caption: "10,000 sq ft Indoor Turf Field" },
  { src: instructorsImg, caption: "Expert Coaching Staff" },
  { src: battingCagesImg, caption: "8 Batting Cages" },
  { src: trainingActionImg, caption: "Training in Action" },
  { src: weightRoomImg, caption: "Full Weight Room" },
  { src: facilityExteriorImg, caption: "The Grind Training Center" },
];

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";
const NEWSLETTER_URL = "https://thegrindtrainingcenter.beehiiv.com/subscribe";

const features = [
  {
    icon: Target,
    title: "20,000 Sq Ft",
    description: "Premium indoor turf training space for all sports",
  },
  {
    icon: Users,
    title: "Expert Coaches",
    description: "Learn from MLB veterans and certified trainers",
  },
  {
    icon: Dumbbell,
    title: "Full Equipment",
    description: "HitTrax, batting cages, pitching lab & weight room",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Easy online scheduling for lessons and rentals",
  },
];

const services = [
  {
    title: "Private Lessons",
    description: "One-on-one training with expert coaches tailored to your skill level.",
    link: "/services",
  },
  {
    title: "Group Training",
    description: "Team workouts and group sessions for competitive edge.",
    link: "/services",
  },
  {
    title: "Camps & Clinics",
    description: "Seasonal programs for skill development and game prep.",
    link: "/camps",
  },
  {
    title: "Facility Rentals",
    description: "Book cages and turf space for team practice.",
    link: "/services",
  },
];

const winterHours = [
  { day: "Monday", hours: "3–9 PM" },
  { day: "Tuesday–Thursday", hours: "3–9 PM" },
  { day: "Friday", hours: "2–8 PM" },
  { day: "Saturday", hours: "10–5 PM" },
  { day: "Sunday", hours: "11–8 PM" },
];

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        {/* Overlay with dynamic opacity */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-secondary/90"
          style={{
            opacity: Math.min(1, 0.7 + scrollY * 0.001)
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl uppercase text-secondary-foreground mb-6 animate-fade-in">
            Train Harder.<br />
            <span className="text-primary">Get Better.</span><br />
            Grind Strong.
          </h1>
          <p className="text-xl sm:text-2xl text-secondary-foreground/90 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            20,000 sq. ft. Athletic Training Facility — Baseball, Softball, Soccer & More
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/camps">
                Camps & Clinics
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator - Baseball */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-8 h-8 bg-secondary-foreground rounded-full animate-bounce shadow-lg relative">
            {/* Baseball stitching */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
              {/* Left stitching curve */}
              <path 
                d="M8 6 Q4 16 8 26" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5" 
                fill="none"
                strokeLinecap="round"
              />
              {/* Left stitch marks */}
              <path d="M6 9 L9 10 M5 12 L8 13 M5 16 L8 16 M5 20 L8 19 M6 23 L9 22" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
              {/* Right stitching curve */}
              <path 
                d="M24 6 Q28 16 24 26" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5" 
                fill="none"
                strokeLinecap="round"
              />
              {/* Right stitch marks */}
              <path d="M26 9 L23 10 M27 12 L24 13 M27 16 L24 16 M27 20 L24 19 M26 23 L23 22" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-secondary-foreground/50 text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Announcements & Hours */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* EPIC Charter School Announcement */}
            <div className="bg-primary-foreground/10 rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="h-6 w-6 shrink-0" />
                <h3 className="font-heading text-2xl uppercase">Huge News!</h3>
              </div>
              <p className="text-lg mb-4">
                <strong>The Grind Training Center is now an Approved Vendor with EPIC Charter School!</strong> ✨
              </p>
              <p className="text-primary-foreground/80 mb-4">
                That means you can use your EPIC funds to train, grow, and have fun at our top-notch facility! 
                Whether you're looking to level up your skills, stay active, or try something new—we've got you covered!
              </p>
              <p className="font-semibold">
                Book your spot today! Call us at 405-495-7800!
              </p>
            </div>

            {/* Rapsodo Technology */}
            <div className="bg-primary-foreground/10 rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-start gap-3 mb-4">
                <Target className="h-6 w-6 shrink-0" />
                <h3 className="font-heading text-2xl uppercase">New Tech!</h3>
              </div>
              <p className="text-lg mb-4">
                <strong>Rapsodo Baseball Technology Now Available!</strong> ⚾
              </p>
              <p className="text-primary-foreground/80 mb-4">
                Data-driven. Game-proven. Our new Rapsodo technology provides real-time analytics for pitching and hitting to help take your game to the next level!
              </p>
              <img 
                src={rapsodoImg} 
                alt="Rapsodo baseball technology at The Grind Training Center" 
                className="rounded-lg w-full h-32 object-cover"
              />
            </div>

            {/* Summer Hours */}
            <div className="bg-primary-foreground/10 rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl uppercase">Winter Hours</h3>
                </div>
              </div>
              <div className="space-y-2">
                {winterHours.map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span className="text-primary-foreground/80">{item.day}</span>
                    <span className="font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/70 mt-4">
                Need something outside those hours? Book ahead — we're flexible!
              </p>
              <div className="mt-4 flex gap-3">
                <Button variant="heroOutline" size="sm" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Schedule Online
                  </a>
                </Button>
                <Button variant="heroOutline" size="sm" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
                    Newsletter
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-6 shadow-brand-sm card-hover text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl uppercase mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">About Us</span>
              <h2 className="font-heading text-4xl sm:text-5xl uppercase mb-6">
                Oklahoma City's Premier<br />
                <span className="text-primary">Training Facility</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The Grind Training Center offers 20,000 sq. ft. of turf space that includes 8 batting cages (5 at 55ft and 2 at 60-65ft), a pitching lab, 
                weight room, and a beautiful 10,000 sq. ft. indoor turf field that can accommodate everything from baseball, 
                softball, soccer, lacrosse, and football classes/clinics and practices.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We have countless events, including consulting resources to help rehab injured players, college preparation 
                education, mental aspects training, and much more. We are the one-stop shop for sports training in Oklahoma.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-8 text-center text-secondary-foreground">
                <span className="font-heading text-5xl text-primary block mb-2">20K</span>
                <span className="text-sm uppercase tracking-wider">Sq. Ft. Space</span>
              </div>
              <div className="bg-secondary rounded-lg p-8 text-center text-secondary-foreground">
                <span className="font-heading text-5xl text-primary block mb-2">10+</span>
                <span className="text-sm uppercase tracking-wider">Expert Coaches</span>
              </div>
              <div className="bg-secondary rounded-lg p-8 text-center text-secondary-foreground">
                <span className="font-heading text-5xl text-primary block mb-2">8</span>
                <span className="text-sm uppercase tracking-wider">Batting Cages</span>
              </div>
              <div className="bg-secondary rounded-lg p-8 text-center text-secondary-foreground">
                <span className="font-heading text-5xl text-primary block mb-2">∞</span>
                <span className="text-sm uppercase tracking-wider">Potential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">What We Offer</span>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase">
              Our <span className="text-primary">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-lg p-6 hover:bg-secondary-foreground/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <h3 className="font-heading text-xl uppercase mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-secondary-foreground/70 text-sm mb-4">{service.description}</p>
                <span className="text-primary font-semibold text-sm flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Book Your Session Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Slideshow */}
      <section className="py-8 bg-muted">
        <div className="container-wide mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Slides */}
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              {slideshowImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-secondary-foreground font-heading text-lg md:text-2xl uppercase">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-secondary/70 hover:bg-secondary p-2 md:p-3 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-secondary-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-secondary/70 hover:bg-secondary p-2 md:p-3 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-secondary-foreground" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {slideshowImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-secondary-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl sm:text-5xl uppercase mb-6">
            Ready to Start Your Training?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
            Join hundreds of athletes who have improved their game at The Grind. 
            Book your first session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Online
              </a>
            </Button>
            <Button variant="default" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
