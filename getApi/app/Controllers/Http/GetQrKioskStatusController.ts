import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAdminQrKioskPinService from 'App/Services/GetAdminQrKioskPinService';
import GetQrKioskStatusService from 'App/Services/GetQrKioskStatusService';
import GetQrKioskStatusValidator from 'App/Validators/GetQrKioskStatusValidator';

export default class GetQrKioskStatusController {

    public async getQrKioskStatus({ request, response }: HttpContextContract) {

        const a: any = await request.validate(GetQrKioskStatusValidator.GetQrschema);

        const b = await GetQrKioskStatusService.GetQr(a);

        return response.json(b);
    }

    public async getAdminQrKioskPin({ request,response }: HttpContextContract){

        const c :any = await request.validate(GetQrKioskStatusValidator.GetQrschema);

        const d = await GetAdminQrKioskPinService.GetAdminQrKioskPin(c);

        return response.json(d);

    }
}