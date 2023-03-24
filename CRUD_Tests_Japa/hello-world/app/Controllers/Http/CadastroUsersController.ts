import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class CadastroUsersController {
  public async cadastro({ request, response }: HttpContextContract) {
    //trim remove os espaços brancos a esquerda

    const my_schema = schema.create({
      username: schema.string([rules.minLength(3), rules.trim()]),
      email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      senha: schema.string([rules.minLength(6)]),
      agente: schema.string(),
      classe: schema.string(),
      patente: schema.string(),
      arma_fav: schema.string(),
    })

    try {
      //validação body contra o schema criado anteriormente.
      //(Faz o match)

      const validation = await request.validate({
        schema: my_schema,
      })

      const user = new User()
      user.username = validation.username
      user.email = validation.email
      user.senha = validation.senha

      const profile = new Profile()
      profile.patente = validation.patente
      profile.agente = validation.agente
      profile.classe = validation.classe
      profile.arma_fav = validation.arma_fav

      await user.related('profile').save(profile)

    } catch (e) {
      response.badRequest(e.messages)
    }
  }
}
