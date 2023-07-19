import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UservalidationValidator from "App/Validators/UservalidationValidator";
import ServiceNameService from "App/Services/Fecth";

export default class UsersController {
  public async index({ request}: HttpContextContract) {
    const payload: any = await request.validate(
      UservalidationValidator.postSchema
    );
    const load = await ServiceNameService.Fecth(payload);

    return load;
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
