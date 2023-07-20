import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceNameService from 'App/Services/Fetchdata'
import Validator2Validator from 'App/Validators/Validator2Validator'

export default class Controller1sController {
  public async index({request,response}: HttpContextContract) {
    
    const payload: any = await request.validate(Validator2Validator.postSchema, )
   const load = await ServiceNameService.getabsapproveexcel(payload)
    
   return load
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
