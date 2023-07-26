import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import employeeInfo from 'App/Services/empinfo';
import EmpValidator from 'App/Validators/EmpValidator'

export default class EmployeeInfosController {
    private data:any=[];
    public async index({request,response}: HttpContextContract){   
       const validation = await request.validate(EmpValidator.empvalid)
       this.data['orgid']=validation.refno;
       this.data['adminid']=validation.empid;
       this.data['status']= validation.status?validation.status:1;
       this.data['currentPage']=validation.currentPage?validation.currentPage:0;
       this.data['perpage']=validation.perpage?validation.perpage:10;
       this.data['searchval']=validation.searchval?validation.searchval:'';
       const result = await employeeInfo.prototype.getEmployee(this.data);
       return response.json(result);


                  
    }





}
