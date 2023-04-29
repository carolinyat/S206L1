/// <reference types='cypress'/>


describe('Criando cenário de teste para o site globalsqa', () => {

  it('Caso de teste: Registrando um usuário no site com sucesso', () => {
    createUser()
  })

  it('Caso de teste: Registrando um usuário no site com falha (faltando senha)', () => {
    createUserWithoutPassword()
  })

  it('Caso de teste: Registrando um usuário no site com falha (faltando username)', () => {
    createUserWithoutUsername()
  })

  it('Caso de teste: Realizando login no site com sucesso', () => {
    let info = createUser()

    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

})

function createUser() {

  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let user = hours + minutes + seconds + 'id'

  let password = hours + minutes + seconds + 'password'

  let userInfo = [user, password]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo
}

function createUserWithoutPassword() {

  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let user = hours + minutes + seconds + 'id'

  let password = hours + minutes + seconds + 'password'

  let userInfo = [user, password]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(password)
  cy.get('#password').clear()
  cy.get('.has-error > .help-block').should('have.text', 'Password is required')
  cy.get('.btn-primary').should('be.disabled')

  return userInfo
}

function createUserWithoutUsername() {

  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let user = hours + minutes + seconds + 'id'

  let password = hours + minutes + seconds + 'password'

  let userInfo = [user, password]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#username').clear()
  cy.get('#password').type(password)
  cy.get('.has-error > .help-block').should('have.text', 'Username is required')
  cy.get('.btn-primary').should('be.disabled')

  return userInfo
}