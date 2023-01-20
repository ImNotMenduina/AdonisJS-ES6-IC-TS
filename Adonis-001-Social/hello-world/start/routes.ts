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

Route.post('/signup', 'UsersignupsController.signup')
Route.post('/login', 'UserloginsController.login')
Route.post('/logout', 'UserloginsController.logout')
