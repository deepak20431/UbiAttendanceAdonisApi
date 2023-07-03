import Holiday from "App/Models/holidays"
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment';


export default  class ServiceOne{

   static async Services1(orgId){

   // const pagename = 0
    const currentPage = 2
    const perPage = 10
    const begin = (currentPage - 1) * perPage;

    //return begin
    //await Holiday.findByOrFail('OrganizationId', orgId.orgId )
    const q1:any[]=[];
    
    const query1 = await Database.query().from('holidaymaster')
      .select('Id', 'Name', 'Description','DateTo',
      Database.raw('DATE(DateFrom) AS fromDate'),
      Database.raw('DATEDIFF(DATE(DateTo),DATE(DateFrom))  AS DiffDate'),'DateFrom')
      .where('OrganizationId', orgId.orgId )
    //   .orderBy('fromDate','desc')
      .limit(perPage)
      .offset(begin)
      
      // return query1

      query1.forEach(function(val){
        const data:any = {}

         data['Id'] = val.Id
         data['Name'] = val.Name
         data['Description'] =val.Description
         data['fromDate'] =moment(val.DateFrom).format('YYYY/MM/DD')
         //data['fromDateFormat'] = moment(val.DateFrom).format('YYYY/MM/DD')
         data['DiffDate'] =val.DiffDate
         data['DateTo'] =moment(val.DateTo).format('YYYY/MM/DD')
         //data['DateToFormat']= moment(val.DateTo).format('YYYY/MM/DD')

          q1.push(data)
       });
     
           return(q1)
  
    }                                                                                                                      
}