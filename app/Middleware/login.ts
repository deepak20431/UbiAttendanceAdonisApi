//import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
const jwt = require('jsonwebtoken');

export default class Middleware1 {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
  var arr =request.headers().authorization;
  var token=arr?.split(' ')[1];
  var key=process.env.secretKey
  jwt.verify(token,key,async function(err,decoded){
    if(err){
        if(err.name == 'TokenExpiredError'){
          response.status(400).send({Message:"Token Expired"}); 
          //here generate again token and stored and return token

        }else if(err.name=='JsonWebTokenError'){
            console.log(err.name=='JsonWebTokenError')
            response.status(401).send({Message:err.message}); 
        }else{
            response.status(402).send({Message:err.name});
        }
    }else{
      //console.log(decoded);
       const query = await Database.query().select("*").from("Emp_key_Storage")
       .where("EmployeeId", decoded.empid).andWhere('Token','LIKE',"%"+token+"%");
        if(query.length>0){
          next()
        }else{
          response.status(400).send({Message:"Invalid Acess"}); 
        }    
    }
    
  })

  }
}
