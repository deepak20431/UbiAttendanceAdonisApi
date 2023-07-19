

// import Route from '@ioc:Adonis/Core/Route'
// Route.get('/user','UsersController.create')

import Route from '@ioc:Adonis/Core/Route'
// import User1sController from 'App/Controllers/Http/HolidayMastersController'
// import UsersController from 'App/Controllers/Http/UsersController'
// Route.get('/posts', async (ctx) => {
//   return new UsersController().edit(ctx)
// })

// Route.get('/post', async (ctx) => {
//   const { default: PostsController } = await import(
//     'App/Controllers/Http/HolidayMastersController'
    
//   )
//   return new PostsController().index(ctx)
// })

// Route.post('/newsletter', 'UsersController')
Route.get('/user','UsersController.index')
