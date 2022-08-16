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
 it("Card Close", () => {
  cy.get(".cancelCardBtn ").click();
 });
});

describe("Test API", () => {
 it("Create Task", () => {
  /* ==== Generated with Cypress Studio ==== */
  cy.get('.headerLabelContainer:contains("In progress") svg').click();

  cy.get("#title").clear();
  cy.get("#title").type("Test task title");
  cy.get('[data-testid="CalendarIcon"]').click();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get(":nth-child(5) > :nth-child(6) > .MuiButtonBase-root").click();
  cy.get(".css-1umqo6f").click();
  cy.get(".css-1umqo6f").click();
  cy.get(".saveCardBtn").click();
  cy.get(".mainCardContainer:contains('Test task title')").should("exist");

  /* ==== End Cypress Studio ==== */
 });

 it("Move|Update Task & Save Task", () => {
  cy.get(".mainCardContainer:contains('Test task title')").click();
  cy.get("#statusSelector").click();
  cy.get('[data-value="DONE"]').click();
  cy.get(".saveCardBtn").click();
  cy
   .get(
    ".listColumnContainer:eq(2) .mainCardContainer:contains('Test task title')"
   )
   .should("exist");
 });

 it("Delete Task", () => {
  /* ==== Generated with Cypress Studio ==== */
  cy.get(".mainCardContainer:contains('Test task title')").click();
  cy.get(".deleteCardBtn").click();
  cy
   .get(".confirmActionContainer  .MuiDialog-scrollPaper button:eq(1)")
   .click();
  //   cy.get(".MuiDialogActions-root button:nth-child(2)").click();
  /* ==== End Cypress Studio ==== */
 });
});