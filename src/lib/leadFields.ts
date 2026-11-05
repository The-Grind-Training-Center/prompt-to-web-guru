export type LeadExtraField = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "chips";
  options?: string[];
  optional?: boolean;
  placeholder?: string;
};

const teamOffers = new Set(["Field Rental", "Soccer Field Credits", "Cage Rental"]);

export function getLeadExtraFields(offer: string, fields: LeadExtraField[]): LeadExtraField[] {
  const optional = !teamOffers.has(offer);
  return [
    { name: "team_name", label: "Team name", type: "text", optional, placeholder: optional ? "Team name (if any)" : "Team name" },
    ...fields.filter((field) => !/^team(?:\s+or\s+(?:group|club))?\s+name$/i.test(field.label) && field.name !== "team_name"),
  ];
}

export function hasMissingRequiredExtra(fields: LeadExtraField[], values: Record<string, string>) {
  return fields.some((field) => !field.optional && !(values[field.name] ?? "").trim());
}

export function collectLeadDetails(fields: LeadExtraField[], values: Record<string, string>) {
  const details: Record<string, string> = {};
  for (const field of fields) {
    const value = (values[field.name] ?? "").trim().slice(0, field.name === "team_name" ? 100 : 200);
    if (field.optional && !value) continue;
    if (field.type === "number" && (Number.isNaN(Number(value)) || Number(value) < 0 || Number(value) > 999)) {
      return { details, error: `Please enter a valid number for "${field.label}".` };
    }
    details[field.label] = value;
  }
  return { details, error: "" };
}