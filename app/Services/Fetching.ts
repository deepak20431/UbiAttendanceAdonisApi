
import Database from "@ioc:Adonis/Lucid/Database";
export default  class ServiceNameService{
  
   
   static async Fetching(o){
// return o.OrganizationId


    const users = await Database.from('designationmaster')
    .select('*')
    .where('OrganizationId', o.OrganizationId)
    .orderBy('Name')
    // const res = [];
    const res: { Id: number, Name: string, archive: string }[] = [];
    users.forEach((row) => {  
      const data:any= [];
      data['Id'] = row.Id;
      data['Name'] = row.Name;
    
      data['archive'] = row.archive;
      data['OrganizationId'] = row.OrganizationId
      // res.push(data)
    
    res.push(data['Id'],data['Name'],data['archive'],data['OrganizationId'])
      
    }) 
    return  res;
  
    }
    
}
    
                                                                                                                        
