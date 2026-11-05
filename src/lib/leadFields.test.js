import { describe, expect, test } from "bun:test";
import { collectLeadDetails, getLeadExtraFields, hasMissingRequiredExtra } from "./leadFields";

describe("team-name collection", () => {
  for (const offer of ["Field Rental", "Soccer Field Credits", "Cage Rental"]) {
    test(`${offer} requires a team name`, () => {
      const fields = getLeadExtraFields(offer, []);
      expect(hasMissingRequiredExtra(fields, { team_name: " " })).toBe(true);
      expect(hasMissingRequiredExtra(fields, { team_name: "Thunder" })).toBe(false);
    });
  }
  for (const offer of ["Birthday Party", "Chris Wimmer", "Halloween HitTrax Camp", "Membership", "Cage Membership", "Homepage Callback", "Backstop"]) {
    test(`${offer} allows an empty team name and omits it from details`, () => {
      const fields = getLeadExtraFields(offer, []);
      expect(fields[0].optional).toBe(true);
      expect(hasMissingRequiredExtra(fields, { team_name: " " })).toBe(false);
      expect(collectLeadDetails(fields, { team_name: " " })).toEqual({ details: {}, error: "" });
    });
  }
  test("team-name answers are trimmed and limited to 100 characters", () => {
    const fields = getLeadExtraFields("Field Rental", []);
    expect(collectLeadDetails(fields, { team_name: `  ${"T".repeat(101)}  ` }).details).toEqual({ "Team name": "T".repeat(100) });
  });
  test("team-name aliases are replaced, not duplicated, before other questions", () => {
    const age = { name: "team_age", label: "Team age", type: "chips" };
    const fields = getLeadExtraFields("Field Rental", [
      { name: "team", label: "Team or group name", type: "text" },
      { name: "club", label: "Team or club name", type: "text" },
      { name: "existing", label: "Team name", type: "text" },
      age,
    ]);
    expect(fields.map((f) => f.name)).toEqual(["team_name", "team_age"]);
    expect(fields[1]).toEqual(age);
  });
  test("optional extra fields are omitted when blank but saved when filled", () => {
    const fields = [{ name: "extra", label: "Extra", type: "text", optional: true }];
    expect(hasMissingRequiredExtra(fields, {})).toBe(false);
    expect(collectLeadDetails(fields, {}).details).toEqual({});
    expect(collectLeadDetails(fields, { extra: "  Yes  " }).details).toEqual({ Extra: "Yes" });
  });
  test("blank optional numeric fields skip number validation", () => {
    const fields = [{ name: "age", label: "Age", type: "number", optional: true }];
    expect(collectLeadDetails(fields, {}).details).toEqual({});
    expect(collectLeadDetails(fields, { age: "1000" }).error).not.toBe("");
  });
  test("other required extra fields still block empty answers", () => {
    const fields = getLeadExtraFields("Membership", [{ name: "age", label: "Age", type: "number" }]);
    expect(hasMissingRequiredExtra(fields, {})).toBe(true);
    expect(hasMissingRequiredExtra(fields, { age: "12" })).toBe(false);
  });
});