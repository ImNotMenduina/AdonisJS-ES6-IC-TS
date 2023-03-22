import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class SignupController {
    public async cadastro({request , response} : HttpContextContract)
    {
      //trim remove os espaços brancos a esquerda

      const my_schema = schema.create({
        nome : schema.string([rules.minLength(3) , rules.trim() ]) ,
        sobrenome : schema.string([rules.minLength(3)]) ,
        idade : schema.number([ rules.unsigned() , rules.range(18 , 110) ]) ,
        email : schema.string([ rules.email() , rules.unique({ table: 'users' , column: 'email'}) ]) ,
        password_1 : schema.string([ rules.confirmed('password_2') ]) ,
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
        user.nome = validation.nome
        user.sobrenome = validation.sobrenome
        user.idade = validation.idade
        user.email = validation.email
        user.password = validation.password_1

        //salva os dados no banco SQLite
        await user.save()

      }
      catch(e)
      {
        response.badRequest(e.messages)
      }

    }
}
