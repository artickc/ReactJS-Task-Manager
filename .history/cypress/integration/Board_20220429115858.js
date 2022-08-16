describe("Renders the home page", () => {
 it("Renders correctly", () => {
  cy.visit("/");
 });
 it("Cards Loaded", () => {
  cy.get(".mainCardContainer").should("exist");
 });
 it("Labels Loaded", () => {
  cy.visit("/");
  //   cy.get(".labelItem").should("exist");
 });
 it("Card Open", () => {
  cy.visit("/");
 });
});
