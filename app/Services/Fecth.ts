import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";
export default class ServiceNameService {
  static async Fecth(Maindata) {
    const startDate = Maindata.startDate.toFormat("yyyy-MM-dd");

    const endDate = Maindata.endDate.toFormat("yyyy-MM-dd");

    let query1: any = Database.from("AttendanceMainMaster AS A")
      .innerJoin("DepartmentMaster as DM", "A.Dept_id", "=", "DM.Id")

      .innerJoin("DesignationMaster as DSm", "A.Desg_id", "=", "DSm.Id")
      .innerJoin("ShiftMaster as S", "A.ShiftId", "=", "S.Id")
      .innerJoin("EmployeeMaster as EM", "A.EmployeeId", "=", "EM.Id")
      .innerJoin("AttendanceChildMaster as AC", "A.Id", "=", "AC.Id")
      // .where("A.OrganizationId", "=", Maindata.OrganizationId)
      .whereBetween("A.AttendanceDate", [startDate, endDate])

      .select(
        "DM.OrganizationId as DM_O",
        "A.OrganizationId",
        "A.SuspiciousTimeInStatus",
        "A.device",
        "A.SuspiciousTimeOutStatus",
        "A.SuspiciousDeviceTimeInStatus",
        "S.HalfdayHours",

        "A.AttendanceDate",

        "A.Dept_id",
        "DM.Id",
        "A.Desg_id",
        "DSm.Id as DSId",
        "A.ShiftId",
        "S.Id as SId",
        "A.EmployeeId",
        "EM.Id as EId",
        "A.Id",
        "AC.Id as ACId",

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



      `)
      );

    const query2: any = Database.from("AttendanceMainMaster AS A")

      .innerJoin(
        "Disapprove_approve ",
        "Disapprove_approve.AttendanceId",
        "A.Id"
      )

      .innerJoin("DepartmentMaster as DM", "A.Dept_id", "=", "DM.Id")

      .innerJoin("DesignationMaster as DSm", "A.Desg_id", "=", "DSm.Id")
      .innerJoin("ShiftMaster as S", "A.ShiftId", "=", "S.Id")
      .innerJoin("EmployeeMaster as EM", "A.EmployeeId", "=", "EM.Id")
      .innerJoin("AttendanceChildMaster as AC", "A.Id", "=", "AC.Id")
      .whereBetween("A.AttendanceDate", [startDate, endDate])

      .select(
        "DM.OrganizationId as DM_O",
        "A.OrganizationId",
        "A.SuspiciousTimeInStatus",
        "A.device",
        "A.SuspiciousTimeOutStatus",
        "A.SuspiciousDeviceTimeInStatus",
        "S.HalfdayHours",
        "A.AttendanceDate",
        "A.Dept_id",
        "DM.Id",
        "A.Desg_id",
        "DSm.Id as DSId",
        "A.ShiftId",
        "S.Id as SId",
        "A.EmployeeId",
        "EM.Id as EId",
        "A.Id",
        "AC.Id as ACId",
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



    `)
      );

    const combinedResult = await query1.union(query2);

    const currentDateTime = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    // console.log(currentDateTime)

    if (Maindata.attendanceid == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query1 = query1.where("A.AttendanceDate", currDate);
    }

    if (Maindata.deptId != undefined) {
      query1 = query1.where("A.Dept_id", Maindata.deptId);
    }
    if (Maindata.desigId != undefined) {
      query1 = query1.where("A.Desg_id", Maindata.desigId);
    }
    if (Maindata.shiftId != undefined) {
      query1 = query1.where("A.ShiftId", Maindata.shiftId);
    } else {
      const startDate = Maindata.startDate.toFormat("yyyy-MM-dd");

      const endDate = Maindata.endDate.toFormat("yyyy-MM-dd");

      query1 = query1.whereBetween("A.AttendanceDate", [startDate, endDate]);
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
      data["AttendanceDate"] = moment(val.AttendanceDate).format("YYYY-MM-DD");

      data["Overtime"] = val.Overtime;
      data["TimeInEditStatus"] = val.TimeInEditStatus;
      data["TimeOutEditStatus"] = val.TimeOutEditStatus;
      data["FakeLocationStatusTimeIn"] = val.FakeLocationStatusTimeIn;
      data["TotalLoggedHours"] = val.TotalLoggedHours;
      data["loggedhours"] = val.loggedhours;
      data["HoursPerDay"] = val.HoursPerDay;
      data["HalfdayHours"] = val.HalfdayHours;
      data["HalfdayStatus"] = val.HalfdayStatus;
      data["AttendanceDate"] = moment(val.AttendanceDate).format("YYYY-MM-DD");

      resp.push(data);
    });
    return resp;
  }
}
