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
  return view.render('userSignup')
})

Route.post('/signup', 'CadastroUsersController.cadastro')
Route.post('update/:id', 'CadastroUsersController.update')
//Route.get('/findUser/:email', 'CadastroUsersController.busca')
Route.get('/read', 'CadastroUsersController.read')
Route.get('updateForm/:id', 'CadastroUsersController.updatePlayerForm')
Route.get('delete/:id', 'CadastroUsersController.remove')
