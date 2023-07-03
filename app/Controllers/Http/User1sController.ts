//import { Request, Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { DateTime } from 'luxon';
import Validator from 'App/Validators/Validator'
//import Database from '@ioc:Adonis/Lucid/Database'
import ServiceOne from 'App/Services/serviceOne'
// import  Holiday from "App/Models/holidays";



export default class User1sController {

  public async index({request,response}: HttpContextContract){
    
    //const orgId : any = await request.only(['OrganizationId'])
    const valid:any = await request.validate(Validator.newPostSchema)

    const result = await ServiceOne.Services1(valid)
    return response.json(result) 
           
}
  
  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
