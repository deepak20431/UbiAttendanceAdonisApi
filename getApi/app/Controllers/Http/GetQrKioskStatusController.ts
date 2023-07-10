import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetQrKioskStatusService from 'App/Services/GetQrKioskStatusService';
import GetQrKioskStatusValidator from 'App/Validators/GetQrKioskStatusValidator';

export default class GetQrKioskStatusController {

    public async getQrKioskStatus({ request, response }: HttpContextContract) {

        const a: any = await request.validate(GetQrKioskStatusValidator.GetQrschema);

        const b = await GetQrKioskStatusService.Get(a);

        return response.json(b);
    }
}