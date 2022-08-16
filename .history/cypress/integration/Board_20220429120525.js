describe("Renders the home page", () => {
 it("Renders correctly", () => {
  cy.visit("/");
 });
 it("Cards Loaded", () => {
  cy.get(".mainCardContainer").should("exist");
 });
 it("Labels Loaded", () => {
  cy.visit("/");
  cy.get('[data-testid="MenuIcon"]').click();
  cy.get(".labelItem ").should("exist");
 });
 it("Card Open", () => {
  cy.visit("/");
  /* ==== Generated with Cypress Studio ==== */
  cy
   .get(
    ":nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiCardContent-root > .MuiTypography-root"
   )
   .click();
  /* ==== End Cypress Studio ==== */
 });
});
