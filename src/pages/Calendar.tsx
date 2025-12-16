import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { useState } from "react";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsThisMonth = events.filter(event => 
    isSameMonth(parseISO(event.event_date), currentMonth)
  );

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(parseISO(event.event_date), day));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Upcoming Events</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Events <span className="text-primary">Calendar</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Stay up to date with camps, clinics, tournaments, and special events happening at The Grind.
          </p>
        </div>
      </section>

      {/* Calendar View */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Month Navigation */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <button 
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <h2 className="font-heading text-2xl uppercase">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <button 
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 border-b border-border">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-3 min-h-[100px] bg-muted/30" />
                  ))}
                  
                  {daysInMonth.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <div 
                        key={day.toISOString()} 
                        className={`p-2 min-h-[100px] border-r border-b border-border ${isToday ? 'bg-primary/10' : ''}`}
                      >
                        <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                          {format(day, 'd')}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div 
                              key={event.id} 
                              className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate"
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events List */}
            <div>
              <h3 className="font-heading text-xl uppercase mb-4">Upcoming Events</h3>
              
              {isLoading ? (
                <p className="text-muted-foreground">Loading events...</p>
              ) : eventsThisMonth.length === 0 ? (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No events scheduled this month.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon or contact us for more info!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventsThisMonth.map(event => (
                    <div key={event.id} className="bg-card border border-border rounded-lg p-4 card-hover">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 rounded-lg p-2 text-center min-w-[50px]">
                          <span className="text-primary font-heading text-lg block">
                            {format(parseISO(event.event_date), 'd')}
                          </span>
                          <span className="text-primary text-xs uppercase">
                            {format(parseISO(event.event_date), 'MMM')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading text-lg">{event.title}</h4>
                          {event.start_time && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {event.start_time}{event.end_time && ` - ${event.end_time}`}
                            </p>
                          )}
                          {event.location && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          )}
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                          )}
                          {event.registration_url && (
                            <a 
                              href={event.registration_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary font-medium mt-2 inline-flex items-center gap-1 hover:underline"
                            >
                              Register Now <ArrowRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Book Your <span className="text-primary">Session</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Can't find what you're looking for? Schedule a private lesson or cage rental online.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
