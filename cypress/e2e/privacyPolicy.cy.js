it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html') // acessa a página da poiltica de privacidade
    // cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html') // acessa a página da poiltica de privacidade
    cy.contains('h1', 'CAC TAT - Política de privacidade')
    .should('be.visible')

    cy.contains('p', 'Talking About Testing')
    .should('be.visible')
})