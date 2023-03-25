import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { ProfileFactory, UserFactory } from 'Database/factories'

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
      agente: 'Astra' ,
      patente: 'Platina' ,
      classe: 'Smoker' ,
      arma_fav: 'Operator'
    })

    response.assertStatus(200)
  })

  test('espera-se -> cadastro_invalido_email_já_consta', async ({ client }) => {

    const signup =  await UserFactory.with('profile').create()

    const response = await client.post('/signup').form({

      username: 'HeadShot123' ,
      email: signup.email,
      senha:  'hs123456',
      patente: 'Ouro' ,
      agente: 'Omen',
      classe:  'Smoker' ,
      arma_fav: 'Phantom'
    })

   response.assertStatus(400)
    })

  test('espera-se -> senha_invalida_min_6', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'NO_Valorant1taptap',
      email: 'So_MatoComSkin@gmail.com',
      senha: 'vava1',
      patente: 'Imortal' ,
      agente: 'Cypher',
      classe:  'Sentinela' ,
      arma_fav: 'Ghost'
    })

    response.assertStatus(400)
  })

  test('espera-se -> username_inválido_min_3', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'Jô',
      email: 'jojoTodynho@gmail.com',
      senha: 'JOJO2023',
      patente: 'Bronze' ,
      agente: 'Sova',
      classe:  'Iniciador' ,
      arma_fav: 'Vandal'
    })

    response.assertStatus(400)
  })



})
