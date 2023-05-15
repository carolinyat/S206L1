/// <reference types='cypress'/>

describe('Criando cenário de teste para o site Aiqfome', () => {

    it('Caso de teste: verificar se ao clicar na logo a página vai para a tela inicial, estando em outra tela', () => {
        cy.visit('https://aiqfome.com/cidades')
        cy.get('#titulo-aiqfome').click()
        cy.get('.col-lg-12.small-margin-percent-bottom').should('contain.text', 'aiqfome - os melhores restaurantes da sua cidade')
    })

    it('Caso de teste: teste de escolher sua cidade (Santa Rita do Sapucaí)', () => {
        enterCityStaRitaSapucai()
        cy.get('.medium-margin-top').should('contain.text', 'restaurantes em Santa Rita do Sapucaí no aiqfome')
    })

    it('Caso de teste: procurando um restaurante específico na barra de pesquisa após inserir a cidade', () => {
        enterCityStaRitaSapucai()
        cy.get('#pesquisa').type('Ponto du chef')
        cy.get('#secao2loja15281 > .row > .col-xl-9 > .dark-purple-text').should('contain.text', 'Ponto du Chef Hamburgueria')
    })

    it('Caso de teste: ver as informações de um restaurante', () => {
        enterCityStaRitaSapucai()
        cy.get('#pesquisa').type('Ponto du chef')
        cy.get('#secao2loja15281 > .row > .col-xl-9 > .dark-purple-text').should('contain.text', 'Ponto du Chef Hamburgueria')
        cy.get('#secao2loja15281 > .row').click()
        cy.get('#restaurant-header > .row > .col-sm-1').click()
        cy.get('#modalInfos > .modal-dialog > .modal-content > .modal-header > .blue-text').should('contain.text', 'algumas infos sobre essa loja')
    })

    it('Caso de teste: adicionar um produto no carrinho', () => {
        enterCityStaRitaSapucai()
        cy.get('#pesquisa').type('Ponto du chef')
        cy.get('#secao2loja15281 > .row > .col-xl-9 > .dark-purple-text').should('contain.text', 'Ponto du Chef Hamburgueria')
        cy.get('#secao2loja15281 > .row').click()
        cy.get('#nome-itens-54176 > :nth-child(1) > :nth-child(1) > .col-12 > .item-title > .nome-preco-item > .nome-item > .row > .h3-celular').click()
        cy.get('#addi_btn').click()
        cy.get('#ticket-btn').should('exist')
    })

    it('Caso de teste: procurando um restaurante específico na barra de pesquisa com falha (não existe)', () => {
        enterCityStaRitaSapucai()
        cy.get('#pesquisa').type('In da House')
        cy.get('#semNada > .font-main').should('contain.text', 'vish, não tem nada aqui :(')
    })
})

function enterCityStaRitaSapucai() {
    cy.visit('https://aiqfome.com/')
    cy.get('#buttonSelecionarCidade').click()
    cy.get('[id="11"]').click()
    cy.get('#cidades11 > :nth-child(81) > .blue-text').click()
}