import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";

export default class LogicsOnly {
  public static async getAttendances__bothchange(data: any) {
    let query: any = Database.from("AttendanceMainMaster as AM",)
     .innerJoin("EmployeeMaster as E","AM.EmployeeId","E.Id")
     .innerJoin("DepartmentMaster as DM","AM.Dept_id","DM.Id")
     .innerJoin("DesignationMaster as DG","AM.Desg_id","DG.Id")
     .innerJoin("ShiftMaster as SM","AM.ShiftId","SM.Id")
     .where("AM.OrganizationId", data.orgId)
     .select("AM.Id","AM.EmployeeId","DM.Name","E.EmployeeCode","E.FirstName","E.LastName","AM.OrganizationId","AM.Dept_id","AM.Desg_id","AM.ShiftId","AM.EntryImage","AM.TimeIn","AM.TimeOut","AM.AttendanceDate","AM.TimeInEditStatus","AM.TimeOutEditStatus");


    const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    console.log(currentDateTime)

    if (data.date == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query = query.where("A.AttendanceDate", currDate);
    } 
    if(data.deptId !=undefined){

      query = query.where("AM.Dept_id",data.deptId);
    }
    if(data.desigId !=undefined){

      query = query.where("AM.Desg_id",data.desigId);
    }
    if(data.shiftId !=undefined){
      
      query = query.where("AM.ShiftId",data.shiftId);
    }
    else {
      const formattedDate = data.date.toFormat('yyyy-MM-dd');
      query = query.where("AttendanceDate", formattedDate);
    }
      const resp: any[] = [];
      const queryResult = await query;

    queryResult.forEach(function (val) {
      const data: any = {};
      data["Id"] = val.Id;
      data["EmployeeId"] = val.EmployeeId;
      data["OrganizationId "] = val.OrganizationId;
      data["EmployeeCode"] = val.EmployeeCode;
      data["FirstName"] = val.FirstName;
      data["LastName"] = val.LastName;
      data["DesignationName"] = val.Name;
      data["Dept_id"] = val.Dept_id;
      data["Desg_id"] = val.Desg_id;
      data["ShiftId"] = val.ShiftId;
      data["EntryImage"] = val.EntryImage;
      data["TimeIn"] = val.TimeIn;
      data["TimeOut"] = val.TimeOut;
      data["AttendanceDate"] = moment(val.AttendanceDate).utcOffset("Asia/Kolkata").format('YYYY-MM-DD');
      data["OwnerId"] = val.OwnerId;
      data["Overtime"] = val.Overtime;
      data["TimeInEditStatus"] = val.TimeInEditStatus;
      data["TimeOutEditStatus"] = val.TimeOutEditStatus;
      data["device"] = val.device;
      data["PersonalNo"] = val.PersonalNo;
      resp.push(data);
    });
      return resp;
  }
}
