/// <reference types="cypress" />

// The goal is not to test whether the browser is recovering the location correctly, but rather whether the application is using the data correctly.
describe('share location', () => {
  beforeEach(() => { //  Using a hook (beforeEach) to reuse a stub between tests.
    cy.fixture('user-location.json').as('userLocation'); //  Using cy.fixture to load and access data.
    cy.visit('/').then((win) => {
      cy.get('@userLocation').then(fakePosition => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as( // The Cypress stub method replaces an existing method.
            'getUserPosition' // When replacing with an empty function, the callback-dependent user interface (UI) update does not occur.
        ).callsFake((cb) => { // Using callsFake to override the default implementation of getCurrentPosition.
          setTimeout(() => {
            cb(fakePosition);
          }, 100); //  Added delay with setTimeout to simulate load time.
        });
      })
      cy.stub(win.navigator.clipboard, 'writeText')
          .as('saveToClipboard')
          .resolves();
      cy.spy(win.localStorage, 'setItem').as('storeLocation'); // The focus is on checking method calls rather than return values for browser APIs.
      cy.spy(win.localStorage, 'getItem').as('getStoreLocation');
    }); // Successful testing after dummy implementation of getCurrentPosition
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched'); // contains()
  })

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called'); // Use the assertion should('have.been.calledWithMatch') to check arguments passed to the dummy function.
    cy.get('@userLocation').then(fakePosition => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get('@saveToClipboard').should(
          'have.been.calledWithMatch',
          new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`) // URL encoding to match the required format when checking arguments.
      );
      cy.get('@storeLocation').should(
          'have.been.calledWithMatch',
          /John Doe/,
          new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
    });
    cy.get('@storeLocation').should('have.been.called'); // Spies can be used to check if certain methods have been called, such as 'have.been.called'.
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoreLocation').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
