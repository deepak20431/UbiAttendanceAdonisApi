import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";

export default class ServiceNameService {
  static async Fecth(Maindata) {
    const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    console.log(currentDateTime)


    var query: any = Database.from("AttendanceMainMaster as A")
      .innerJoin("DepartmentMaster as DM", "A.Dept_id", "=", "DM.Id")

      .innerJoin("DesignationMaster as DSm", "A.Desg_id", "=", "DSm.Id")
      .innerJoin("ShiftMaster as S", "A.ShiftId", "=", "S.Id")
      .innerJoin("EmployeeMaster as EM", "A.EmployeeId", "=", "EM.Id")
      .innerJoin("AttendanceChildMaster as AC", "A.Id", "=", "AC.Id")
      .where("A.OrganizationId", "=", Maindata.OrganizationId)
      .select(
        "A.Id as A_ID","DM.Id","DM.OrganizationId as DM_O","A.OrganizationId","A.Desg_id","A.SuspiciousTimeInStatus","A.device"
        ,"A.SuspiciousTimeOutStatus","A.SuspiciousDeviceTimeInStatus", "S.HalfdayHours",
       
        Database.raw(`CASE
          WHEN S.shifttype = 1 THEN SUBTIME(A.TotalLoggedHours, S.HoursPerDay)
          ELSE (
            CASE
              WHEN A.TimeIn != '00:00:00' AND A.TimeOut != '00:00:00' THEN (
                CASE
                  WHEN A.timeoutdate != '0000-00-00' THEN (
                    CASE
                      WHEN S.shifttype = 2 AND A.timeoutdate = A.timeindate THEN SUBTIME(
                        TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)),
                        TIMEDIFF(CONCAT(DATE_ADD(A.AttendanceDate, INTERVAL 1 DAY), ' ', S.TimeOut), CONCAT(A.AttendanceDate, ' ', S.TimeIn))
                      )
                      ELSE SUBTIME(
                        TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)),
                        TIMEDIFF(CONCAT(A.timeoutdate, ' ', S.TimeOut), CONCAT(A.AttendanceDate, ' ', S.TimeIn))
                      )
                    END
                  )
                  ELSE '00:00:00'
                END
              )
              ELSE '00:00:00'
            END
          )
        END AS Overtime,SUBSTRING_INDEX(A.EntryImage, '.', -1) as ExtensionEntryImage,
        SUBSTRING_INDEX(A.ExitImage, '.', 1) as ExtensionExitImage,
        TIME_FORMAT(SEC_TO_TIME((ROUND(TIME_TO_SEC(A.TotalLoggedHours)/60)) * 60), '%H:%i:%s') AS loggedhours,
        TiMEDIFF(S.TimeOut,S.TimeIn)as sloggedh



      `))


      

    
      
      return query
      
      
    


    if (Maindata.ShiftId != undefined) {
      query = query.where("A.ShiftId", Maindata.ShiftId);
    }

    if (Maindata.DesgnId != undefined) {
      query = query.where("A.Desg_id", Maindata.ShiftId);
    }
    if (Maindata.DeptId != undefined) {
      query = query.where("A.Desg_id", Maindata.ShiftId);
    }
    if (Maindata.attendanceid == 1) {
      query = query.whereIn("A.AttendanceStatus", [1, 3, 5]);
    } else if (Maindata.attendanceid == 2) {
      query = query.where("A.AttendanceStatus", 2);
    }
    if (Maindata.AttendanceDate == undefined) {
      let currDate = moment().format("YYYY-MM-DD");

      query = query.where("A.AttendanceDate", currDate);
    } else {
      const formattedDate = Maindata.AttendanceDate.toFormat("yyyy-MM-dd");

      query = query.where("A.AttendanceDate", formattedDate);
    }

    const response: any[] = [];
    const Result = await query;
    const data: any = {};

    Result.forEach(function (val) {
      data["Id"] = val.Id;
      data["EmployeeId"] = val.EmployeeId;
      data["EntryImage"] = val.EntryImage;
      data["TimeIn"] = val.TimeIn;
      data["TimeOut"] = val.TimeOut;
      data["AttendanceDate"] = new Date(val.AttendanceDate).toLocaleString(
        "en-IN",
        { timeZone: "Asia/Kolkata" }
      );
      data["OrganizationId "] = val.OrganizationId;
      data["Name "] = val.Name;
      data["ShiftId"] = val.ShiftId;
      data["OwnerId"] = val.OwnerId;
      data["Overtime"] = val.Overtime;
      data["TimeInEditStatus"] = val.TimeInEditStatus;
      data["TimeOutEditStatus"] = val.TimeOutEditStatus;
      data["device"] = val.device;
      response.push(data);
    });
    return response;
  }
}
