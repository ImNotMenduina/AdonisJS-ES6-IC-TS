import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

test.group('Atualizar usuario', (group) => {
  //Insere os dados na table
  //Ao fim dos testes remove os dados inseridos (estado anterior)
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })
  test('espera-se -> atualizar_player', async ({ client, assert }) => {
    const user = await UserFactory.with('profile').create()

    const new_username = 'itz_menduina'
    const new_senha = 'senha_nova*'
    const new_patente = 'Radiante'
    const new_agente = 'Astra'
    const new_classe = 'Smoker'
    const new_arma = 'Operator'

    const response = await client.post(`update/${user.id}`).form({
      username: new_username,
      email: user.email,
      senha: new_senha,
      patente: new_patente,
      agente: new_agente,
      classe: new_classe,
      arma_fav: new_arma,
    })

    response.assertStatus(200)

    const userUpdated = await User.query().where('id', user.id).preload('profile')

    assert.equal(userUpdated[0].username, new_username)
    assert.equal(userUpdated[0].senha, new_senha)
    assert.equal(userUpdated[0].profile.patente, new_patente)
    assert.equal(userUpdated[0].profile.agente, new_agente)
    assert.equal(userUpdated[0].profile.classe, new_classe)
    assert.equal(userUpdated[0].profile.arma_fav, new_arma)
  })
})
