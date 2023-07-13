
import Database from "@ioc:Adonis/Lucid/Database";
import  moment from "moment";
export default  class ServiceNameService{
  

    static async Fecth(MainData){
  // return MainData.Id
  // 

const originalDateString = MainData.AttendanceDate
// Create a new Date object with the original date string
const originalDate = new Date(originalDateString);

// Get the year, month, and day components from the Date object
const year = originalDate.getFullYear();
const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
const day = originalDate.getDate().toString().padStart(2, '0');

// Create the new date string in the desired format (YYYY-MM-DD)l
const formattedDate = `${year}-${month}-${day}`;





      
  let res:any[]=[];
      let data:any[]=[];

      const limit = 3; // Number of records to retrieve
      const start = 0; // Starting index of the range
      const end = 10;
      let query:any =""
      let q1 = '';
      let q2 = '';


      if ( MainData.Id !== 0) {
        q1 += ` andwhere Id='${MainData.Id}'`;

      }
    
      
      if ( MainData.Id !== 0) {
        q2 += ` andwhere Id='${MainData.Id}'`;

      }
    
      
      

         const sql = await Database.from('AttendanceMainMaster')
        .innerJoin('AttendanceChildMaster','AttendanceMainMaster.Id','AttendanceChildMaster.Id')
        .select('*')
        .andWhere('AttendanceChildMaster.OrganizationId',MainData.OrganizationId)
        .whereRaw('AttendanceChildMaster.Id = ?', [q1])


 
        return sql


    
    // query.forEach( function(value){

    //   data['Id'] =  value.Id; 
    //   data['TimeIn'] =  value.TimeIn;
    //   data['TimeOut'] =  value.TimeOut;  
    //   data['Overtime'] =  value.Overtime;  
    //   data['device'] = value.device;
    //   data["AttendanceDate"] = new Date(value.AttendanceDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });;


    

    //   data['EmployeeId'] = value.EmployeeId;

 
    //   res.push(data['Id'],data['TimeIn'],data['TimeOut'],data['Overtime'],data['device'],data['AttendanceDate'],data['EmployeeId'] )        
      

    //   })
    //   return res


}

}
