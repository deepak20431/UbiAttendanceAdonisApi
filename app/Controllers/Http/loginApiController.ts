import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import loginValidator from 'App/Validators/loginValidator'
import loginService from 'App/Services/loginService'
import Helper from 'App/Helper/Helper';

export default class login {
  public async checkLogin({ request, response }: HttpContextContract) {
  
  const data = await request.validate(loginValidator.loginV);
  const result = await loginService.login1(data)
  let key:any = process.env.secretKey;
  let token:any = Helper.generate(key,{username:result[0],password:result[1]})
  token = Helper.encode5t(token);
  const result2 = await loginService.storetoken({token:token,id:result[3],orgid:result[4]}) 
  return response.status(200).send({Message:"Key Generated",Key:token});
  }
}

 