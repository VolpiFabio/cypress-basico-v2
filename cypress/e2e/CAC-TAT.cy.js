describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
    
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    cy.preencheMandatoryFields()
    cy.fillMandatoryFieldsAndSubmit2()
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')

  })

  const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5)

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.preencheNomeSobrenome()

    cy.get('#email')
      .type('email@invalido')
    // .should('have.value', 'email@invalido')

    cy.get('#phone')
      .type('hdjfdljhbf')

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, { delay: 0 }) // delay: 0 para digitar de forma imediata

    cy.fillMandatoryFieldsAndSubmit()

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('campo telefone continua vazio caso seja digitado um valor não-numérico', () => {
    cy.get('#phone')
      .type('hdjfdljhbf')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.preencheMandatoryFields()
    cy.get('#phone-checkbox') // pegando o elemento checkbox com o id phone-checkbox
      .check()
    cy.fillMandatoryFieldsAndSubmit()
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('be.visible') // verificando se o elemento com id firstName está visível
      .type('Fabio')
      .should('have.value', 'Fabio') // verificando se o valor do campo é o que esperamos
      .clear() // limpando o campo
      .should('have.value', '') // verificando se o campo está vazio

    cy.get('#lastName') // pegando elemento por id
      .should('be.visible')
      .type('Volpi')
      .should('have.value', 'Volpi')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('email@invalido')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.preencheMandatoryFields()
    cy.fillMandatoryFieldsAndSubmit2()
  })

  it('enviando formulario com sucesso usando o comando contains', () => {

    // criando um objeto com os dados para preencher o formulário
    const data = {
      firstName: 'Fabio',
      lastName: 'Volpi',
      email: 'volpi@gmail.com',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }

    cy.preencheMandatoryFields2(data)
    cy.contains('button', 'Enviar').click() // clica no botão enviar usando o comando contains
  })

  // usar select para selecionar drop down
  // selecione um produto pelo seu texto
  it('selecione um produto pelo seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  // selecione um produto pelo seu valor (value)
  it('selecione um produto pelo seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  // selecione um produto pelo seu índice
  it('selecione um produto pelo seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  // usar find e check para marcar radio button
  // marca um tipo de atendimento pelo radio button
  it('marca um tipo de atendimento pelo feedback', () => {
    cy.get('#support-type')
      .find('input[value="feedback"]')
      .check()
      .should('be.checked')
  })

  // marca cada tipo de atendimento, usando o each e wrap
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(tipoDeServico => { // cada tipo de serviço é um elemento do tipo radio
        cy.wrap(tipoDeServico) // wrap é usado para encapsular o elemento em um objeto
          .check()
          .should('be.checked')
      })
  })


  // marca ambos checkboxes, depois desmarca o último
  it('marca todos os checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json') // seleciona o arquivo
      .should(input => { // verifica se o arquivo foi selecionado 
        expect(input[0].files[0].name).to.equal('example.json') // verifica o nome do arquivo
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) // seleciona o arquivo e simula um drag-and-drop
      .should(input => { 
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') // cria um alias
    cy.get('input[type="file"]')
      .selectFile('@sampleFile') // seleciona o arquivo usando um alias
      .should(input => { // verifica se o arquivo foi selecionado 
        expect(input[0].files[0].name).to.equal('example.json') // verifica o nome do arquivo
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
    .should('have.attr', 'target', '_blank') // verifica se o link abre em outra aba
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
    .invoke('removeAttr', 'target') // remove o atributo target do link
    .click()

    cy.contains('h1', 'CAC TAT - Política de privacidade')
    .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show') // exibe o elemento oculto
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide') // esconde o elemento exibido
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show') // exibe o elemento oculto
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') // esconde o elemento exibido
      .should('not.be.visible')
  })

  it('preenche o campo da area de texto usando o .invoke', () => {
    cy.get('#open-text-area')
    .invoke('val', 'lorem ipsum dolor sit amet') // preenche o campo da area de texto usando o .invoke
    .should('have.value', 'lorem ipsum dolor sit amet')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then(response => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).to.contain('CAC TAT')
    })
    
    })

  it('encontrando o gato', () => {
    cy.get('#cat') // pegando o elemento com id cat
    .invoke('show') // exibindo o elemento
    .should('be.visible') // verificando se o elemento foi exibido
    })
  
})







