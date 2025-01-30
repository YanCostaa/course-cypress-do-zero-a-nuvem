Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Yan')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('yan.costa@lemeforense.com.br')
    cy.get('#open-text-area').type('Teste.')
    cy.contains('button', 'Enviar').click()
})