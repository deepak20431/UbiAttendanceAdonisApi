import Route from '@ioc:Adonis/Core/Route'

Route.post('/login','LoginController.checkLogin')
Route.put('/logout','LogoutsController.logout').middleware('auth')
