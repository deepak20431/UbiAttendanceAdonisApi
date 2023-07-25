import Route from '@ioc:Adonis/Core/Route'


Route.get('/users','DesigantionsController.retreiveDesign')
Route.post('/use','DesigantionsController.AddDesign')
Route.put('/fetch','DesigantionsController.UpdateDesign')