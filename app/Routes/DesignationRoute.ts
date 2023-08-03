import Route from '@ioc:Adonis/Core/Route'

Route.get('/fetchdesignation', 'DesignationsController.retreiveDesign')


Route.post('/adddesignation', 'DesignationsController.AddDesign')

Route.put('/update', 'DesignationsController.UpdateDesign')

