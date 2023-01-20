import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersignupsController {
  public async signupShow({ view }: HttpContextContract) {
    return view.render('auth/signup')
  }

  public async signup(ctx: HttpContextContract) {
    const validateData = await ctx.request.validate({
      schema: schema.create({
        username: schema.string([rules.minLength(3), rules.regex(/^[a-zA-Z0-9]+$/)]),
        email: schema.string({ trim: true }, [rules.email() ,
          rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
        ]),
        password: schema.string([rules.confirmed()]),
      }),

      /* messages: {
        'username.required': 'insira um nome válido',
        'email.required': 'email inválido',
        'email.unique': 'email já cadastrado',
        'password.required': 'senha incompatítvel',
      }, */
    })

  /*   const dataModel = new User()
    dataModel.username = validateData.username
    dataModel.email = validateData.email
    dataModel.password = validateData.password
    await dataModel.save() */

    const user = await User.create(validateData)
    await ctx.auth.login(user)

    return ctx.response.redirect('/login')
    //const dataValidated
  }
}
