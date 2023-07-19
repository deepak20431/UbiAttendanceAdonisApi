import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";
import { DateTime } from "luxon";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
export default class ServiceNameService {
  static async Fecth(Maindata) {



    const startDate = Maindata.startDate.toFormat("yyyy-MM-dd");


    
    const endDate = Maindata.endDate.toFormat("yyyy-MM-dd");

    let query1:any = Database
    .from('AttendanceMainMaster AS A') 
      .innerJoin("DepartmentMaster as DM", "A.Dept_id", "=", "DM.Id")

      .innerJoin("DesignationMaster as DSm", "A.Desg_id", "=", "DSm.Id")
      .innerJoin("ShiftMaster as S", "A.ShiftId", "=", "S.Id")
      .innerJoin("EmployeeMaster as EM", "A.EmployeeId", "=", "EM.Id")
      .innerJoin("AttendanceChildMaster as AC", "A.Id", "=", "AC.Id")
      // .where("A.OrganizationId", "=", Maindata.OrganizationId)
      .whereBetween('A.AttendanceDate', [startDate, endDate])

      .select(
        "DM.OrganizationId as DM_O","A.OrganizationId","A.SuspiciousTimeInStatus","A.device"
        ,"A.SuspiciousTimeOutStatus","A.SuspiciousDeviceTimeInStatus", "S.HalfdayHours",

"A.AttendanceDate",


        "A.Dept_id",
      "DM.Id",
      "A.Desg_id",
       "DSm.Id as DSId",
      "A.ShiftId",
      "S.Id as SId",
      "A.EmployeeId",
      "EM.Id as EId",
      "A.Id","AC.Id as ACId",

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
        TiMEDIFF(S.TimeOut,S.TimeIn) as sloggedh



      `))


      

    
  const query2:any = Database
    .from('AttendanceMainMaster AS A')        

    .innerJoin('Disapprove_approve ','Disapprove_approve.AttendanceId', 'A.Id')

    .innerJoin("DepartmentMaster as DM", "A.Dept_id", "=", "DM.Id")

      .innerJoin("DesignationMaster as DSm", "A.Desg_id", "=", "DSm.Id")
      .innerJoin("ShiftMaster as S", "A.ShiftId", "=", "S.Id")
      .innerJoin("EmployeeMaster as EM", "A.EmployeeId", "=", "EM.Id")
      .innerJoin("AttendanceChildMaster as AC", "A.Id", "=", "AC.Id")
      .whereBetween('A.AttendanceDate', [startDate, endDate])


          .select(
            "DM.OrganizationId as DM_O","A.OrganizationId","A.SuspiciousTimeInStatus","A.device"
            ,"A.SuspiciousTimeOutStatus","A.SuspiciousDeviceTimeInStatus", "S.HalfdayHours",
            "A.AttendanceDate",
            "A.Dept_id",
            "DM.Id",
            "A.Desg_id",
             "DSm.Id as DSId",
            "A.ShiftId",
            "S.Id as SId",
            "A.EmployeeId",
            "EM.Id as EId",
            "A.Id","AC.Id as ACId",
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
      TiMEDIFF(S.TimeOut,S.TimeIn) as sloggedh



    `))


      
    


  const combinedResult = await query1.union(query2);





  // const res: any[] = [];
  //     const querResult = await combinedResult;
  
  //   querResult.forEach(function (val) {
  //     const data: any = {};
     
  //     data["AttendanceDate"] = moment(val.AttendanceDate).format('YYYY-MM-DD');
  
  //     res.push(data);
  //   });

  //   return res


















      
      
    
  const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
  // console.log(currentDateTime)

  if (Maindata.attendanceid == undefined) {
    let currDate = moment().format("YYYY-MM-DD");
    query1 = query1.where("A.AttendanceDate", currDate)
  } 
  
  if(Maindata.deptId !=undefined){

    query1 = query1.where("A.Dept_id",Maindata.deptId)
  }
  if(Maindata.desigId !=undefined){

    query1 = query1.where("A.Desg_id",Maindata.desigId)
  }
  if(Maindata.shiftId !=undefined){
    
    query1 = query1.where("A.ShiftId",Maindata.shiftId)
  }
  else{
    // const formattedDate = Maindata.AttendanceDate.toFormat('yyyy-MM-dd')
// return formattedDate
const startDate = Maindata.startDate.toFormat("yyyy-MM-dd");


    
    const endDate = Maindata.endDate.toFormat("yyyy-MM-dd");

    query1 = query1.whereBetween('A.AttendanceDate', [startDate, endDate])
  }
    const resp: any[] = [];
    const queryResult = await combinedResult;

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
    // data["AttendanceDate"] = moment(val.AttendanceDate).utcOffset("Asia/Kolkata").format('YYYY-MM-DD');
    data["AttendanceDate"] = moment(val.AttendanceDate).format('YYYY-MM-DD');

    data["Overtime"] = val.Overtime;
    data["TimeInEditStatus"] = val.TimeInEditStatus;
    data["TimeOutEditStatus"] = val.TimeOutEditStatus;
    data["FakeLocationStatusTimeIn"] = val.FakeLocationStatusTimeIn;
    data["TotalLoggedHours"] = val.TotalLoggedHours;
    data["loggedhours"] = val.loggedhours;
    data["HoursPerDay"] = val.HoursPerDay;
    data["HalfdayHours"] = val.HalfdayHours;
    data["HalfdayStatus"] = val.HalfdayStatus;
    data["AttendanceDate"] = moment(val.AttendanceDate).format('YYYY-MM-DD');

