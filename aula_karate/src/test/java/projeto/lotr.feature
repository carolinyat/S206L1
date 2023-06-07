
Feature: Testando API Senhor dos Anéis

Background:
    * def url_base = "https://the-one-api.dev/v2/"
    * def token =  'PLYJyHIFbtpMjJRmwQEq'

Scenario: Verificando informações dos livros
    Given url url_base
    And path 'book/'
    When method get
    Then status 200
    Then match $.docs[0].name == 'The Fellowship Of The Ring'
    Then match $.docs[1].name == 'The Two Towers'
    Then match $.docs[2].name == 'The Return Of The King'

Scenario: Verificando mensagem de erro para ID de livro inválido (Caso negativo)
    Given url url_base
    And path 'book/1234'
    When method get
    Then status 200
    Then match $.message == 'Something went wrong.'

Scenario: Verificando informações de um livro específico
    Given url url_base
    And path 'book/5cf58080b53e011a64671584'
    When method get
    Then status 200
    Then match $.docs[0].name == 'The Return Of The King'


Scenario: Verificando citações de um filme
    Given url url_base
    And path 'quote/5cd96e05de30eff6ebcce893/'
    And header Authorization = 'Bearer ' + token
    When method get
    Then status 200
    Then match $.docs[0].dialog == "We do not come to treat with Sauron, faithless and accursed. Tell your master this. The armies of Mordor must disband. He is to depart these lands, never to return."

Scenario: Verificando informação do capítulo de um livro
    Given url url_base
    And path 'book/5cf58080b53e011a64671584/chapter/'
    And header Authorization = 'Bearer ' + token
    When method get
    Then status 200
    Then match $.docs[0].chapterName == 'Minas Tirith'


Scenario: Testando URL inválida (Caso negativo)
    Given url url_base
    And path 'books/'
    When method get
    Then status 404
