describe("Renders the home page", () => {
 it("Renders correctly", () => {
  cy.visit("/");
 });
 it("Cards Loaded", () => {
  cy.get(".mainCardContainer").should("exist");
 });
 it("Labels Loaded", () => {
  cy.get(".labelItem").should("exist");
 });
});
