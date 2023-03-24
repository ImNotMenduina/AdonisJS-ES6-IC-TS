// import Factory from '@ioc:Adonis/Lucid/Factory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory
  .define(User, ({ faker }) => {

    const fake_username = faker.internet.userName()

    return {
      username: fake_username,
      email: `${fake_username}@gmail.com`,
      senha: faker.internet.password()
    }
  })
  .build()
