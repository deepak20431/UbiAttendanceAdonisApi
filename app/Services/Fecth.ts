
import Database from "@ioc:Adonis/Lucid/Database";
export default  class ServiceNameService{
  

    static async Fecth(deviceidpreference,orgid,empid){

      const data = {
        count: '0'
        
      };     


      if(deviceidpreference != '')
      {

      

        const sql:any =await Database.from('EmployeeMaster')
        .where('DeviceId', deviceidpreference)
        .where('OrganizationId', orgid)
        .whereNot('Id', empid)
        .count('Id as count');
        const bindings = [deviceidpreference, orgid, empid];

        const queryResult = await Database.raw(sql, bindings);
        const row = queryResult[0];
if (row) {
  data['count'] = row.count;
}
      }
      return data
 

}





}



