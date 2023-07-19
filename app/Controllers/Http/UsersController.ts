import { Request } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import Database from '@ioc:Adonis/Lucid/Database';
import UservalidationValidator from 'App/Validators/UservalidationValidator';
import ServiceNameService from 'App/Services/Fecth';

export default class UsersController {
  public async index({request,response}: HttpContextContract) {
    

    const payload: any = await request.validate(UservalidationValidator.postSchema, )
   const load = await ServiceNameService.Fecth(payload)
    
   return load
  }
  
  public async create({}: HttpContextContract) {


    
//     var queryA: any = Database.from("AttendanceMainMaster").select("AttendanceMainMaster.Id")
//     .where('AttendanceMainMaster.Id',8)
// // return queryA
//     // Fetch data from ModelB
//     var queryB: any = Database.from("ShiftMaster").select("ShiftMaster.Id")
//     .where("ShiftMaster.Id",13)
//   // return queryB
  
//     // Combine the results using JavaScript's concat method
//     const combinedResults = await queryA.unionAll(queryB);
  
//     return combinedResults;

    







    
  }

  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {
    

  








}
}