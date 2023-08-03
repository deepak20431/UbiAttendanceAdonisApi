import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeValidator from 'App/Validators/EmployeeValidator';
import EmployeeService from 'App/Services/EmployeeService';

export default class EmployeesController {
    private data: any = [];
    public async emplist({ request, response }: HttpContextContract) {
        try{
            const validation = await request.validate(EmployeeValidator.empvalid)
            this.data['orgid'] = validation.refno;
            this.data['adminid'] = validation.empid;
            this.data['status'] = validation.status ? validation.status : 1;
            this.data['currentPage'] = validation.currentPage ? validation.currentPage : 0;
            this.data['perpage'] = validation.perpage ? validation.perpage : 10;
            this.data['searchval'] = validation.searchval ? validation.searchval : '';
            const result = await EmployeeService.prototype.Employeelist(this.data);
            return response.json(result);
        }catch(err){
            response.status(400).send({ Error: "Invalid Request", Name: err })  
        }
    }
    public async deleteEmployee({ request, response }: HttpContextContract) {
        try {
            const validation = await request.validate(EmployeeValidator.deleteemp);
            this.data['empid'] = validation.EmpId;
            this.data['Orgid'] = validation.Orgid;
            this.data['status'] = validation.status;//user status active or Inactive 
            this.data['permission'] = validation.permission; //user,admin,depthead
            this.data['adminid'] = validation.adminid;
            this.data['adminname'] = validation.adminname;
            this.data['empname'] = validation.EmpName;
            
            if (this.data['permission'] == 1) {

                response.status(400).send({ Error: "Permission Denied", Name: "Admin Can't Inactive" })
            } else if (this.data['permission'] == 2) {

                response.status(400).send({ Error: "Permission Denied", Name: "Department Head Can't Inactive" })
            } else {
               
                const result = await EmployeeService.prototype.changests(this.data);
                if (result == true) {
                    response.status(200).send({ Messsage: result, Name: "Updated SuccessFully "})
                }
            }
        } catch (err) {
            response.status(400).send({ Error: err });
        }
    }
}
