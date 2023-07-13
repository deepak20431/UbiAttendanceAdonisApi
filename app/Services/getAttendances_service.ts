import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";

export default class LogicsOnly {
  public static async getAttendances__bothchange(data: any) {
    let query: any = Database.from("AttendanceMainMaster",)
      .innerJoin("AttendanceChildMaster","AttendanceMainMaster.Id","AttendanceChildMaster.Id")
      .innerJoin("DepartmentMaster","AttendanceMainMaster.Dept_id","DepartmentMaster.Id")
      .innerJoin("DesignationMaster","AttendanceMainMaster.Desg_id","DesignationMaster.Id" )
      .innerJoin("ShiftMaster","AttendanceMainMaster.ShiftId","ShiftMaster.Id" )
      .where("AttendanceChildMaster.OrganizationId", data.orgId)
      //.andWhere("ShiftId" ,data.shiftId )
      .select("*");

    if (data.date == undefined) {
      let currDate = moment().format("YYYY-MM-DD");
      query = query.where("AttendanceDate", currDate);
    } else {
      const originalDateString = data.date;
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
      data["Dept_id"] = val.Dept_id;
      data["Desg_id"] = val.Desg_id;
      data["ShiftId"] = val.ShiftId;
      data["EntryImage"] = val.EntryImage;
      data["TimeIn"] = val.TimeIn;
      data["TimeOut"] = val.TimeOut;
      data["AttendanceDate"] = new Date(val.AttendanceDate).toLocaleString("en-IN",{ timeZone: "Asia/Kolkata" });
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
