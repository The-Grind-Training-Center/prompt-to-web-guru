import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Coach images
import chrisWimmerImg from "@/assets/coaches/chris-wimmer.jpg";
import shaneBaileyImg from "@/assets/coaches/shane-bailey.jpg";
import mickeyTettletonImg from "@/assets/coaches/mickey-tettleton.jpg";
import antonShinhosterImg from "@/assets/coaches/anton-shinhoster.jpg";
import leonJoyceImg from "@/assets/coaches/leon-joyce.jpg";
import edwinSedaImg from "@/assets/coaches/edwin-seda.jpg";
import paigeSechistImg from "@/assets/coaches/paige-sechrist.jpg";
import kyleKingImg from "@/assets/coaches/kyle-king.png";
import ethanFlahertyImg from "@/assets/coaches/ethan-flaherty.jpg";
import tannerHollimanImg from "@/assets/coaches/tanner-holliman.jpg";
import prestonEasleyImg from "@/assets/coaches/preston-easley.png";

const SCHEDULE_URL = "https://www.esoftplanner.com/v3/planner/login.php?access=0dG81LSVxNmo65axzWx9u5yFpg==";

const coaches = [
  {
    name: "Chris Wimmer",
    title: "Hitting & Fielding Instructor",
    positions: ["Hitting", "Fielding", "Baserunning", "Speed/Agility", "Recruiting Resource"],
    highlights: [
      "3 Time All-American at Wichita State University",
      "2 Time Team USA, Member of 1991 Pan American Team",
      "Member of 1992 Olympic Team (Barcelona, Spain)",
      "7 Year Professional career: Giants, Cardinals, Pirates",
      "8 Years MLB Scout (Detroit Tigers)",
      "15+ years MLB Agent",
      "6 years coaching/player development at Showcase level"
    ],
    bio: "Chris has had an outstanding baseball career. He has been named an All-American 3 times. He played in the Pan-American games in Havana, Cuba in 1991, helping the USA team bring home a Bronze Medal. Chris played in 1992 Olympics in Barcelona, Spain and was drafted by the San Francisco Giants. While playing for the MLB, he played 6 different positions (2B, 3B, SS, LF, CF, RF) for four different teams. Chris has been named in the Wichita Sports Hall of Fame, Kansas Sports Hall of Fame, and Wichita State Hall of Fame.",
    image: chrisWimmerImg
  },
  {
    name: "Shane Bailey",
    title: "Pitching & Hitting Coach",
    positions: ["Hitting", "Fielding", "Pitching", "Catching"],
    highlights: [
      "30+ years of Coaching Experience",
      "Has worked with 300+ players who have gone into college ball",
      "Lead Instructor for 11 years",
      "Coached at Westmont High School in California"
    ],
    bio: "Shane brings more than 30 years of coaching experience to The Grind. After college he began his coaching career as the infield and hitting coach at New Mexico Junior College and De Anza College. He then went on to coach at his alma mater Westmont High School in California, where he compiled an impressive 62-5 record. He has coached at all levels in baseball and softball, from tee-ball to Division I and the Major Leagues.",
    image: shaneBaileyImg
  },
  {
    name: "Mickey Tettleton",
    title: "Hitting & Catching Instructor",
    positions: ["Hitting", "Fielding", "Catching"],
    highlights: [
      "Former MLB Catcher (14 seasons)",
      "Two-time All-Star",
      "Three-time Silver Slugger Award winner",
      "8th all-time in home runs by a switch-hitter (at retirement)",
      ".369 career on-base percentage (10th all-time among MLB catchers)"
    ],
    bio: "Mickey Tettleton is a former Major League Baseball catcher who played for the Oakland Athletics, Baltimore Orioles, Detroit Tigers, and Texas Rangers. A standout at Oklahoma State University, Tettleton went on to enjoy a highly successful MLB career spanning over a decade. Known for his keen eye at the plate, he brings elite-level experience to every lesson.",
    image: mickeyTettletonImg
  },
  {
    name: "Anton Shinhoster",
    title: "Baseball/Softball Instructor",
    positions: ["Hitting", "Fielding", "Pitching"],
    highlights: [
      "14 Years of coaching experience",
      "Division I College Baseball Player (Jackson State)",
      "1st team all SWAC",
      "Nationally ranked 10th in triples per game (2005)",
      "Master's degree in Business Administration"
    ],
    bio: "Anton has been with The Grind since the facility opened its doors. He played baseball in college as a left fielder at Jackson State University, where he helped lead his team to three SWAC tournament appearances. In 2005 he was named First-Team All-SWAC and was selected for the Blackcollegbaseball.com Elite Team. After his playing career he served as an assistant baseball coach at Jackson State University.",
    image: antonShinhosterImg
  },
  {
    name: "Leon Joyce",
    title: "Hitting & Fielding Instructor",
    positions: ["Hitting", "Fielding"],
    highlights: [
      "4-year collegiate starter (SS, 3B, 2B)",
      "Freshman of the Year at Marymount College (NAIA)",
      "Newcomer of the Year at Cloud County CC",
      "All-District at Benedictine College",
      "30+ years of baseball/softball instruction",
      "10 years varsity baseball coach at Bishop McGuinness"
    ],
    bio: "A former 4-year collegiate starter at shortstop, third base, and second base, Leon brings over 30 years of experience in baseball and softball instruction. He has spent the last 10 years coaching varsity baseball at Bishop McGuinness Catholic High School and has dedicated more than three decades to private training and player development.",
    image: leonJoyceImg
  },
  {
    name: "Edwin Seda",
    title: "Baseball Instructor",
    positions: ["Hitting", "Fielding", "Pitching"],
    highlights: [
      "4-year varsity starter",
      "Played for Bacone College",
      "Former OKCPS single season strikeout record holder",
      "3 time OKCPS All-City 1st team",
      "17 saves out of 21 attempts freshman year"
    ],
    bio: "Edwin, a four year starter at his high school, played 1st, 2nd, outfield, and catcher. In the fall of his Junior year he was named head captain. Edwin signed with Bacone College after graduation as a 2 way player. He switched to a pitcher only role and primarily came out of the bullpen until becoming the closer, finishing with 17 saves out of 21 attempts while posting a 2.63 ERA.",
    image: edwinSedaImg
  },
  {
    name: "Paige Sechrist",
    title: "Softball Instructor",
    positions: ["Hitting", "Fielding"],
    highlights: [
      "Three-year varsity starter in fastpitch softball",
      "Ranked 10th in Oklahoma for fewest walks (2024)",
      "Member of Oklahoma Athletics"
    ],
    bio: "Paige Sechrist is a junior at Bethany High School and a three-year varsity starter in fastpitch softball. Known for her discipline, strong fundamentals, and strategic approach to the game, Paige was ranked 10th in Oklahoma for fewest walks allowed during the 2024 season—a testament to her control and consistency.",
    image: paigeSechistImg
  },
  {
    name: "Kyle King",
    title: "Baseball Instructor",
    positions: ["Hitting", "Fielding", "Pitching"],
    highlights: [
      "Former collegiate athlete at Wichita State",
      "16+ years of coaching experience",
      "32 years of expertise in the sports industry"
    ],
    bio: "Former collegiate athlete at Wichita State with over 16 years of coaching experience, working with athletes ages 5 to 18. Brings 32 years of expertise in the sports industry, combining on-field knowledge with a lifelong passion for athletic development and mentorship.",
    image: kyleKingImg
  },
  {
    name: "Ethan Flaherty",
    title: "Pitching Coach",
    positions: ["Pitching"],
    highlights: [
      "Current collegiate pitcher at Randall University",
      "Trained with nationally recognized Tread Athletics",
      "Exercise Science academic foundation",
      "Specializes in injury prevention and velocity development"
    ],
    bio: "Current collegiate pitcher at Randall University who overcame a career-threatening injury through years of research and self-driven development. Trained with nationally recognized Tread Athletics and applied advanced biomechanics to return to competitive form. Combines a strong academic foundation in Exercise Science with firsthand experience in injury prevention and velocity development.",
    image: ethanFlahertyImg
  },
  {
    name: "Tanner Holliman",
    title: "Hitting & Fielding Instructor",
    positions: ["Hitting", "Fielding"],
    highlights: [
      "Dallas Baptist University",
      "Northern Oklahoma College Enid",
      "Division I at Elon University",
      "Bachelor's degree in Economics",
      "Experience at every position except pitcher"
    ],
    bio: "Tanner Holliman began his collegiate baseball career at Dallas Baptist University before transferring to Northern Oklahoma College Enid and ultimately finishing at the Division I level with Elon University in North Carolina. A versatile player, Tanner gained experience at every position on the field except pitcher and competed at multiple infield positions at the Division I level.",
    image: tannerHollimanImg
  },
  {
    name: "Preston Easley",
    title: "Baseball Instructor",
    positions: ["Hitting", "Fielding", "Pitching"],
    highlights: [
      "16+ years of experience as player and coach",
      "MVP honors at Destiny Christian High School",
      "State Champion",
      "Three-time All-State selection",
      "Second-round trials for Team USA",
      "Played at Oklahoma City University"
    ],
    bio: "Preston Easley brings over 16 years of experience as both a player and coach in the game of baseball. A standout at Destiny Christian High School, Preston earned MVP honors, was a State Champion, and a three-time All-State selection. His playing career included national competition, advancing to the second-round trials for Team USA in California, and continuing at Oklahoma City University before transitioning into coaching.",
    image: prestonEasleyImg
  },
];

