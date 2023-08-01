import Route from '@ioc:Adonis/Core/Route'

Route.get('/fetch','DesignationsController.retreiveDesign').middleware('throttle:global')

Route.post('/add','DesignationsController.AddDesign').middleware('throttle:global')
Route.put('/update','DesignationsController.UpdateDesign').middleware('throttle:global')
