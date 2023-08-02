import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    
Route.get('/fetch','DesignationsController.retreiveDesign')

Route.post('/add','DesignationsController.AddDesign')
Route.put('/update','DesignationsController.UpdateDesign')
  }).namespace('App/Controllers/Http')