    resp.push(data);
  });
    return resp;
}
  }






// public static async getAttendances__bothchange(data: any) {

//   let query: any = Database.from("AttendanceMainMaster as A",)
//    .innerJoin("EmployeeMaster as E","A.EmployeeId","E.Id")
//    .innerJoin("DepartmentMaster as D","A.Dept_id","D.Id")
//    .innerJoin("DesignationMaster as DM","A.Desg_id","DM.Id")
//    .innerJoin("ShiftMaster as C","A.ShiftId","C.Id")
//    .where("A.OrganizationId", data.orgId)
//    .select(
//    "A.Id","A.EmployeeId","D.Name","E.EmployeeCode","C.shifttype","E.FirstName","E.LastName","A.OrganizationId","A.Dept_id","A.Desg_id","A.ShiftId","E.PersonalNo","A.EntryImage","A.ExitImage","E.MultipletimeStatus","C.TimeIn","C.TimeOut","A.AttendanceDate","A.TimeInEditStatus","A.TimeOutEditStatus","FakeLocationStatusTimeIn","A.TotalLoggedHours","C.HoursPerDay","C.HalfdayHours"," C.HalfdayStatus",
//    Database.raw(`
//     CASE
//       WHEN C.shifttype = 3 THEN SUBTIME(A.TotalLoggedHours, C.HoursPerDay)
//       ELSE
//         CASE
//           WHEN A.TimeIn != '00:00:00' AND A.TimeOut != '00:00:00' THEN
//             CASE
//               WHEN A.timeoutdate != '0000-00-00' THEN
//                 CASE
//                   WHEN C.shifttype = 2 AND A.timeoutdate = A.timeindate THEN SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(DATE_ADD(A.AttendanceDate, INTERVAL 1 DAY), ' ', C.TimeOut), CONCAT(A.AttendanceDate, ' ', C.TimeIn)))
//                   ELSE SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(A.timeoutdate, ' ', C.TimeOut), CONCAT(A.AttendanceDate, ' ', C.TimeIn)))
//                 END
//               ELSE '00:00:00'
//             END
//           ELSE '00:00:00'
//         END
//     END AS Overtime,
//     SUBSTRING_INDEX(A.EntryImage, ".", 1) as EntryImage,
//     SUBSTRING_INDEX(A.ExitImage, "s3", 1) as ExitImage,
//     TIME_FORMAT(SEC_TO_TIME((ROUND(TIME_TO_SEC(A.TotalLoggedHours) / 60)) * 60), '%H:%i:%s') AS loggedhours
//   `))

//   const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
//   // console.log(currentDateTime)

//   if (data.date == undefined) {
//     let currDate = moment().format("YYYY-MM-DD");
//     query = query.where("A.AttendanceDate", currDate)
//   } 
//   if(data.deptId !=undefined){

//     query = query.where("A.Dept_id",data.deptId)
//   }
//   if(data.desigId !=undefined){

//     query = query.where("A.Desg_id",data.desigId)
//   }
//   if(data.shiftId !=undefined){
    
//     query = query.where("A.ShiftId",data.shiftId)
//   }
//   else{
//     const formattedDate = data.date.toFormat('yyyy-MM-dd')
//     console.log(formattedDate)
//     query = query.where("A.AttendanceDate",formattedDate)
//   }
//     const resp: any[] = [];
//     const queryResult = await query;

//   queryResult.forEach(function (val) {
//     const data: any = {};
//     data["Id"] = val.Id;
//     data["EmployeeId"] = val.EmployeeId;
//     data["OrganizationId "] = val.OrganizationId;
//     data["EmployeeCode"] = val.EmployeeCode;
//     data["shifttype"] = val.shifttype;
//     data["ShiftName"] = val.Name;
//     data["FirstName"] = val.FirstName;
//     data["LastName"] = val.LastName;
//     data["DesignationName"] = val.Name;
//     data["Dept_id"] = val.Dept_id;
//     data["Desg_id"] = val.Desg_id;
//     data["ShiftId"] = val.ShiftId;
//     data["PersonalNo"] = val.PersonalNo;
//     data["EntryImage"] = val.EntryImage;
//     data["ExitImage"] = val.ExitImage;
//     data["TimeIn"] = val.TimeIn;
//     data["TimeOut"] = val.TimeOut;
//     data["AttendanceDate"] = moment(val.AttendanceDate).utcOffset("Asia/Kolkata").format('YYYY-MM-DD');
//     data["Overtime"] = val.Overtime;
//     data["TimeInEditStatus"] = val.TimeInEditStatus;
//     data["TimeOutEditStatus"] = val.TimeOutEditStatus;
//     data["FakeLocationStatusTimeIn"] = val.FakeLocationStatusTimeIn;
//     data["TotalLoggedHours"] = val.TotalLoggedHours;
//     data["loggedhours"] = val.loggedhours;
//     data["HoursPerDay"] = val.HoursPerDay;
//     data["HalfdayHours"] = val.HalfdayHours;
//     data["HalfdayStatus"] = val.HalfdayStatus;

//     resp.push(data);
//   });
//     return resp;
// }

