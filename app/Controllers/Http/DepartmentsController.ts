import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartmentValidator from 'App/Validators/DepartmentValidator';
import DepartmentService from 'App/Services/DepartmentService';
<<<<<<< HEAD

export default class DepartmentsController {

    public async getdepartment({ request, response }: HttpContextContract) {

        const a = await request.validate(DepartmentValidator.getdepartment);

        const b = await DepartmentService.getdepartment(a);

        return response.json(b);
    }

    public async addDept({ request, response }: HttpContextContract) {

        const a = await request.validate(DepartmentValidator.addepartment);

        const b = await DepartmentService.addDept(a);

        return response.json(b);
    }

    public async updatedept({ request, response }: HttpContextContract) {

        const a = await request.validate(DepartmentValidator.updatedept);

        const b = await DepartmentService.updatedept(a);

        return response.json(b);
    }
}


=======

export default class DepartmentsController {

    public async getdepartment({ request, response }: HttpContextContract) {
        
        const a = await request.validate(DepartmentValidator.getdepartment);

        const b = await DepartmentService.getdepartment(a);

        return response.json(b);
    }

    public async addDept({ request, response }: HttpContextContract) {

        const a = await request.validate(DepartmentValidator.addepartment);

        const b = await DepartmentService.addDept(a);

        return response.json(b);
    }

    public async updatedept({ request, response }: HttpContextContract) {

        const a = await request.validate(DepartmentValidator.updatedept);

        const b = await DepartmentService.updatedept(a);

        return response.json(b);
    }
}
>>>>>>> 2be0a3ec0fc591851bc9e4575a474fa3201726f1
