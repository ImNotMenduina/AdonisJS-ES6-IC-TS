import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class CadastroUsersController {
  public async cadastro({request , response} : HttpContextContract)
    {
      //trim remove os espaços brancos a esquerda

      const my_schema = schema.create({
        username : schema.string([rules.minLength(3) , rules.trim() ]) ,
        email : schema.string([ rules.email() , rules.unique({ table: 'users' , column: 'email'}) ]) ,
        senha : schema.string([ rules.minLength(3) ])
      })

      try{

        //validação body contra o schema criado anteriormente.
        //(Faz o match)

        const validation = await request.validate({
          schema : my_schema
        })

        //instancio o Model, atribui para cada atributo
        //o valor validado anteriormente

        const user = new User
        user.username = validation.username
        user.email = validation.email
        user.senha = validation.senha

        //salva os dados no banco SQLite
        await user.save()

      }
      catch(e)
      {
        response.badRequest(e.messages)
      }

    }
}
