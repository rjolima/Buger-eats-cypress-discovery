// camelCase esse padrão é usado pra funções ex.: nomeCompleto
//PascalCase esse padrão é usado para classes ex.: NomeCompleto

class SignupPage {

    //função go apenas com abrir e fechar()
    go() {
        cy.visit('/')
        //get pra buscar um elemento
        //elemento a link html href valor da propriedade
        cy.get('a[href="/deliver"]').click()
        //page deliver vai buscar elemento principal da página
        //form elemento filho
        //aqui não vai fazer uma validação, mas sim um checkpoint, vai garantir q tá no lugar certo
        //isso não vai garantir que ele vai ser um entregador já que não foi finalizado o cadatro
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {

        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        //para não corre risco do campo do cep ter um valor add como buscar cep, e gerar um falso positivo, é melhor
        //usar dois elementos para garantir 
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //a propriedade value deve conter uma informação
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //vai fazer a mesma buscar do xpath, só que mais limpa. 
        //Vai buscar pelo nome informado na metoda_entrega: 'Moto', assim para as outras opções, busca elemento pai, pega dentro da filho as 3 opções li
        // e vai clicar na opção de entrega informada no metodo_entrega, Moto, Bicicleta e Van/Carro
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        // input[accept="image/*"] - para remover /* do nome "imagem/*" usa ^ que é um expressão regular que vai procurar na propriedade accpet o valor q começa com image
        //input[accept$="/*"] - para buscar a parte final do valor do image
        //input[accept*="/*"] - contém dados dentro do elemento do html
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

    }

    submit() {
        //uso o form para garantir que vai buscar esse elemento dentro dele apenas.
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        //essa modal foi feita por um terceiro, com isso, ao buscar por: .swal2-html-container mais de um opção é apresentada, não tendo controle sobre isso
        // - poderia usar essa busca por elemento, mas tb a outra: 
        //cy.get('div[class="swal2-html-container"').should('have.text', expectedMessage)
        // vai fazer uma busca no elemento Pai e depois dentro do filho

        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)

    }

    alertMessageShoulBe(expectedMessage){
        //cy.get('.alert-error').should('have.text', expectedMessage)
        //vai combinar o seletor css com o texto com classe trazendo apenas um único elemento, com isso vai buscar todos os campos que são obrigatórios
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}

export default new SignupPage;
