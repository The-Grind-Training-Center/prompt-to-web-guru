import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from "lucide-react";
import { format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parseISO, getDay } from "date-fns";
import { useState, useMemo } from "react";
import pokerTournamentFlyer from "@/assets/flyers/poker-tournament.png";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

// Event types for recurring events
type RecurringEvent = {
  title: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  registrationUrl: string;
};

// Static events for specific dates
type StaticEvent = {
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  registrationUrl: string;
  image?: string;
  description?: string;
};

// Recurring weekly events from the Grind calendar
const recurringEvents: RecurringEvent[] = [
  // Monday - Winter Workout Program
  {
    title: "Winter Workout Program",
    dayOfWeek: 1, // Monday
    startTime: "5:30 PM",
    endTime: "8:30 PM",
    location: "The Grind Training Center",
    type: "Training",
    registrationUrl: "https://leagueapps.com/leagues/5131587"
  },
  // Tuesday - Little Big Leaguer + HitTrax BP
  {
    title: "Little Big Leaguer Program",
    dayOfWeek: 2, // Tuesday
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    location: "The Grind Training Center",
    type: "Youth Program",
    registrationUrl: "https://leagueapps.com/leagues/5110604"
  },
  {
    title: "HitTrax BP",
    dayOfWeek: 2, // Tuesday
    startTime: "7:00 PM",
    endTime: "7:30 PM",
    location: "The Grind Training Center",
    type: "Training",
    registrationUrl: "https://leagueapps.com/leagues/5110612"
  },
  // Wednesday - Speed & Agility
  {
    title: "Speed & Agility Class",
    dayOfWeek: 3, // Wednesday
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    location: "The Grind Training Center",
    type: "Training",
    registrationUrl: "https://leagueapps.com/leagues/5053124"
  },
  // Thursday - Little Big Leaguer + Big Leaguer
  {
    title: "Little Big Leaguer Program",
    dayOfWeek: 4, // Thursday
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    location: "The Grind Training Center",
    type: "Youth Program",
    registrationUrl: "https://leagueapps.com/leagues/5110604"
  },
  {
    title: "Big Leaguer Program",
    dayOfWeek: 4, // Thursday
    startTime: "7:00 PM",
    endTime: "8:00 PM",
    location: "The Grind Training Center",
    type: "Training",
    registrationUrl: "https://leagueapps.com/leagues/5110608"
  },
  // Sunday - Speed & Agility + Infield Clinic
  {
    title: "Wimmer and Walton Weekly Infield",
    dayOfWeek: 0, // Sunday
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    location: "The Grind Training Center",
    type: "Clinic",
    registrationUrl: "https://leagueapps.com/leagues/5051654"
  },
  {
    title: "Speed & Agility Class",
    dayOfWeek: 0, // Sunday
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    location: "The Grind Training Center",
    type: "Training",
    registrationUrl: "https://leagueapps.com/leagues/5053124"
  },
];

// Special events for specific dates
const staticEvents: StaticEvent[] = [
  {
    title: "Santa Hitting Clinic",
    date: "2025-12-22",
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    location: "The Grind Training Center",
    type: "Special Event",
    registrationUrl: "https://leagueapps.com/camps/4600306-santa-hitting-clinic"
  },
  {
    title: "Poker Tournament",
    date: "2026-01-10",
    startTime: "6:30 PM",
    endTime: "",
    location: "The Grind Training Center",
    type: "Special Event",
    registrationUrl: "https://thegrindtrainingcenter.leagueapps.com/events/4811606-holiday-poker-tournament-2026",
    image: pokerTournamentFlyer,
    description: "Doors open at 6:00pm. $45 per person. Prizes, food, silent auction & more!"
  },
  {
    title: "Indoor Softball Tournament (6U-8U)",
    date: "2026-01-24",
    startTime: "All Day",
    endTime: "",
    location: "The Grind Training Center",
    type: "Tournament",
    registrationUrl: "https://leagueapps.com/camps/4600309-indoor-baseball-tournament-6u-8u",
    description: "6U-8U Coach Pitch. First 6 teams to register. $85 team entry fee."
  },
  {
    title: "Indoor Softball Tournament (6U-8U)",
    date: "2026-01-25",
    startTime: "All Day",
    endTime: "",
    location: "The Grind Training Center",
    type: "Tournament",
    registrationUrl: "https://leagueapps.com/camps/4600309-indoor-baseball-tournament-6u-8u",
    description: "6U-8U Coach Pitch. First 6 teams to register. $85 team entry fee."
  },
];

