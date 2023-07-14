import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";
import dayjs from "dayjs";
export default class ServiceNameService {
  static async Fecth(Maindata) {

    // return Maindata

    if (Maindata.ZoneId == undefined) 
	{
       Maindata.Zoneid=0;
    
    }

    let currDate = moment().format("YYYY-MM-DD");


    
const currDateTime = moment().format(" HH:mm:ss");


    // const startDate = dayjs('2023-07-01');
    // const endDate = dayjs('2023-07-05');
    
    // const dateDiffInDays = endDate.diff(startDate, 'day');
  
    // return dateDiffInDays

// return startDate
// return endDate
    let query: any = Database.from("AttendanceMainMaster as AM")
      .innerJoin("ShiftMaster","AM.ShiftId","ShiftMaster.Id")
      .innerJoin("DepartmentMaster","AM.Dept_id","DepartmentMaster.Id")
      .innerJoin("DesignationMaster","AM.Desg_Id","DesignationMaster.Id")

      .where("AM.OrganizationId", Maindata.OrganizationId) 
      .select("*");
      
// return Maindata.ShiftId
      if(Maindata.ShiftId != undefined){
      
        query = query.where('AM.ShiftId',Maindata.ShiftId)
      }

      if(Maindata.DesgnId != undefined){
        query = query.where('AM.Desg_id',Maindata.ShiftId)

      }
      if(Maindata.DeptId != undefined){
        query = query.where('AM.Desg_id',Maindata.ShiftId)

      }
    if (Maindata.AttendanceDate == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query = query.where("AttendanceDate", currDate);
    } else {
      const originalDateString = Maindata.AttendanceDate;
      const originalDate = new Date(originalDateString);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      query = query.where("AttendanceDate", formattedDate);
    }

    const response: any[] = [];
    const Result = await query;
    const data: any = {};

    Result.forEach(function (val) {
    //   data["Id"] = val.Id;
    // // data["EmployeeId"] = val.EmployeeId;
    //   data["EntryImage"] = val.EntryImage;
    // data["TimeIn"] = val.TimeIn;
    // data["TimeOut"] = val.TimeOut;
    //   data["AttendanceDate"] = new Date(val.AttendanceDate).toLocaleString(
    //     "en-IN",
    //     { timeZone: "Asia/Kolkata" }
    //   );
      data["OrganizationId "] = val.OrganizationId;
      data["Name "] = val.Name;
      data["ShiftId"] = val.ShiftId;


      // data["OwnerId"] = val.OwnerId;
      // data["Overtime"] = val.Overtime;
      // data["TimeInEditStatus"] = val.TimeInEditStatus;
      // data["TimeOutEditStatus"] = val.TimeOutEditStatus;
      // data["device"] = val.device;
      response.push(data);
    });
    return response;
  }
}
