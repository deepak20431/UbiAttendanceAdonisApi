import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import loginValidator from 'App/Validators/loginValidator'
import loginService from 'App/Services/loginService'
import Helper from 'App/Helper/Helper';


export default class login {
    public async checkLogin({ request, response }: HttpContextContract) {

    const data = await request.validate(loginValidator.loginV);

    const result = await loginService.login1(data);
    
    const key="abcd";
    const token = Helper.generate(key,{username:result[0],password:result[1]});
    const result1 = await loginService.storetoken({token:token,id:result[2],Orgid:result[3]});
    const arr :any= {};
    arr['token']=token;
    arr['data']=result;
    return arr; 
  }
}

 