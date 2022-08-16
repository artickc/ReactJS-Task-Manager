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

describe("Test Labels", () => {
 it("Open Labels", () => {
  cy.get('[data-testid="MenuIcon"]').click();
 });
 it("Enable Labels", () => {
  cy.get('.labelItem:contains("ReactJs")').click();
  cy.get('.labelItem:contains("Redux")').click();
 });
 it("Close Labels", () => {
  cy.get(".MuiBackdrop-root").click();
 });

 it("Check Filter", () => {
  cy.get(".mainCardContainer:contains('ReactJs')").should("exist");
  cy.get(".mainCardContainer:contains('Redux')").should("exist");
 });
 it("Disable Labels", () => {
  cy.get('[data-testid="MenuIcon"]').click();
  cy.get('.labelItem:contains("ReactJs")').click();
  cy.get('.labelItem:contains("Redux")').click();
  cy.get(".MuiBackdrop-root").click();
 });
});

describe("Test API", () => {
 it("Create Task", () => {
  cy.get('.headerLabelContainer:contains("In progress") svg').click();
  cy.get("#title").clear();
  cy.get("#title").type("Test task title");
  cy.get('[data-testid="CalendarIcon"]').click();
  cy.get(":nth-child(5) > :nth-child(6) > .MuiButtonBase-root").click();
  cy.get(".css-1umqo6f").click();
  cy.get(".css-1umqo6f").click();
  cy.get(".saveCardBtn").click();
  cy.get(".mainCardContainer:contains('Test task title')").should("exist");
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
  cy.get(".mainCardContainer:contains('Test task title')").click();
  cy.get(".deleteCardBtn").click();
  cy
   .get(".confirmActionContainer  .MuiDialog-scrollPaper button:eq(1)")
   .click();
 });
});

describe("Test ERROR in API", () => {
 it("Delete Task Error Task", () => {
  cy.get(".mainCardContainer:contains('ERROR Task')").click();
  cy.get(".deleteCardBtn").click();
  cy
   .get(".confirmActionContainer  .MuiDialog-scrollPaper button:eq(1)")
   .click();
  cy.get('[data-testid="CloseIcon"] > path').click();
 });
 it("Move|Update Error Task", () => {
  cy.get(".mainCardContainer:contains('ERROR Task')").click();
  cy.get("#statusSelector").click();
  cy.get('[data-value="DONE"]').click();
  cy.get(".saveCardBtn").click();
  cy.get('[data-testid="CloseIcon"] > path').click();
 });
});
