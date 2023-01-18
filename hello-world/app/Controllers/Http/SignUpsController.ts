//import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


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

        try
        {
            const payload = await request.validate({schema : newPostSchema}) 

        } catch(error)
        {
            response.badRequest(error.messages)
        } 
        
        
    }
}
