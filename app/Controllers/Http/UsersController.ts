import { Request } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

import UservalidationValidator from 'App/Validators/UservalidationValidator';
import ServiceNameService from 'App/Services/Fecth';

export default class UsersController {
  public async index({request,response}: HttpContextContract) {
    

    const payload: any = await request.validate(UservalidationValidator.postSchema, )
   const load = await ServiceNameService.Fecth(payload)
    
   return load
  }
  
  public async create({}: HttpContextContract) {
  
  }
  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {
    return[
      {
        id:1,
        title:'hello world',
      },{
        id:2,
        tittle:'Hello universe',
      },

    ]
  }

  public async destroy({params}: HttpContextContract) {
    const p = params.id
    const v = params.p
    //  // Generate URL for the named route "dashboard.index" without parameters
     const url = Route.makeUrl('/test/:id/:p', { id: p,p:v },{
prefixUrl:'http',qs:{
  test: 'xx'
}
     })
return url









}
}