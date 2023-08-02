export default class Helper{

    public static async encode5t(str:any)
    {
        for (let i = 0; i < 5; i++) {
            str = Buffer.from(str).toString('base64');
            str = str.split('').reverse().join('');
          }
          return str;
    }
}