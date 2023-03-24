import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Cadastro usuario', (group) => {

  //Insere os dados na table
  //Ao fim dos testes remove os dados inseridos
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })

  // Write your test here
  test('espera-se -> email_valido' , async ({ client })=>{

    const response = await client.post('/signup').json({
      username: 'Menduina19_TiroCerto' ,
      email: 'lucasmenduina.cc@gmail.com' ,
      senha: 'admin1999'
    })
    //console.log(user.username)
    response.assertStatus(200)
  })

  test('espera-se -> email_invalido' , async ({client})=>{

    const response = await client.post('/signup').json({
      username: 'MyNameIsMenduina123' ,
      email: 'menduiña_cara_de_fuinha.com' ,
      senha: 'lucas12345'
    })

    response.assertStatus(400)
  })
  test('espera-se -> senha_invalida_min_6' , async ({client})=>{

    const response = await client.post('/signup').json({
      username: 'NO_Valorant1taptap' ,
      email: 'So_MatoComSkin@gmail.com' ,
      senha: 'vava1'
    })

    response.assertStatus(400)
  })

  test('espera-se -> username_inválido_min_3' , async ({client})=>{

    const response = await client.post('/signup').json({
      username: 'Jô' ,
      email: 'jojoTodynho@gmail.com' ,
      senha: 'JOJO2023'
    })

    response.assertStatus(400)
  })

})
