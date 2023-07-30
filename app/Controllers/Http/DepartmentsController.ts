import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartmentValidator from 'App/Validators/DepartmentValidator';
import DepartmentService from 'App/Services/DepartmentService';

export default class DepartmentsController {

    public async getdepartment({ request, response }: HttpContextContract) {
        
        const a = await request.validate(DepartmentValidator.getdepartment);

        const b = await DepartmentService.getdepartment(a);
        //console.log(b);
        if(b.length > 0){ 
               // console.log({message:"success",data:b});
                response.status(200).send({message:"success",data:{b}});
        }else{
                response.status(400).send({message:"Unsuccess",data:b}) ;    
        }
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
