import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="The Grind Training Center" className="h-20 w-auto mb-4" />
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Oklahoma City's premier 20,000 sq. ft. athletic training facility for baseball, softball, soccer, and all sports.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg uppercase tracking-wider mb-4 text-primary">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</Link>
              <Link to="/facilities" className="text-secondary-foreground/80 hover:text-primary transition-colors">Facilities</Link>
              <Link to="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Services</Link>
              <Link to="/coaches" className="text-secondary-foreground/80 hover:text-primary transition-colors">Coaches</Link>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary transition-colors">Schedule Online</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg uppercase tracking-wider mb-4 text-primary">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="https://maps.google.com/?q=8001+NW+50th,+OKC,+OK+73132" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>8001 NW 50th<br />OKC, OK 73132</span>
              </a>
              <a href="tel:405-495-7800" className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>405-495-7800</span>
              </a>
              <a href="mailto:contact@thegrindsports.com" className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>contact@thegrindsports.com</span>
              </a>
            </div>
          </div>

          {/* Social & Policies */}
          <div>
            <h4 className="font-heading text-lg uppercase tracking-wider mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/thegrindsportstraining/" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/10 hover:bg-primary p-3 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/thegrindtrainingcenter?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/10 hover:bg-primary p-3 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@thegrindtrainingcenter" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/10 hover:bg-primary p-3 rounded-full transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <Link to="/policies" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
              Cancellation Policy
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} The Grind Training Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
