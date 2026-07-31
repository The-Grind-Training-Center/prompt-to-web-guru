import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Staff images
import edieThompsonImg from "@/assets/coaches/edie-thompson.jpg";
import chrisWimmerImg from "@/assets/coaches/chris-wimmer.jpg";
import robWaltonImg from "@/assets/coaches/rob-walton.jpg";
import shaneBaileyImg from "@/assets/coaches/shane-bailey.jpg";

import antonShinhosterImg from "@/assets/coaches/anton-shinhoster.jpg";

import edwinSedaImg from "@/assets/coaches/edwin-seda.jpg";
import kyleKingImg from "@/assets/coaches/kyle-king.png";
import kyleKingImg from "@/assets/coaches/kyle-king.png";
import ethanFlahertyImg from "@/assets/coaches/ethan-flaherty.jpg";
import tannerHollimanImg from "@/assets/coaches/tanner-holliman.jpg";
import codyMilliganImg from "@/assets/coaches/cody-milligan.jpg";
import codyMilliganImg from "@/assets/coaches/cody-milligan.jpg";
import braelynButlerImg from "@/assets/coaches/braelyn-butler.jpg";
import baileyButlerImg from "@/assets/coaches/bailey-butler.jpg";

const SCHEDULE_URL = "https://thegrindtrainingcenter.myesoftplanner.com/auth/login";

const staff = [
  {
    name: "Edie Thompson",
    title: "Director of Operations",
    positions: ["Softball", "Operations"],
    highlights: [
      "Former Division I Softball Player",
      "Full athletic scholarship to Sacramento State University",
      "Played Division I for Santa Clara University",
      "20+ years coaching youth teams",
      "Master's degree from University of San Francisco"
    ],
    bio: "Edie is a seasoned veteran and former D1 softball player herself. As a player, she earned a full athletic scholarship to play Division I softball at the then top 10 nationally ranked Sacramento State University in California. She also played Division I for Santa Clara University before she ended her career. She has coached youth teams for well over 20 years between Oklahoma to California. Following her years of play, she went on to graduate from Santa Clara University and also earned a master's degree from the University of San Francisco.",
    image: edieThompsonImg
  },
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
    name: "Rob Walton",
    title: "Pitching & Infielding Coach",
    positions: ["Pitching", "Infielding", "Player Development"],
    highlights: [
      "41 MLB Draft picks developed, including 2 first-round selections",
      "Legendary Pitching Coach at Oklahoma State University",
      "Former Pitching Coach at Oral Roberts University",
      "7 All-Americans and 2 Big 12 Pitchers of the Year",
      "Set school record for strikeouts in a season",
      "College World Series appearance",
      "Developed MLB pitchers including Jason Hursh and Koda Glover"
    ],
    bio: "Rob Walton is a highly respected and accomplished pitching coach with decades of success at the collegiate level. Best known for his legendary tenure as the pitching coach at Oklahoma State University and his leadership at Oral Roberts University, Walton has played a direct role in developing 41 MLB Draft picks, including two first-round selections, while producing seven All-Americans and two Big 12 Pitchers of the Year. His pitching staffs have set program records, including a school record for strikeouts in a season, and were instrumental in postseason success such as a College World Series appearance. Numerous pitchers he coached have advanced to Major League Baseball, including first-rounder Jason Hursh and MLB closer Koda Glover. Renowned for blending elite pitching mechanics, mental toughness, and long-term player development, Rob Walton is widely regarded as one of the most influential pitching coaches in the region.",
    image: robWaltonImg
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
    name: "Cody Milligan",
    title: "Hitting, Fielding & Baserunning Instructor",
    positions: ["Hitting", "Fielding", "Baserunning"],
    highlights: [
      "JUCO All-American at Cowley County Community College",
      "9th Round Draft Pick by the Atlanta Braves (2019)",
      "6-year Minor League Baseball career",
      "5+ years of hitting, fielding, and baserunning instruction"
    ],
    bio: "Cody Milligan brings elite-level professional experience to The Grind. A JUCO All-American at Cowley County Community College, Cody was selected by the Atlanta Braves in the 9th round of the 2019 MLB Draft and went on to enjoy a six-year career in Minor League Baseball. Over the past five years, he has channeled that high-level experience into developing young athletes — specializing in hitting, fielding, and baserunning. Cody combines pro-level insight with a passion for player development, helping athletes sharpen their skills and elevate their game.",
    image: codyMilliganImg
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
    name: "Braelyn Butler",
    title: "Softball Instructor",
    positions: ["Hitting", "Fielding", "Position-Specific"],
    highlights: [
      "3-Year Varsity Starter at Yukon High School",
      "2023 CFL Fall Championship All-Tournament Team",
      "2025 AFON Ultimate Challenge Winner",
      "Specializes in hitting, fielding, and position-specific training"
    ],
    bio: "Braelyn Butler is a three-year varsity starter at Yukon High School with a proven track record at the highest levels of competitive fastpitch softball. A 2023 CFL Fall Championship All-Tournament Team selection and 2025 AFON Ultimate Challenge Winner, Braelyn brings elite playing experience and a sharp competitive edge to her instruction. She specializes in hitting and fielding development, position-specific training, game IQ and approach, and building confidence and consistency in young athletes.",
    image: braelynButlerImg
  },
  {
    name: "Bailey Butler",
    title: "Softball Instructor",
    positions: ["Pitching", "Position-Specific"],
    highlights: [
      "3-Year Varsity Starter at Yukon High School",
      "November 2023 Alliance Fastpitch Player of the Month",
      "Specializes in pitching development and position-specific training"
    ],
    bio: "Bailey Butler is a three-year varsity starter at Yukon High School and was named the November 2023 Alliance Fastpitch Player of the Month — a recognition of her elite performance at one of the highest levels of competitive fastpitch softball. Bailey specializes in pitching development, position-specific training, game IQ and approach, and helping athletes build the confidence and consistency needed to perform under pressure.",
    image: baileyButlerImg
  },
  {
    name: "Shauna Walker",
    title: "CSR / Admin",
    positions: ["Customer Service", "Administration"],
    highlights: [
      "Customer Service Representative",
      "Facility Administration"
    ],
    bio: "Shauna serves as a Customer Service Representative and Administrator at The Grind, helping members and families with scheduling, account questions, and day-to-day facility operations."
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

      {/* Staff Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {staff.map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-lg overflow-hidden card-hover group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-heading text-2xl uppercase mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-primary text-sm font-semibold block mb-3">{member.title}</span>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {member.positions.map((pos) => (
                        <span key={pos} className="text-xs bg-muted px-2 py-1 rounded">{pos}</span>
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    
                    <details className="text-sm">
                      <summary className="text-primary cursor-pointer font-medium hover:underline">View Highlights</summary>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        {member.highlights.map((h, i) => (
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