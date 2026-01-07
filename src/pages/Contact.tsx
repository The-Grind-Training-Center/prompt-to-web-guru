import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Get In Touch</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Have questions? Want to schedule a tour? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="font-heading text-3xl uppercase mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Address</h3>
                    <a 
                      href="https://maps.google.com/?q=8001+NW+50th,+OKC,+OK+73132" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      8001 NW 50th<br />
                      Oklahoma City, OK 73132
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Phone</h3>
                    <a 
                      href="tel:405-495-7800"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      405-495-7800
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Email</h3>
                    <a 
                      href="mailto:contact@thegrindsports.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contact@thegrindsports.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Thursday: 3pm - 9pm<br />
                      Friday: 2pm - 8pm<br />
                      Saturday: 10am - 5pm<br />
                      Sunday: 11am - 8pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="hero" size="xl" asChild>
                  <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Schedule Online
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Map */}
            <div className="bg-muted rounded-lg overflow-hidden h-96 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.5!2d-97.58!3d35.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMxJzEyLjAiTiA5N8KwMzQnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Grind Training Center Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
