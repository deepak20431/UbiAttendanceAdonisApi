import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShiftsService from 'App/Services/ShiftsService';
import ShiftValidator from 'App/Validators/ShiftValidator';

export default class ShiftsController {
  public async index({ }: HttpContextContract) {
  console.log('test');
  
    return 'deepak';
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({request,response }: HttpContextContract)
  {
    //const parameters = await request.all()
    const a = await request.validate(ShiftValidator.shifts);
    const b = await ShiftsService.getShiftData(a)
   console.log(b.length)
    response.json(b);
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
