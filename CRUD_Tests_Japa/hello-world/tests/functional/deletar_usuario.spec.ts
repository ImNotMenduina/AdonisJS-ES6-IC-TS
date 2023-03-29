import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

test.group('Deletar usuario', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })
  test('espera-se -> remover_player', async ({ client, assert }) => {
    const user = await UserFactory.with('profile').create()
    const response = await client.get(`delete/${user.id}`)

    response.assertStatus(200)

    const findUser = await User.query().where('id', user.id).preload('profile')

    assert.notExists(findUser[0])
  })
})
