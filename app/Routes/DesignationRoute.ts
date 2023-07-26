import Route from '@ioc:Adonis/Core/Route'


Route.get('/fetch','DesigantionsController.retreiveDesign')
Route.post('/add','DesigantionsController.AddDesign')
Route.put('/update','DesigantionsController.UpdateDesign')

