import FormFirstLanding from "@/components/FormFirstLanding";
import fieldWideMia from "@/assets/photos/field-wide-mia.jpg.asset.json";

export default function Rentals() {
  return (
    <FormFirstLanding
      image={fieldWideMia.url}
      imageAlt="The indoor turf field at The Grind"
      objectPosition="center 35%"
      headline="Your team's winter field"
      subline="Indoor turf from $105 an hour"
      form={{
        offer: "Field Rental",
        extraFields: [
          { name: "sport", label: "Sport", type: "chips", options: ["Baseball", "Softball", "Soccer", "Football", "Other"] },
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
