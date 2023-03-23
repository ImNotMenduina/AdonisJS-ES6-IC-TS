import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('User store', () => {
  // Write your test here
  test('email valido', async ({ client }) => {
    //const user = await UserFactory.create()
    const response = await client.post('/signup').json(
      {
        email: "Lucasmednuina.cc@outlook.com" ,
        password: "123",
        password_2: "123" ,
        nome: "Lucas" ,
        sobrenome: "MEneidao"
    })

    response.assertStatus(200)

  })
})
