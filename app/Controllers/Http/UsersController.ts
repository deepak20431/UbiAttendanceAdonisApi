import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  
import ServiceNameService from 'App/Services/Fecth';

export default class UsersController {
  public async index({}: HttpContextContract) {
    

    
   
    
  }

  public async getDeviceInfoCount({request,response}: HttpContextContract) {
    const deviceidpreference = request.input('deviceidpreference', '');
    const orgid = request.input('orgdir','');

      const empid = request.input('empid', '');
      
      const Display = await ServiceNameService.Fecth(empid,deviceidpreference,orgid)
   
      return response.ok(Display )
  
  }
  public async create({}: HttpContextContract) {}

  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {
    

  








}
}