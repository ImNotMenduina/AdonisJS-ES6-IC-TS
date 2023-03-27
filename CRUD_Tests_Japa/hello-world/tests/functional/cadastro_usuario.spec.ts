import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'
//import { assert } from '@japa/assert'

test.group('Cadastro usuario', (group) => {
  //Insere os dados na table
  //Ao fim dos testes remove os dados inseridos (estado anterior)
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })
  // Write your test here
  test('espera-se -> email_valido', async ({ client }) => {
    const response = await client.post('/signup').form({
      username: 'Menduina19_TiroCerto',
      email: 'lucasmenduina.cc@gmail.com',
      senha: 'admin1999',
      agente: 'Astra',
      patente: 'Platina',
      classe: 'Smoker',
      arma_fav: 'Operator',
    })

    response.assertStatus(200)
  })

  test('espera-se -> cadastro_invalido_email_já_consta', async ({ client }) => {
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

  /*
  //////////////////////// BUSCA USUARIO

  test('espera-se -> encontrar o usuário inserido', async ({ client }) => {
    const user = await UserFactory.with('profile').create()
    const response = await client.get(`findUser/${user.email}`)
    response.assertStatus(200)
  })

  test('espera-se -> usuário não encontrado', async ({ client }) => {
    await UserFactory.with('profile').createMany(15)
    const email_buscado = 'lucasmenduina.cc@gmail.com'
    const response = await client.get(`findUser/${email_buscado}`)
    response.assertStatus(400)
  }) */
})
