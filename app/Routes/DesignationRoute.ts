import Route from '@ioc:Adonis/Core/Route'

Route.get('/fetch', 'DesignationsController.retreiveDesign').middleware('throttle:global').middleware('auth')


Route.post('/add', 'DesignationsController.AddDesign').middleware('throttle:global').middleware('auth')

Route.put('/update', 'DesignationsController.UpdateDesign').middleware('throttle:global').middleware('auth')

