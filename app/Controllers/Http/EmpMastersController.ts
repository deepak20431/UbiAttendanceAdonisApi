import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmpMasterService from 'App/Services/EmpMasterService';
import EmpMasterValidator from 'App/Validators/EmpMasterValidator';

export default class EmpMastersController {

    
    public async getEmployeesList({request,response}: HttpContextContract) {

    const emp:any = await request.validate(EmpMasterValidator.EmpMasterschema)

    const empl = await EmpMasterService.fetch(emp);

    return response.json(empl);
    
}
}