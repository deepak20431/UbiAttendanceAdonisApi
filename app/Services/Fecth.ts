import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";
export default class ServiceNameService {
  static async Fecth(data) {
    // return data
    let query: any = Database.from("AttendanceMainMaster")
      .innerJoin(
        "AttendanceChildMaster",
        "AttendanceMainMaster.Id",
        "AttendanceChildMaster.Id"
      )
      .innerJoin('onDeleteShift', 'table2.column', 'table3.column')

      .where("OrganizationId", data.OrganizationId) 

  .innerJoin('table4', 'table3.column', 'table4.column')
  .select('table1.*', 'table2.*', 'table3.*', 'table4.*')
  .where('table1.someColumn', 'someValue')
  .where('table2.someColumn', 'someValue')
  .where('table3.someColumn', 'someValue')
  .where('table4.someColumn', 'someValue')
      .select("*");

    if (data.AttendanceDate == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query = query.where("AttendanceDate", currDate);
    } else {
      const originalDateString = data.AttendanceDate;
      const originalDate = new Date(originalDateString);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      query = query.where("AttendanceDate", formattedDate);
    }

    const resp: any[] = [];
    const queryResult = await query;

    queryResult.forEach(function (val) {
      const data: any = {};
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
      resp.push(data);
    });
    return resp;
  }
}
