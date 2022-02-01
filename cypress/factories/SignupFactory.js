var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '999999999',
            address: {
                postalcode: '30810600',
                street: 'Rua Antônio Pio Cardoso',
                number: '222',
                details: 'Casa',
                district: 'Paquetá',
                city_state: 'Belo Horizonte/MG'
            },
            'delivery_method': 'Moto',
            'cnh': 'cnh-digital.jpg'
        }

        return data

    }
}