type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  registrationUrl: string;
  image?: string;
  description?: string;
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Generate all events for the current month
  const events = useMemo(() => {
    const allEvents: CalendarEvent[] = [];
    
    // Generate recurring events for each day in the month
    daysInMonth.forEach(day => {
      const dayOfWeek = getDay(day);
      
      recurringEvents
        .filter(event => event.dayOfWeek === dayOfWeek)
        .forEach((event, index) => {
          allEvents.push({
            id: `${format(day, 'yyyy-MM-dd')}-${event.title}-${index}`,
            title: event.title,
            date: day,
            startTime: event.startTime,
            endTime: event.endTime,
            location: event.location,
            type: event.type,
            registrationUrl: event.registrationUrl,
          });
        });
    });

    // Add static events that fall within this month
    staticEvents.forEach((event, index) => {
      const eventDate = parseISO(event.date);
      if (isSameMonth(eventDate, currentMonth)) {
        allEvents.push({
          id: `static-${event.date}-${index}`,
          title: event.title,
          date: eventDate,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          type: event.type,
          registrationUrl: event.registrationUrl,
          image: event.image,
          description: event.description,
        });
      }
    });

    return allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [currentMonth, daysInMonth]);

  const eventsThisMonth = events;

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "Training":
        return "bg-primary/20 text-primary";
      case "Youth Program":
        return "bg-green-500/20 text-green-600";
      case "Clinic":
        return "bg-blue-500/20 text-blue-600";
      case "Tournament":
        return "bg-orange-500/20 text-orange-600";
      case "Special Event":
        return "bg-purple-500/20 text-purple-600";
      default:
        return "bg-primary/20 text-primary";
    }
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

      {/* Legend */}
      <section className="py-4 border-b border-border">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-primary/50"></span>
              Training
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
              Youth Program
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-blue-500/50"></span>
              Clinic
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-orange-500/50"></span>
              Tournament
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-purple-500/50"></span>
              Special Event
            </span>
          </div>
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
                    className="p-2 hover:bg-muted rounded-lg transition-colors font-bold text-xl"
                  >
                    ←
                  </button>
                  <h2 className="font-heading text-2xl uppercase">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <button 
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 hover:bg-muted rounded-lg transition-colors font-bold text-xl"
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
                          {dayEvents.slice(0, 3).map(event => (
                            <div 
                              key={event.id} 
                              className={`text-xs px-1 py-0.5 rounded truncate ${getEventColor(event.type)}`}
                              title={`${event.title} - ${event.startTime}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</span>
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
              <h3 className="font-heading text-xl uppercase mb-4">Events This Month</h3>
              
              {eventsThisMonth.length === 0 ? (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No events scheduled this month.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {eventsThisMonth.map(event => (
                    <a 
                      key={event.id} 
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border rounded-lg overflow-hidden card-hover block group cursor-pointer"
                    >
                      {event.image && (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/20 rounded-lg p-2 text-center min-w-[45px]">
                            <span className="text-primary font-heading text-lg block leading-none">
                              {format(event.date, 'd')}
                            </span>
                            <span className="text-primary text-xs uppercase">
                              {format(event.date, 'MMM')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-sm leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                            {event.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              {event.startTime}{event.endTime && ` - ${event.endTime}`}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`inline-block text-xs px-2 py-0.5 rounded ${getEventColor(event.type)}`}>
                                {event.type}
                              </span>
                              <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Register <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
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
