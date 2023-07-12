
import Route from '@ioc:Adonis/Core/Route'


    
Route.get('docs/:cat/*', ({ params }) => {
    return params.cat
  })


  Route.get('/user','UsersController.index')