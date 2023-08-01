import Database from "@ioc:Adonis/Lucid/Database";

export default class Helper{

    public static async getName(a:any)
    {
        return a
    }
    public static async getTimeZone(orgid: any)
    {
        const query1 = await Database.query().from('ZoneMaster').select('name').where('id', Database.raw(`(select TimeZone from Organization where id =${orgid}  LIMIT 1)`));
        return query1;
        
    }
    public static async getempnameById(empid: number) { 
        const query2 = await Database.query().from('EmployeeMaster').select('FirstName').where('Id', empid); 
        //const FristName = query2[0].FristName;
        return query2[0].FirstName;
        
    }
}
