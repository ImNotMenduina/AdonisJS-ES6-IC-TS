import { Request, Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UserSignup from 'App/Models/UserSignup'

export default class AuthController {
      public async signup(ctx : HttpContextContract)
      {
          const mySchema = schema.create({
            name : schema.string() ,
            email : schema.string({} , [
              rules.unique({ table : 'users' , column : 'email'})
            ]) ,
            password : schema.string([
              rules.confirmed()
            ]),
            password_confirmation : schema.string({}) ,
          })


            const validated = await ctx.request.validate({ schema : mySchema })

            const user = new UserSignup
            user.name = validated.name
            user.email = validated.email
            user.password = validated.password
            await user.save()


      }

     /*  public async login({ request } : HttpContextContract => {

      }) */
}
