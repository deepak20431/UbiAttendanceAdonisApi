import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schema from '@ioc:Adonis/Lucid/Schema';
import GetAdminQrKioskPinService from 'App/Services/GetAdminQrKioskPinService';
import GetQrKioskStatusService from 'App/Services/GetQrKioskStatusService';
import getMultishiftslistservice from 'App/Services/getMultiShiftsListservice';
import GetMultiShiftsListValidator from 'App/Validators/GetMultiShiftsListValidator';
import GetQrKioskStatusValidator from 'App/Validators/GetQrKioskStatusValidator';

export default class GetMultiShiftsListsController {

    public async getmultishift({request,response}:HttpContextContract){

        const a = await request.validate(GetMultiShiftsListValidator.getmultishiftlist);

        const b = await getMultishiftslistservice.getmultishift(a);

        return response.json(b);

    }
}
