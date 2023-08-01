import Route from '@ioc:Adonis/Core/Route'
import GeofencesController from 'App/Controllers/Http/GeofencesController'

Route.get('getgeofence','GeofencesController.getgeofence')
Route.post('addgeofence','GeofencesController.addgeofence')