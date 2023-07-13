import { Request } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  
import UservalidationValidator from 'App/Validators/UservalidationValidator';
import ServiceNameService from 'App/Services/Fecth';

export default class UsersController {
  public async index({request,response}: HttpContextContract) {
    
    // const orgid = request.input('orgid',0)
    // const Date = request.input('newdate','')
    // const empId = request.input('empId','')

    const payload: any = await request.validate(UservalidationValidator.postSchema, )
   const load = await ServiceNameService.Fecth(payload)
    
   return load
  }
  

  // public async getDeviceInfoCount({request,response}: HttpContextContract) {
  //   const deviceidpreference = request.input('deviceidpreference', '');
  //   const orgid = request.input('orgid','');

  //     const empid = request.input('empid', '');
      
  //     const Display = await ServiceNameService.Fecth(deviceidpreference,orgid,empid)
   
  //     return response.ok(Display )
  
  // }
  public async create({}: HttpContextContract) {
    let d = new Date(Date.UTC(2020, 9, 26, 7, 0, 0));
let result = d.toLocaleString();
console.log("Date and Time of apocalypse: "+ result);


let d1 = new Date();
let result2 = d1.toLocaleString();
console.log("date and time as a string = " + result2);
  }

  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {
    

  








}
}