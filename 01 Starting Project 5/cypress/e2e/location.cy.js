/// <reference types="cypress" />

// The goal is not to test whether the browser is recovering the location correctly, but rather whether the application is using the data correctly.
describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').as(
          'getUserPosition'); // The Cypress stub method replaces an existing method.
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched'); // contains()
  });
});
