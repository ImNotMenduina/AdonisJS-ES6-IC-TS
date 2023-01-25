/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import { Request } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', 'UsersignupsController.signupShow').as('auth.signup.show')

Route.get('/login', 'UserloginsController.loginShow').as('auth.login.show')

Route.get('/admin', async ({ view }) => {
  return view.render('admin/admin')
})

Route.get('/dashboard', async ({ view }) => {
  return view.render('user/dashboard')
}).middleware('auth')

//POSTS

Route.post('signup', 'UsersignupsController.signup').as('auth.signup')
Route.post('login', 'UserloginsController.login').as('auth.login')
Route.get('logout', 'UserloginsController.logout').as('auth.logout')

Route.group(() => {
  Route.get('/manage', 'ManagesController.manage').as('manage')
  Route.patch('/:id/role', 'ManagesController.role').as('role')
  Route.delete('/:id', 'ManagesController.delete').as('delete_user')

  //UPDATE
  // Route.post('/:id' , 'ManagesController.update_user').as('update_user')
  Route.get('/:id', 'ManagesController.update_form_view').as('update_form')
  Route.post('', 'ManagesController.updated').as('updated')

  /* Route.patch('/:id', 'ManagesController.update').as('update_user') */
})
  .prefix('users')
  .as('users')

/*   Route.get('/:id' , async({}) =>{
    r
  }).as('update_form')
 */
