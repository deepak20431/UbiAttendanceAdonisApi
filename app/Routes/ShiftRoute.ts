import Route from '@ioc:Adonis/Core/Route'

Route.get('/','ShiftsController.index')
Route.get('/show','ShiftsController.show')
Route.get('/create','ShiftsController.create')