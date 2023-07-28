
const jwt = require('jsonwebtoken');
export default class Helper{

    public static   encode5t(str: string){ 
        for (let i = 0; i < 5; i++) 
        {
            str = Buffer.from(str).toString('base64');
            str = str.split('').reverse().join('');
        }
        return str;
    }
         public static generate(secretKey:string,payload:{}){
             const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return  token;
         }
        
}