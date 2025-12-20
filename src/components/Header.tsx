import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Facilities", path: "/facilities" },
  { name: "Services", path: "/services" },
  { name: "Camps", path: "/camps" },
  { name: "Staff", path: "/coaches" },
  { name: "Calendar", path: "/calendar" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const PRO_SHOP_URL = "https://grindproshop.myshopify.com/";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-secondary">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="The Grind Training Center" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-6 mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-sm xl:text-base uppercase tracking-wider transition-colors whitespace-nowrap ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-secondary-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={PRO_SHOP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-heading text-sm xl:text-base uppercase tracking-wider text-secondary-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              Pro Shop
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a href="tel:405-495-7800" className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors whitespace-nowrap">
              <Phone className="h-4 w-4" />
              <span className="font-medium text-sm">405-495-7800</span>
            </a>
            <Button variant="hero" size="sm" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-secondary-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-secondary">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-sm uppercase tracking-wider py-2 transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-secondary-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={PRO_SHOP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-heading text-sm uppercase tracking-wider py-2 text-secondary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pro Shop
              </a>
              <a href="tel:405-495-7800" className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors py-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium">405-495-7800</span>
              </a>
              <Button variant="hero" size="lg" className="mt-2" asChild>
                <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  Schedule Online
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
