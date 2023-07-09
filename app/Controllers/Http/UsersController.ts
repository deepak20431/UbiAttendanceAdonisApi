import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Post from 'App/Models/Post';
import { DateTime } from 'luxon';
  

export default class UsersController {
  public async index({}: HttpContextContract) {
    
    
    
   
    
  }

  public async getSelectedEmployeeShift({request}: HttpContextContract) {
    const orgid = request.input('orgid', '0')
    
      const empid = request.input('empid', '0')
      const shiftid = await this.getShiftIdByEmpID(empid)
      const res: { Id: number, Name: string,Timein:DateTime,Timeout:DateTime,shifttype:string,Hoursperday	:number  }[] = [];

      

      const query = await Database.from('ShiftMaster')
      

      // const rowCount = await Database.from('shiftmaster')
      // const Rows = rowCount[0].total;
      const rows = await Database.from('ShiftMaster')
      .select('Id', 'Name', 'Timein', 'Timeout', 'shifttype', 'Hoursperday')
      .where('Id', shiftid)
       
    
    
      if (rows.length > 0) {
        rows.forEach((row) =>{  
          const data:any= [];
          data['Id'] = row.Id,
          data['Name'] = row.Name,
        
          data['Timein'] = row.Timein,
          data['Timeout'] = row.Timeout,
          data['shifttype'] = row.shifttype,

          data['Hoursperday'] = row.Hoursperday,

          // res.push(data)
        
        res.push(data['Id'], data['Name'], data['Timein'],  data['Timeout'],data['shifttype'],data['Hoursperday'])
          
        }) 
        return res
      }
  }

  async getShiftIdByEmpID(empid) {
    // Implement your logic to fetch the shift ID based on the employee ID
  //   // You can use the AdonisJS database query builder or any other approach
  //   // and return the shift ID
  //   // For demonstration purposes, returning a mock shift ID
    return empid
  }

  

  public async create({}: HttpContextContract) {}

  public async   edit({}: HttpContextContract) {
     
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {
    

  








}
}