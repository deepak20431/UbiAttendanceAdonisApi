import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import setQrKioskPinV from 'App/Validators/setQrKioskPinV';
import setQrKioskPin from 'App/Service/setQrKioskPin';

export default class UserController {


public async setQrKioskPin({request,response}: HttpContextContract){

    const data:any = await request.validate(setQrKioskPinV.newPostSchema)
    const result = await setQrKioskPin.Service_setQrKioskPin(data)
    return response.json(result)
    
  }
}