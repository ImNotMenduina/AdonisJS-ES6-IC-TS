import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import { AUTH } from 'sqlite3'

export default class UserloginsController {
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login(ctx: HttpContextContract) {
    const validateData = await ctx.request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      }),

      messages: {
        'email.required': 'Email não encontrado',
        'password.required': 'Senha obrigatória',
      },
    })

    //const user = await User.findByOrFail('email', validateData.email)

    //AUTHENTICATION

    await ctx.auth.attempt(validateData.email, validateData.password)
    return ctx.response.redirect('/dashboard')
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.logout()
    return ctx.response.redirect('/login')
  }
}
