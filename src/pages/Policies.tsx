import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export default function Policies() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Important Info</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Policies & <span className="text-primary">Guidelines</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Please review our policies before booking your session.
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-3xl">
          {/* Cancellation Policy */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl uppercase mb-2">Cancellation Policy</h2>
                <p className="text-muted-foreground">Important information about canceling or rescheduling</p>
              </div>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">48-Hour Notice Required:</strong> All cancellations and reschedule requests must be made at least 48 hours before your scheduled session.
              </p>
              <p>
                <strong className="text-foreground">Credit for Valid Cancellations:</strong> When you cancel within the policy window (48+ hours notice), you will receive credit that can be applied toward a future session.
              </p>
              <p>
                <strong className="text-foreground">Late Cancellations:</strong> Cancellations made less than 48 hours before your session may result in forfeiture of the session fee. We understand emergencies happen - please contact us to discuss your situation.
              </p>
              <p>
                <strong className="text-foreground">No-Shows:</strong> Failure to arrive for a scheduled session without notice will result in forfeiture of the session fee.
              </p>
            </div>
          </div>

          {/* General Policies */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl uppercase mb-6">General Policies</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>All athletes must wear appropriate athletic attire and footwear suitable for indoor turf.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>No metal cleats allowed on indoor turf surfaces.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Athletes under 18 must have a parent/guardian sign a waiver before training.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Please arrive 5-10 minutes before your scheduled session to warm up.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>No food or drinks (except water) allowed in training areas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>The Grind Training Center is not responsible for lost or stolen items.</span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="font-heading text-2xl uppercase mb-6">Payment Information</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Payment is due at the time of booking unless other arrangements have been made.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>We accept all major credit cards and cash payments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Package deals and monthly memberships may be available - ask for details.</span>
              </li>
            </ul>
          </div>

          {/* Questions */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Have questions about our policies? We're happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  Schedule Online
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="dark" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
