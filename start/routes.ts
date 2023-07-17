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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/Posts'
import { HttpContext } from '@adonisjs/core/build/standalone'
import UsersController from 'App/Controllers/Http/HolidayMastersController'
// Route.get('/',()=>{
//     return 'Hello world'
// })
 
Route.get('/test','UsersController.update')

// Route.get('/test/:id/:p','UsersController.destroy')


Route.get('/posts', async (ctx) => {
    return new UsersController().update(ctx)
  })