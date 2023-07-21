import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import getLastTimeOut from 'App/Validators/getLastTimeOutValidator'
import getLastTimeOutModel from 'App/Models/getLastTimeOutModel'
import getLastTimeOutService from 'App/Services/getLastTimeOutService'
import getLastTimeOutValidator from 'App/Validators/getLastTimeOutValidator'
import Database from '@ioc:Adonis/Lucid/Database'


export default class getMultishiftslistservice{

 static async getmultishift(datas){

var res:any[]=[];

   const query = await Database.from('ShiftPlanner').where('empid',datas.EmployeeId).andWhere('orgid',datas.OrganizationId);
//    return query;
     

query.forEach(function(row){
    var data:any[]=[]
    data['shiftdate']= row.Shiftdate;
    data['shiftid']= row.shiftid;
    data['weekoffStatus'] = row.weekoffStatus;
    data['Id'] = row.Id;
    res.push(data)

})


const query1=  await Database.from('ShiftMaster').where('OrganizationId',datas.OrganizationId).andWhere('Id',data);

    return query1;
 }
    
}