import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeValidator from 'App/Validators/EmployeeValidator';
import EmployeeService from 'App/Services/EmployeeService';

export default class EmployeesController {
        private data: any = [];
        public async emplist({ request, response }: HttpContextContract) {
                const validation = await request.validate(EmployeeValidator.empvalid)
                this.data['orgid'] = validation.refno;
                this.data['adminid'] = validation.empid;
                this.data['status'] = validation.status ? validation.status : 1;
                this.data['currentPage'] = validation.currentPage ? validation.currentPage : 0;
                this.data['perpage'] = validation.perpage ? validation.perpage : 10;
                this.data['searchval'] = validation.searchval ? validation.searchval : '';
                const result = await EmployeeService.prototype.Employeelist(this.data);
                return response.json(result);
        }
}
