import Factory from '@ioc:Adonis/Lucid/Factory'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export const ProfileFactory = Factory.define(Profile, () => {
  const rand_agente = Math.floor(Math.random() * 19)
  let agentes: Array<String> = [
    'Astra',
    'Breach',
    'Brimstone',
    'Chamber',
    'Cypher',
    'Fade',
    'Jett',
    'KAY/O',
    'Killjoy',
    'Neon',
    'Omen',
    'Phoenix',
    'Raze',
    'Reyna',
    'Sage',
    'Skye',
    'Sova',
    'Viper',
    'Yoru',
  ]

  const rand_arma = Math.floor(Math.random() * 6)
  let arma: Array<String> = ['Phantom', 'Vandal', 'Spectre', 'Operator', 'Sherif', 'Ghost']

  const rand_patente = Math.floor(Math.random() * 9)
  let patente: Array<String> = [
    'Ferro',
    'Bronze',
    'Prata',
    'Ouro',
    'Platina',
    'Diamante',
    'Ascendente',
    'Imortal',
    'Radiante',
  ]

  let classe: string
  if (
    agentes[rand_agente] == 'Neon' ||
    agentes[rand_agente] == 'Raze' ||
    agentes[rand_agente] == 'Reyna' ||
    agentes[rand_agente] == 'Yoru' ||
    agentes[rand_agente] == 'Jett' ||
    agentes[rand_agente] == 'Phoenix'
  )
    classe = 'Duelista'
  else if (
    agentes[rand_agente] == 'Breach' ||
    agentes[rand_agente] == 'Fade' ||
    agentes[rand_agente] == 'KAY/O' ||
    agentes[rand_agente] == 'Skye' ||
    agentes[rand_agente] == 'Sova'
  )
    classe = 'Iniciador'
  else if (
    agentes[rand_agente] == 'Chamber' ||
    agentes[rand_agente] == 'Cypher' ||
    agentes[rand_agente] == 'Killjoy' ||
    agentes[rand_agente] == 'Sage'
  )
    classe = 'Sentinela'
  else if (
    agentes[rand_agente] == 'Astra' ||
    agentes[rand_agente] == 'Brimstone' ||
    agentes[rand_agente] == 'Omen' ||
    agentes[rand_agente] == 'Viper'
  )
    classe = 'Smoker'
  else classe = ''

  return {
    patente: `${patente[rand_patente]}`,
    agente: `${agentes[rand_agente]}`,
    arma_fav: `${arma[rand_arma]}`,
    classe: classe,
  }
}).build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  const fake_username = faker.internet.userName()
  return {
    username: fake_username,
    email: `${fake_username}@gmail.com`,
    senha: faker.internet.password(),
  }
})
  .relation('profile', () => ProfileFactory)
  .build()
