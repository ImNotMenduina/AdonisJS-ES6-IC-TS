import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class ManagesController {
  public async manage({ view }: HttpContextContract) {
    const users = await User.query().orderBy('email')

    const roles = await Role.query().orderBy('name')

    return view.render('users/manage', { users, roles })
  }

  public async role({ request, response, params }: HttpContextContract) {
    const roleSchema = schema.create({
      role_id: schema.number([rules.exists({ table: 'roles', column: 'id' })]),
    })

    const data = await request.validate({ schema: roleSchema })
    const user = await User.findOrFail(params.id)
    await user.merge(data).save()

    await response.redirect().back()
  }
}
