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
