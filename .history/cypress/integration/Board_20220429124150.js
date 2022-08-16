describe("Renders the home page", () => {
 it("Renders correctly", () => {
  cy.visit("/");
 });
 it("Cards Loaded", () => {
  cy.get(".mainCardContainer").should("exist");
 });
 //   it("Card Open", () => {
 //    cy
 //     .get(
 //      ":nth-child(1) > .MuiBox-root > .MuiPaper-root > .MuiCardContent-root > .MuiTypography-root"
 //     )
 //     .click();
 //   });
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
  cy.get(".css-122n81m-MuiButtonBase-root-MuiButton-root").click();
  cy.get(".mainCardContainer:contains('Test task title')").should("exist");

  /* ==== End Cypress Studio ==== */
 });
 it("Delete Task", () => {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("http://localhost:3000/");
  cy.get(".mainCardContainer:contains('Test task title')").click();
  cy.get(".deleteCardBtn").click();
  cy
   .get(
    ".MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > :nth-child(2)"
   )
   .click();
  /* ==== End Cypress Studio ==== */
 });
 it("Move Task", () => {});
 it("Update Task", () => {});
});

cancelCardBtn;
deleteCardBtn;
saveCardBtn;
