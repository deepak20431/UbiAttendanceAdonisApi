import { Response } from "@adonisjs/core/build/standalone";

const jwt = require("jsonwebtoken");

export default class Helper {
    
  public static encode5t(str: string) {
    for (let i = 0; i < 5; i++) {
      str = Buffer.from(str).toString("base64");
      str = str.split("").reverse().join("");
    }
    return str;
  }

  // public static decode5t(str: string) {
  //   for (let i = 0; i < 5; i++) {
  //     str = str.split("").reverse().join("");
  //     const str=Buffer.from(str,'base64').toString('utf-8')
  //     str = Buffer.from(str).toString("base64");
  //   }
  //   return str;
  // }


  public static generate(secretKey:string, payload: {}) {
      try{
        const token = jwt.sign(payload,secretKey,{ expiresIn: "2m" },{
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