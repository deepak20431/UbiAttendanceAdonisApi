import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Designation from 'App/Services/DesignationService';
import DesignationValidator from 'App/Validators/DesignationValidator';

export default class DesigantionsController {
  
  public async retreiveDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(DesignationValidator.Designationschema);

    const b = await Designation.getDesignation(a);

    return response.json(b);
  }

  public async AddDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(DesignationValidator.AddDesignationschema);

    const b = await Designation.AddDesignation(a);

    return response.json(b);
  }


  public async UpdateDesign({ request, response }: HttpContextContract) {

    const a = await request.validate(DesignationValidator.updateDesignationschema);

    const b = await Designation.updateDesignation(a);

    return response.json(b);

    


}

public async Design({  }: HttpContextContract) {
  // const a = await request.validate(UserValidator.Designationschema);

}
}
