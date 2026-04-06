import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, BarChart3, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";

export default function Technology() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Technology</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Train Smarter with <span className="text-primary">Data</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto mb-8">
            At The Grind, every session is powered by real-time analytics. See your results, make adjustments, and leave with direction — not just reps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/memberships">
                View Memberships
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What a Session Looks Like */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="h-8 w-8" />
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase mb-6">
              What a Session <span className="text-primary">Looks Like</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              When you walk in, it's not just about getting swings or throwing.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-brand-sm">
              <h3 className="font-heading text-xl uppercase mb-4">You'll:</h3>
              <ul className="space-y-3 text-muted-foreground text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  See real feedback after every rep
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  Understand what's working and what's not
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  Make adjustments right away
                </li>
              </ul>
              <p className="mt-6 text-lg font-semibold">
                You leave with more than reps — you leave with <span className="text-primary">direction</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HitTrax Hitting Sessions */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <BarChart3 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl uppercase">
                  HitTrax <span className="text-primary">Hitting Sessions</span>
                </h2>
                <p className="text-muted-foreground text-lg">See Your Swing in Real Time</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              HitTrax lets you see exactly what happens every time you make contact.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">During Your Session:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Track exit velocity, launch angle, and distance
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Watch your ball flight instantly on screen
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Hit in a game-like environment
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">What That Does for You:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Helps you square the ball up more consistently
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Builds power and better contact
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Gives you confidence because you can actually see results
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rapsodo Hitting Sessions */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 text-primary">
                <Target className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl uppercase">
                  Rapsodo <span className="text-primary">Hitting Sessions</span>
                </h2>
                <p className="text-secondary-foreground/80 text-lg">Understand Your Swing — Not Just Your Result</p>
              </div>
            </div>

            <p className="text-lg text-secondary-foreground/80 mb-6">
              Rapsodo breaks down what's happening at contact so you can make real adjustments.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">During Your Session:</h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Track key hitting metrics and ball flight data
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    See how your swing translates to performance
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Make small changes and see the difference immediately
                  </li>
                </ul>
              </div>
              <div className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">What That Does for You:</h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Cleaner, more repeatable swing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Better understanding of your mechanics
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    More consistent results at the plate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rapsodo Pitching Sessions */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <Target className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl uppercase">
                  Rapsodo <span className="text-primary">Pitching Sessions</span>
                </h2>
                <p className="text-muted-foreground text-lg">Turn Every Pitch into Feedback</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              Every bullpen becomes a chance to learn something.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">During Your Session:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Track velocity, spin rate, and movement
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    See pitch location and effectiveness
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Adjust and immediately see the results
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading text-xl uppercase mb-4">What That Does for You:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Better command
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Improved pitch movement
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    Confidence knowing your pitches work
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Rocket className="h-8 w-8" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase mb-6">
            Ready to Get Work In?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            If you're going to train, make it count.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/memberships">
                View Memberships
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
