import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";
export default class ServiceNameService {
  static async Fecth(Maindata) {
    // return Maindata
    let query: any = Database.from("AttendanceMainMaster")
      .innerJoin(
        "AttendanceChildMaster",
        "AttendanceMainMaster.Id",
        "AttendanceChildMaster.Id"
      )
      .where("OrganizationId", Maindata.OrganizationId) 
      .select("*");

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
