import Database from "@ioc:Adonis/Lucid/Database"

export default class EmpMasterService{

    static async fetch(dataf){

    var begin:number = (dataf.currentPage-1)* dataf.perPage;

    if(dataf.currentPage!=0 && dataf.pageName=='getEmployeesList'){
         
        var offset = begin;
        var limit = dataf.perPage;
    } 
    const curdate = new Date().toISOString().split('T')[0];
   
    const Emp = await Database.query()
            .from('employeemaster')
            .select('Id','FirstName','LastName',Database.raw('EmployeeCode as ecode'))
            .where('archive','=',1)
            .andWhere('is_Delete','=',0)
            .andWhere('OrganizationId','=',dataf.OrganizationId)
            .andWhere('DOL','=','0000-00-00')
            .orWhere('DOL','>',curdate)
            .orderBy('FirstName')
            .limit(limit)
            .offset(offset)
            
            
            const res:any[]=[];
            const data:any[]=[];

     Emp.forEach( function(value){

          var data1 = {};
          data1['Id'] =  value.Id;          
          data1['name'] = value.FirstName+value.LastName;          
          data1['sts'] = false;
          if(value.ecode!="" || value.ecode!=null){
            data1['ecode'] = value.ecode;
          }
          
          else{
            data1['ecode'] = '-';
          }
             
           res.push(data1);
     
     });       
       data.push(res);

      return (data);

}
}