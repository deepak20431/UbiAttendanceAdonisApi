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
 import './routesTwo'

 Route.get('/getSet','GetSetKioskPinsController.getSetKioskPin').name='route';
 Route.get('/setQrKioskPin','setQrKioskPinController.setQrKioskPin').name='setQrKioskPin';

// Route.get('/users/:id', 'UserController.show').as('user').name('user')


