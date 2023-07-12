import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import getLastTimeOut from 'App/Validators/getLastTimeOutValidator'
import getLastTimeOutModel from 'App/Models/getLastTimeOutModel'
import getLastTimeOutService from 'App/Services/getLastTimeOutService'
import getLastTimeOutValidator from 'App/Validators/getLastTimeOutValidator'

export default class GetLastTimeOut{

    public async getLastTimeOut({request,response}: HttpContextContract){

        const a = await request.validate(getLastTimeOutValidator.getLasttimeOutschema)

        const b= await getLastTimeOutService.getLastTimeOut(a);

        return response.json(b);
        
    }

}