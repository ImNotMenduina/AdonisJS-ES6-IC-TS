import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema , rules } from '@ioc:Adonis/Core/Validator'

export default class UsersignupsController {
  public async signup(ctx : HttpContextContract)
  {
    const validateData = await ctx.request.validate({
      schema : schema.create({
        username : schema.string({} , [rules.minLength(3) , rules.regex(/^[a-zA-Z0-9]+$/)]) ,
        email : schema.string() ,
        password : schema.string({} , [rules.confirmed()]) ,
      })
    })

    return validateData
    //const dataValidated

  }
}
