import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import ServiceNameService from 'App/Services/Fetching';
  import Validator1Validator from 'App/Validators/Validator1Validator';
export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async getDesignationList({request,response}: HttpContextContract) {
    // const orgid = request.input('orgid', 0);


    
    
    
    const payload: any = await request.validate(Validator1Validator.postSchema, )
    //  return payload
const designations = await ServiceNameService.Fetching(payload)
   
   return response.ok(designations)
  








  }



  
  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
