/// <reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach (() => {
   cy.visit('./src/index.html')
  })

   it('Verifica o título da aplicação', function() {
       cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
       cy.get('#firstName')
       .should('be.visible')
       .type('Olá mundo!')
       .should('have.value', 'Olá mundo!')
   })

   it('Preenche os campos obrigatórios e envia o formulário', () => {
       const longText = "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
       cy.get('#firstName').type('Yan')
       cy.get('#lastName').type('Costa')
       cy.get('#email').type('yan.costa@lemeforense.com.br')
       cy.get('#open-text-area').type(longText, {delay: 0})
       cy.contains('button', 'Enviar').click()
       cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
   });

   it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
       cy.get('#firstName').type('Yan')
       cy.get('#lastName').type('Costa')
       cy.get('#email').type('yan.costa@lemeforense.com,br')
       cy.get('#open-text-area').type('teste')
       cy.contains('button', 'Enviar').click()
       cy.get('.error').should('be.visible')
   });

   it('Campo telefone continua vázio quando preenchido com valor não-numérico', () => {
   cy.get('#phone')
       .type('teste')
       .should('have.value', '')

   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
       cy.get('#firstName').type('Yan')
       cy.get('#lastName').type('Costa')
       cy.get('#email').type('yan.costa@lemeforense.com,br')
       cy.get('#phone-checkbox').click()
       cy.get('#open-text-area').type('teste')
       cy.contains('button', 'Enviar').click()
       cy.get('.error').should('be.visible')
   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
      cy.get('#firstName')
       .type('Yan')
       .should('have.value', 'Yan')
       .clear()
       .should('have.value', '')
       cy.get('#lastName')
       .type('Costa')
       .should('have.value', 'Costa')
       .clear()
       .should('have.value', '')
       cy.get('#email')
       .type('yan.costa@lemeforense.com.br')
       .should('have.value', 'yan.costa@lemeforense.com.br')
       .clear()
       .should('have.value', '')
       cy.get('#phone')
       .type('41998327738')
       .should('have.value', '41998327738')
       .clear()
       .should('have.value', '')
   })
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', () => {
       cy.contains('button', 'Enviar').click()
       cy.get('.error').should('be.visible')
   })
   
   it('envia o formuário com sucesso usando um comando customizado', () => {
   cy.fillMandatoryFieldsAndSubmit()

   cy.get('.success').should('be.visible')
   })

   it('Comando select', () => {
       cy.get('#product').select('Blog')
   })

   it('seleciona um produto (YouTube) por seu texto', () => {
       cy.get('#product')
       .select('YouTube')
       .should('have.value', 'youtube')
   })

   it('seleciona um produto (Mentoria) por seu valor (value)', () => {
       cy.get('#product')
       .select('mentoria')
       .should('have.value', 'mentoria')
   })

   it('seleciona um produto (Blog) por seu índice', () => {
       cy.get('#product')
       .select(1)
       .should('have.value', ('blog'))
   })

   it('Marca o tipo de atendimento "Feedback"', () => {
       cy.get('input[type="radio"][value="feedback"]')
       .check()
       .should('have.value', 'feedback')
   })

   it('marca cada tipo de atendimento', () => {
       cy.get('input[type="radio"')
       .should('have.length', 3)
       .each(function($radio){
           cy.wrap($radio).check()
           cy.wrap($radio).should('be.checked')
       })
   })

   it('Marca ambos checkboxes, depois desmarca o último', () => {
       cy.get('input[type="checkbox"]')
       .check()
       .should('be.checked')
       .last()
       .uncheck()
       .should('not.be.checked')
   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
       cy.get('#firstName').type('Yan ', {delay: 40})
       cy.get('#lastName').type('Costa', {delay: 40})
       cy.get('#email').type('yan.costa@lemeforense.com', {delay:40})
       cy.get('#phone-checkbox').check()
       cy.get('.button').click()
       cy.get('.error').should('be.visible')
   });

   it('selecione um arquivo da pasta de fixtures', function() {
       cy.get('input[type="file"]')
       .should('not.have.value')
       .selectFile('./cypress/fixtures/example.json')
       .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
       })
   });
   

   //simulando arrastando arquivo
   it('selecione um arquivo simulando um drag-and-drop', function() {
       cy.get('input[type="file"]')
       .should('not.have.value')
       .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
       .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
       })
   });
   it('Selecione um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
       .selectFile('@sampleFile')
       .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
       })
   });
   it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
       cy.get('a')
       .should('have.attr', 'target', '_blank')
   });

   it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
       cy.get('#privacy a')
       .invoke('removeAttr', 'target')
       .click()
       
   cy.contains('Talking About Testing')
   });
}); 