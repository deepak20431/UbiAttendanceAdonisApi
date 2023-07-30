 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helper from 'App/Helper/Helper';
import loginService from 'App/Services/loginService';
import TokenValidator from 'App/Validators/TokenValidator';

export default class GetTokensController {
    public async getToken({ request, response }: HttpContextContract) {
        const data = await request.validate(TokenValidator.token);
        let key:any = process.env.secretKey;
        let token:any = Helper.generate(key,{username:data.userName,empid:data.empid})
        if(token == 0)
        { 
          return response.status(400).send({Message:"Key is not Generated",Key:token});
        }else{
          const result2 = await loginService.storetoken({token:token,id:data.empid,orgid:data.orgid})
          if(result2 > 0){
            return response.status(200).send({Message:"Key Generated",Key:token});
          }else{
            return response.status(400).send({Message:"Key Not stored",Key:"000000"});
          } 
        }

    }

}
