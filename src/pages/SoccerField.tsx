import FormFirstLanding from "@/components/FormFirstLanding";
import heroImage from "@/assets/soccer/soccer-hero.webp";

export default function SoccerField() {
  return (
    <FormFirstLanding
      image={heroImage}
      imageAlt="Kids playing soccer on The Grind's indoor turf field"
      headline="Indoor soccer field"
      subline="Field credits from $105 an hour"
      form={{
        offer: "Soccer Field Credits",
        extraFields: [
          { name: "team_age", label: "Team age", type: "chips", options: ["U8 to U10", "U11 to U13", "U14 and up", "Adult"] },
          { name: "how_often", label: "How often", type: "chips", options: ["One time", "Every week"] },
        ],
        submitText: "Get my field times",
        finePrint: "We'll call you to set your times.",
        successHeading: "We got it.",
        successText: "We'll call you within one business day to lock in your times. Questions? Call 405-495-7800.",
      }}
    />
  );
}