// Note: Preston Easley doesn't have a photo on the original website

export default function Coaches() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <span className="font-heading text-sm uppercase tracking-widest text-primary mb-2 block">Our Team</span>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase mb-6">
            Our <span className="text-primary">Staff</span>
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Our fully turfed 20,000 sq. ft. facility is home to experienced coaches with MLB, Olympic, and collegiate backgrounds. We pour our love for sports into developing young athletes and guiding them to the next level.
          </p>
          <p className="text-lg text-secondary-foreground/70 mt-4">
            <strong>Call us to book a lesson: 405-495-7800</strong>
          </p>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-card border border-border rounded-lg overflow-hidden card-hover group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                    <img 
                      src={coach.image} 
                      alt={coach.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-heading text-2xl uppercase mb-1 group-hover:text-primary transition-colors">
                      {coach.name}
                    </h3>
                    <span className="text-primary text-sm font-semibold block mb-3">{coach.title}</span>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {coach.positions.map((pos) => (
                        <span key={pos} className="text-xs bg-muted px-2 py-1 rounded">{pos}</span>
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">{coach.bio}</p>
                    
                    <details className="text-sm">
                      <summary className="text-primary cursor-pointer font-medium hover:underline">View Highlights</summary>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        {coach.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-4xl uppercase mb-6">
            Train With the <span className="text-primary">Best</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            Book a lesson with one of our expert coaches and start improving today.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Lesson
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}