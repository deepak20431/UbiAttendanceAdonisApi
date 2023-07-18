import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";

export default class LogicsOnly {
  public static async getAttendances__bothchange(data: any) {

    let query: any = Database.from("AttendanceMainMaster as A",)
     .innerJoin("EmployeeMaster as E","A.EmployeeId","E.Id")
     .innerJoin("DepartmentMaster as D","A.Dept_id","D.Id")
     .innerJoin("DesignationMaster as DM","A.Desg_id","DM.Id")
     .innerJoin("ShiftMaster as C","A.ShiftId","C.Id")
     .where("A.OrganizationId", data.orgId)
     .select(
     "A.Id","A.EmployeeId","D.Name","E.EmployeeCode","C.shifttype","E.FirstName","E.LastName","A.OrganizationId","A.Dept_id","A.Desg_id","A.ShiftId","E.PersonalNo","A.EntryImage","A.ExitImage","E.MultipletimeStatus","C.TimeIn","C.TimeOut","A.AttendanceDate","A.TimeInEditStatus","A.TimeOutEditStatus","FakeLocationStatusTimeIn","A.TotalLoggedHours","C.HoursPerDay","C.HalfdayHours"," C.HalfdayStatus",
     Database.raw(`
      CASE
        WHEN C.shifttype = 3 THEN SUBTIME(A.TotalLoggedHours, C.HoursPerDay)
        ELSE
          CASE
            WHEN A.TimeIn != '00:00:00' AND A.TimeOut != '00:00:00' THEN
              CASE
                WHEN A.timeoutdate != '0000-00-00' THEN
                  CASE
                    WHEN C.shifttype = 2 AND A.timeoutdate = A.timeindate THEN SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(DATE_ADD(A.AttendanceDate, INTERVAL 1 DAY), ' ', C.TimeOut), CONCAT(A.AttendanceDate, ' ', C.TimeIn)))
                    ELSE SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(A.timeoutdate, ' ', C.TimeOut), CONCAT(A.AttendanceDate, ' ', C.TimeIn)))
                  END
                ELSE '00:00:00'
              END
            ELSE '00:00:00'
          END
      END AS Overtime,
      SUBSTRING_INDEX(A.EntryImage, ".", 1) as EntryImage,
      SUBSTRING_INDEX(A.ExitImage, "s3", 1) as ExitImage,
      TIME_FORMAT(SEC_TO_TIME((ROUND(TIME_TO_SEC(A.TotalLoggedHours) / 60)) * 60), '%H:%i:%s') AS loggedhours
    `))
 
    const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    // console.log(currentDateTime)

    if (data.date == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query = query.where("A.AttendanceDate", currDate)
    } 
    if(data.deptId !=undefined){

      query = query.where("A.Dept_id",data.deptId)
    }
    if(data.desigId !=undefined){

      query = query.where("A.Desg_id",data.desigId)
    }
    if(data.shiftId !=undefined){
      
      query = query.where("A.ShiftId",data.shiftId)
    }
    else{
      const formattedDate = data.date.toFormat('yyyy-MM-dd')
      console.log(formattedDate)
      query = query.where("A.AttendanceDate",formattedDate)
    }
      const resp: any[] = [];
      const queryResult = await query;

    queryResult.forEach(function (val) {
      const data: any = {};
      data["Id"] = val.Id;
      data["EmployeeId"] = val.EmployeeId;
      data["OrganizationId "] = val.OrganizationId;
      data["EmployeeCode"] = val.EmployeeCode;
      data["shifttype"] = val.shifttype;
      data["ShiftName"] = val.Name;
      data["FirstName"] = val.FirstName;
      data["LastName"] = val.LastName;
      data["DesignationName"] = val.Name;
      data["Dept_id"] = val.Dept_id;
      data["Desg_id"] = val.Desg_id;
      data["ShiftId"] = val.ShiftId;
      data["PersonalNo"] = val.PersonalNo;
      data["EntryImage"] = val.EntryImage;
      data["ExitImage"] = val.ExitImage;
      data["TimeIn"] = val.TimeIn;
      data["TimeOut"] = val.TimeOut;
      data["AttendanceDate"] = moment(val.AttendanceDate).utcOffset("Asia/Kolkata").format('YYYY-MM-DD');
      data["Overtime"] = val.Overtime;
      data["TimeInEditStatus"] = val.TimeInEditStatus;
      data["TimeOutEditStatus"] = val.TimeOutEditStatus;
      data["FakeLocationStatusTimeIn"] = val.FakeLocationStatusTimeIn;
      data["TotalLoggedHours"] = val.TotalLoggedHours;
      data["loggedhours"] = val.loggedhours;
      data["HoursPerDay"] = val.HoursPerDay;
      data["HalfdayHours"] = val.HalfdayHours;
      data["HalfdayStatus"] = val.HalfdayStatus;

      resp.push(data);
    });
      return resp;
  }
}
