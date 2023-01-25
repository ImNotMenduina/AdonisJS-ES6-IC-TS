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

  public async delete({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    await response.redirect().back()
  }

  public async update_form_view({ view, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const state = {
      editUser: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }

    return view.render('users/update', state)
  }

  public async updated({ request, response }: HttpContextContract) {
    const schemaData = await schema.create({
      id: schema.number(),
      username: schema.string([rules.minLength(8)]),
      email: schema.string([rules.email()]),
    })
    const data = await request.validate({ schema: schemaData })

    const user = await User.findOrFail(data.id)

    user.username = data.username
    user.email = data.email

    await user.save()

    return response.redirect().toRoute('users.manage')
  }
}
