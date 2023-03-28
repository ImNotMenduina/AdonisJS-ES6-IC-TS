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

  public async read({ view }: HttpContextContract) {
    const users = await User.query().preload('profile')
    return view.render('usersList', { users })
  }

  public async updatePlayerForm({ view, request }: HttpContextContract) {
    const userID = await User.query().where('id', request.param('id')).preload('profile')
    const user = userID[0]
    //const users = await User.query().preload('profile')
    return view.render('userUpdate', { user })
  }

  public async update({ request, response }: HttpContextContract) {
    const user = await User.query().where('id', request.param('id'))
    const profile = await Profile.query().where('user_id', request.param('id'))

    const my_schema = schema.create({
      username: schema.string([rules.minLength(3), rules.trim()]),
      senha: schema.string([rules.minLength(6)]),
      email: schema.string([rules.email(), rules.equalTo(user[0].email)]),
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

      user[0].username = validation.username
      user[0].senha = validation.senha
      user[0].email = validation.email
      profile[0].patente = validation.patente
      profile[0].agente = validation.agente
      profile[0].classe = validation.classe
      profile[0].arma_fav = validation.arma_fav
      await user[0].related('profile').save(profile[0])

      return response.redirect().toRoute('/read')
    } catch (e) {
      return response.badRequest(e.messages)
    }
  }

  public async remove({ request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await user.delete()

    return response.redirect().toRoute('/read')
  }
}
