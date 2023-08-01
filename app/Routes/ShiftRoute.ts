import Route from '@ioc:Adonis/Core/Route'

Route.get('/','ShiftsController.index').middleware('throttle:global')
Route.get('/show','ShiftsController.show').middleware('throttle:global')
Route.get('/create','ShiftsController.create').middleware('throttle:global')