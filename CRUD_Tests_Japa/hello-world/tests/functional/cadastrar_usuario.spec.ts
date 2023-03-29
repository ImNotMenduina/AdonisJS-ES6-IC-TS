import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
//import { assert } from '@japa/assert'

test.group('Cadastrar usuario', (group) => {
  //Insere os dados na table
  //Ao fim dos testes remove os dados inseridos (estado anterior)
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })
  // Write your test here
  test('espera-se -> cadastro_valido', async ({ client, assert }) => {
    const user_username = 'Menduina19_TiroCerto'
    const user_email = 'lucasmenduina.cc@gmail.com'
    const user_senha = 'admin1999'
    const user_patente = 'Platina'
    const user_agente = 'Astra'
    const user_classe = 'Smoker'
    const user_arma = 'Vandal'

    const response = await client.post('/signup').form({
      username: user_username,
      email: user_email,
      senha: user_senha,
      agente: user_agente,
      patente: user_patente,
      classe: user_classe,
      arma_fav: user_arma,
    })

    response.assertStatus(200)

    const userCreated = await User
    .query()
    .where('email', user_email)
    .preload('profile')

    assert.equal(userCreated[0].username, user_username)
    assert.equal(userCreated[0].senha, user_senha)
    assert.equal(userCreated[0].profile.patente, user_patente)
    assert.equal(userCreated[0].profile.agente, user_agente)
    assert.equal(userCreated[0].profile.classe, user_classe)
    assert.equal(userCreated[0].profile.arma_fav, user_arma)
  })

  test('espera-se -> cadastro_invalido_email_já_consta', async ({ client, assert }) => {
    const signup = await UserFactory.with('profile').create()

    const response = await client.post('/signup').form({
      username: 'HeadShot123',
      email: signup.email,
      senha: 'hs123456',
      patente: 'Ouro',
      agente: 'Omen',
      classe: 'Smoker',
      arma_fav: 'Phantom',
    })

    response.assertStatus(400)
  })

  test('espera-se -> senha_invalida_min_6', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'NO_Valorant1taptap',
      email: 'So_MatoComSkin@gmail.com',
      senha: 'vava1',
      patente: 'Imortal',
      agente: 'Cypher',
      classe: 'Sentinela',
      arma_fav: 'Ghost',
    })

    response.assertStatus(400)
  })

  test('espera-se -> username_inválido_min_3', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'Jô',
      email: 'jojoTodynho@gmail.com',
      senha: 'JOJO2023',
      patente: 'Bronze',
      agente: 'Sova',
      classe: 'Iniciador',
      arma_fav: 'Vandal',
    })

    response.assertStatus(400)
  })
})
