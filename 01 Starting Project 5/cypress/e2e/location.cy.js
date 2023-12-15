/// <reference types="cypress" />

// The goal is not to test whether the browser is recovering the location correctly, but rather whether the application is using the data correctly.
describe('share location', () => {
  beforeEach(() => { //  Using a hook (beforeEach) to reuse a stub between tests.
    cy.visit('/').then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').as( // The Cypress stub method replaces an existing method.
          'getUserPosition' // When replacing with an empty function, the callback-dependent user interface (UI) update does not occur.
      ).callsFake((cb) => { // Using callsFake to override the default implementation of getCurrentPosition.
        setTimeout(() => {
          cb({
            coords: {
              latitude: 37.5,
              longitude: 48.01,
            },
          });
        }, 100); //  Added delay with setTimeout to simulate load time.
      });
    }); // Successful testing after dummy implementation of getCurrentPosition
  })
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched'); // contains()
  })

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
  });
});
