import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator';
import DesignationService from 'App/Services/Designation';
export default class DesigantionsController {
  
  public async retreiveDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(UserValidator.Designationschema);

    const b = await DesignationService.getDesignation(a);

    return response.json(b);
  }

  public async AddDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(UserValidator.AddDesignationschema);

    const b = await DesignationService.AddDesignation(a);

    return response.json(b);
  }


  public async UpdateDesign({ request, response }: HttpContextContract) {

    const a = await request.validate(UserValidator.updateDesignationschema);

    const b = await DesignationService.updateDesignation(a);

    return response.json(b);

    


}
}
