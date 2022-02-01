import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'
 
//function palavra reservada para criar uma função em javascript, usando padrão, apaga o function e entra
// com áreo function (=>)
describe('Signup', () => {

        //essa função fixture que trabalha com a massa de teste ela trabalha de forma Síncrona
        //e por isso ela precisa cumprim uma promessa chamando a subsunção then para pegar a massa de teste
        //passa o parâmetro d que é abreviação de deliver, mas pode usar qq uma(ex.: massa, item, a , b).
        //this é um palavra reservada pra criar um variável de contesto, que vai armazenar em "d" a massa inteira do deliver
        //usa o this pra pode ter acesso aos outros casos de teste.
        //usando uma nova camada de teste SignupFactory vai deixar o defore comentado
    // beforeEach(function() {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })

    // })
    // //ganchos executados em cypress, pode ser usado pra customizar os casos de teste.

    // before(function(){
    //     cy.log('Tudo é executado uma única vez antes de todos os casos de testes')
    // })

    // beforeEach(function(){
    //     cy.log('Tudo aqui é executado sempre antes de cada caso de teste')
    // })

    // after(function(){
    //     cy.log('Tudo é executado uma única vez depois de todos os casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Tudo aqui é executado sempre antes de cada caso de teste')
    // })

    //esse é o nome do cenário: 
    //it.skip é para pular os teste e realizar somente o que precisa
    it('User should be deliver', function() {

        var deliver = signupFactory.deliver()

        // variável entregador que vai receber os valores do informado armazenar e usar no cadastrado.
        //var deliver = {
            //elemento do tipo input pra receber o nome, todos os campos input são usadas para entrada de texto, input tb pode ser um botão para inserção de campo tipo button
            //Placeholder (faz a função do label, texto com a descrição do campo) é um ex no campo para entrada de dandos dentro da entrada do texto
            //Cypress não da suport para Xpath, tem que instalar um plugin
            // name: 'Rodrigo Lima',
            // cpf: '00000014111',
            // email: 'rlima@qaninja.com',
            // whatsapp: '999999999',
            // address: {
            //     postalcode: '30810600',
            //     street: 'Rua Antônio Pio Cardoso',
            //     number: '222',
            //     details: 'Casa',
            //     district: 'Paquetá',
            //     city_state: 'Belo Horizonte/MG'
            // },
            // UL agrupador de lista e os li são itnes de lista do html, tem o elemento pai para pegar os elementos filhos.
            // para trazere a classa = .delivery-method li pode usar xpath (não tem suporte), pode fazer uma busca por texto do pai até chegar ao filho

            // delivery_method: 'Moto',
            // cnh: 'cnh-digital.jpg'
      //  }
        //criando uma instância da página 

        signupPage.go()
        //signup é no nome que foi dado ao cenário dentro do deliver.json
        signupPage.fillForm(deliver)
        signupPage.submit()

        // com o nome da mensagem muito grande vai ser criada uma const, const é um objeto inmutável então ela não vai sofre alteração
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        //vai buscar os elementos pra retornar a mensagem gerada
        signupPage.modalContentShouldBe(expectedMessage)

    })

    it('incorrect document', function() {

        var deliver = signupFactory.deliver()

        deliver.cpf = 'aa000000011'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShoulBe('Oops! CPF inválido')
    })

    it('Incorrect e-amil', function(){

        var deliver = signupFactory.deliver()

        deliver.email = 'paula.arauda.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShoulBe('Oops! Email com formato inválidu.')

    })

    //para poder continuar com o texto quando apenas um passo falhar e excutar todo os outros
    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        //sem beforeEach para executar apenas 1x 
        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShoulBe(msg.output)
            })
        })
    })

})