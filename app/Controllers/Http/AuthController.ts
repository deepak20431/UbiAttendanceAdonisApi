import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import auth from '@ioc:Adonis/Addons/Auth';
import User from 'App/Models/userModel';
import Helper from 'App/Helper/Helper';
const jwt = require('jsonwebtoken');  

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    const { email, password } = request.all();
    const user1 = "2"; //const user: User = await auth.user('api').attempt(email, password);
      const token=Helper.generate(user1,{user:email,pass:password})
      console.log(token)
      return response.json(token)
    // const token = await auth.user('api').generate(user);
    //const token1= jwt.sign(payload, secretKey, { expiresIn: '1h' });
    
    //return response.json({ token });
  }
}
