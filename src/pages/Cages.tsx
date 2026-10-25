import FormFirstLanding from "@/components/FormFirstLanding";
import heroImage from "@/assets/facilities/batting-cage-tee.jpg";

export default function Cages() {
  return (
    <FormFirstLanding
      image={heroImage}
      imageAlt="A batting cage at The Grind with a tee on the plate"
      headline="Batting cages in OKC"
      subline="$55 an hour · HitTrax cages $75"
      form={{
        offer: "Cage Rental",
        extraFields: [
          { name: "cage", label: "Cage", type: "chips", options: ["Batting cage ($55/hr)", "HitTrax cage ($75/hr)"] },
          { name: "when", label: "When", type: "chips", options: ["This week", "Next week", "Not sure yet"] },
        ],
        submitText: "Book my cage",
        finePrint: "We'll call you to set your time.",
        successHeading: "We got it.",
        successText: "We'll call you within one business day to set your cage time. Questions? Call 405-495-7800.",
      }}
    />
  );
}
