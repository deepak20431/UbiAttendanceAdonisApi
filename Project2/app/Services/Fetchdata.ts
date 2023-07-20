import Database from "@ioc:Adonis/Lucid/Database";

export default class ServiceNameService {
  static async getabsapproveexcel(Maindata) {
    const query = await Database.from(" InterimAttendances as I")
      .innerJoin("AttendanceMaster as A", "A.Id", "I.AttendanceMasterId")
      .innerJoin("ShiftMaster as S", "S.Id", "A.ShiftId")
      .where("I.AttendanceMasterId", Maindata.iam)
      .andWhere("I.TimeOutLocation", Maindata.TimeOutCity)
      .select(
        "*",

        Database.raw("SUBSTRING(I.TimeOut, 1, 4) AS timeout"),
        Database.raw(
          "TIME_FORMAT(SEC_TO_TIME((ROUND(TIME_TO_SEC(A.TotalLoggedHours)/60)) * 60), '%H:%i') as totalloggedhours"
        ),

        Database.raw("SUBSTRING(I.`TimeOut`, 1, 8) as newtimeout"),
        Database.raw(
          "TIME_FORMAT(SEC_TO_TIME((ROUND(TIME_TO_SEC(I.`LoggedHours`)/60)) * 60), '%H:%i') as loggedhours"
        ),
        Database.raw("SUBSTRING(S.HoursPerDay, 1, 8) as hoursperday"),
        Database.raw("SUBSTRING(TiMEDIFF(S.`TimeOut`,S.`TimeIn`), 1, 3)as sl"),
        Database.raw(
          " SUBSTRING(TiMEDIFF(CONCAT('2021-02-17',  '  ', S.TimeOut),CONCAT(  '2021-02-16',  '  ', S.TimeIn )), 1, 5)as msl"
        )
      );

    let res: any[] = [];

    const queryResult = await query;
    let data: any = {};
    let shifthours;

    let TotalLoggedHours = "";
    let attdate = "";
    let hrsperday = "";
    let underover = "";
    for (const row of queryResult) {
      if (row.shifttype == " ") {
        shifthours = row.sl;
      } else if (row.shifttype == undefined) {
        shifthours = row.msl;
      } else {
        shifthours = row.hoursperday;
      }

      let attdate = row.AttendanceDate;

      data["AttendanceDate"] = row.AttendanceDate;
      data["ShiftId"] = row.ShiftId;
      data["checkInLoc"] = row.checkInLoc;
      data["CheckOutLoc"] = row.CheckOutLoc;

      data["TimeIn"] = new Date(row.timein).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (row.timein === row.timeout) {
        data["TimeOut"] = "00:00";
      } else {
        data["TimeOut"] = new Date(row.timeout).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      data["TimeInCity"] = row.TimeInCity;
      data["TimeOutCity"] = row.TimeOutCity;
      data["TimeInAppVersion"] = row.TimeInAppVersion;
      data["TimeOutAppVersion"] = row.TimeOutAppVersion;
      data["Device"] = row.Device;
      data["Platform"] = row.Platform;

      data["LoggedHours"] = row.loggedhours;

      if (TotalLoggedHours != "00:00:00") {
        TotalLoggedHours = row.totalloggedhours;
      } else {
        TotalLoggedHours = "00:00";
      }
      data[" TotalLoggedHours"] = row.totalloggedhours;

      res.push(data);
      return res;
    }
  }
}
