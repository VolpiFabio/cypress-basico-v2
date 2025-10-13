// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('div').contains('button', 'Enviar') // pegando o elemento button com o texto enviar
        .click()

    cy.get('span.error') // pegando o elemento pelo seletor css com o texto error
        .should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', () => {
    cy.get('div').contains('button', 'Enviar') // pegando o elemento button com o texto enviar
      .click()

    cy.get('span.success') // pegando o elemento pelo seletor css com o texto success e a frase Mensagem enviada com sucesso.
      .should('be.visible')
})

Cypress.Commands.add('preencheMandatoryFields', data => {

    const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5)

    cy.get('#firstName')
      .should('be.visible')
      .type('Fabio')
      .should('have.value', 'Fabio')

    cy.get('#lastName') // pegando elemento por id
      .should('be.visible')
      .type('Volpi')
      .should('have.value', 'Volpi')

    cy.get('#email')
      .should('be.visible')
      .type('volpi@gmail.com')
      .should('have.value', 'volpi@gmail.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, { delay: 0 }) // delay: 0 para digitar de forma imediata
})

Cypress.Commands.add('preencheNomeSobrenome', () => {
  cy.get('#firstName')
    .should('be.visible')
    .type('Fabio')
    .should('have.value', 'Fabio')

  cy.get('#lastName') // pegando elemento por id
    .should('be.visible')
    .type('Volpi')
    .should('have.value', 'Volpi')
})

Cypress.Commands.add('preencheMandatoryFields2', data => {
  cy.get('#firstName')
    .type(data.firstName)
    

  cy.get('#lastName')
    .type(data.lastName)

  cy.get('#email')
    .type(data.email)

  cy.get('#open-text-area')
    .type(data.message)
  
})