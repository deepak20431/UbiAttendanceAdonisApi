import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Post from 'App/Models/Post';
import { DateTime } from 'luxon';
  
import ServiceNameService from 'App/Services/Fecth';

export default class UsersController {
  public async index({}: HttpContextContract) {
    

    
   
    
  }

  public async getSelectedEmployeeShift({request,response}: HttpContextContract) {
    const orgid = request.input('orgid', '0')
    
      const empid = request.input('empid', '0')
     
      const Display = await ServiceNameService.Fecth(empid)
   
      return response.ok(Display )
  
  }
  public async create({}: HttpContextContract) {}

  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {
    

  








}
}