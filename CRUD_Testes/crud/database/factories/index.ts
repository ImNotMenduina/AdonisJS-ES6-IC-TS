import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      nome: faker.internet.userName(),
      sobrenome: faker.internet.userName(),
      idade: Math.floor(Math.random() * 80) + 18 ,
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .build()
