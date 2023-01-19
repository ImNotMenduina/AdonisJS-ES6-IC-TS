//import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User' //importante importar o model, pois ele cuidadará de todas as queryies dentro da table no banco de dados 


export default class SignUpsController {
    public async index({request , response} : HttpContextContract)
    {
        const newPostSchema = schema.create({
            name : schema.string() ,
            email : schema.string({} , 
                    [
                        rules.email() , 
                        rules.unique({table: 'users' , column: 'email' })
                     ] ) ,

            password : schema.string({} , 
                [
                    rules.confirmed('password_confirmation')]) , 
            password_confirmation : schema.string()

        })

        const payload = await request.validate({schema : newPostSchema , 
        
        messages : {
                'name.required' : 'Insira seu nome' , 
                'email.required' : 'Insira um e-mail válido' , 
                'password.required' : 'Senhas não coincidem' , 
                'password_confirmation.required' : 'Senhas não coincidem'
        }
        })
       /*  try
        {
            const payload = await request.validate({schema : newPostSchema}) 

        } catch(error)
        {
            response.badRequest(error.messages)
        } 
         */

        const user = new User()
        user.name = payload.name 
        user.email = payload.email 
        user.password = payload.password
        await user.save() 

        return response.redirect('/') 
    }
}
