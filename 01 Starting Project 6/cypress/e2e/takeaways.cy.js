/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => { // Use beforeEach in Cypress to run the seed code before each test.
    cy.task('seedDatabase');
  });
  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
});


