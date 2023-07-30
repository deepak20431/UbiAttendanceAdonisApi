//import { Response } from "@adonisjs/core/build/standalone";

const jwt = require("jsonwebtoken");

export default class Helper {
    
  public static encode5t(str: string) {
    for (let i = 0; i < 5; i++) {
      str = Buffer.from(str).toString("base64");
      str = str.split("").reverse().join("");
    }
    //console.log(str+ "  **encode string");
    return str;
  }

  public static decode5t(str: string) {
    for (let i = 0; i < 5; i++) {
      str = str.split("").reverse().join("");
      str = Buffer.from(str, 'base64').toString('utf-8');
    }
    //console.log(str+"  **decode string");
    return str;
  }


  public static generate(secretKey:string, data: {}) {
      try{
        
        const payload={
          audience: data.username,
          Id:data.empid,
         }
         const options={
          expiresIn: "1m",
          issuer:"Ubiattendace App",
         }
        const token = jwt.sign(payload,secretKey,options,{
          "alg": "RS512",
          "typ": "JWT"
        })
        return token;
      }catch(err){
          console.log(err);
          return 0;
      }
  }
}     