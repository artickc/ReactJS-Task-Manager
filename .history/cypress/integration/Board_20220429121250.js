describe("Renders the home page", () => {
 it("Renders correctly", () => {
  cy.visit("/");
 });
 it("Cards Loaded", () => {
  cy.get(".mainCardContainer").should("exist");
 });

 it("Card Open", () => {
  cy
   .get(
    ":nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiCardContent-root > .MuiTypography-root"
   )
   .click();
 });
});

describe("Test API", () => {
 it("Create Task", () => {
  cy.visit("/");
  /* ==== Generated with Cypress Studio ==== */
  cy
   .get(
    ':nth-child(2) > .MuiList-root > .css-0 > .MuiPaper-root > .MuiToolbar-root > .MuiTypography-root > [data-testid="AddIcon"] > path'
   )
   .click();
  cy.get("#title").clear();
  cy.get("#title").type("Test task title");
  cy.get('[data-testid="CalendarIcon"]').click();
  /* ==== End Cypress Studio ==== */
 });
 it("Delete Task", () => {
  cy.visit("/");
 });
 it("Move Task", () => {
  cy.visit("/");
 });
 it("Update Task", () => {
  cy.visit("/");
 });
});
