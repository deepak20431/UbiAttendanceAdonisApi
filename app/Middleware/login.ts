import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Helper from 'App/Helper/Helper';
const jwt = require('jsonwebtoken');

export default class Middleware1 {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
  var arr =request.headers().authorization;
  var token=arr?.split(' ')[1];
  token=Helper.decode5t(token)
  var key=process.env.secretKey
  console.log(key);
  jwt.verify(token,key,function(err,decoded){
    if(err){
      response.send({name:err.name,message:err.message});
    }else{
       next();
    }
    
  })

  }
}
