import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import session from 'Config/session'
/* import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User' */

export default class UserloginsController {
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login(ctx: HttpContextContract) {
    /* const validateData = await ctx.request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      }),

      messages: {
        'email.required': 'Email não encontrado',
        'password.required': 'Senha obrigatória',
      },
    }) */ //NAO QUEREMOS VALIDAR NADA NO LOGIN
    const { uid, password } = ctx.request.only(['uid', 'password'])

    //const user = await User.findByOrFail('email', validateData.email)

    //AUTHENTICATION
    try {
      await ctx.auth.attempt(uid, password)
    } catch (error) {
      ctx.session.flash('form', 'Senha ou Email incorretos')

      return ctx.response.redirect().back()
    }
    return ctx.response.redirect('/')
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.logout()

    return ctx.response.redirect().toRoute('auth.login.show')
  }
}
