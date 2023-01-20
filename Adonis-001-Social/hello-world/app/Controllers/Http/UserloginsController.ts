import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserloginsController {
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


  }
}
