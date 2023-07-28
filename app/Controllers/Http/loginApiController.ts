import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import loginValidator from 'App/Validators/loginValidator'
import loginService from 'App/Services/loginService'
import Helper from 'App/Helper/Helper';


export default class login {
    public async checkLogin({ request, response }: HttpContextContract) {

    const data = await request.validate(loginValidator.loginV);

    const result = await loginService.loginS(data);
    
    const key="abcd";
    const token = Helper.generate(key,{username:})

    return response.json(result);
  }
}

 