//import Holiday from "App/Models/HolidayM";
import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";

export default class ServiceOne {
  static async holidaymaster(orgId) { 
    
    const currentPage = 2;
    const perPage = 10;
    const begin = (currentPage - 1) * perPage;

    const q1: any[] = [];

    const query1 = await Database.query()
      .from("holidaymaster")
      .select("Id","Name","Description","DateTo","OrganizationId",
        Database.raw("DATE(DateFrom) AS fromDate"),
        Database.raw("DATEDIFF(DATE(DateTo),DATE(DateFrom))   AS DiffDate"),
        "DateFrom")
      .where("OrganizationId", orgId.orgId)
      .orderBy("fromDate", "asc")
      .limit(perPage)
      .offset(begin);

      interface defineTypes{
        Id:number,
        Name:string,
        description:string,
        orgnisationId:number,
        fromDate:Date,
        DiffDate:Date,
        DateTo:Date,
      }

    query1.forEach(function (val) {
      const data:defineTypes[] = [];
      data.push(val.Id);
      data.push(val.Name);
      data.push(val.Description);
      data.push(val.OrganizationId);
      data["fromDate"] = (moment(val.DateFrom).format("YYYY/MM/DD"))
      const DateFrom = data["fromDate"] 
      data.push(DateFrom);
      data.push(val.DiffDate);
      data["DateTo"] = moment(val.DateTo).format("YYYY/MM/DD")
      const DateTo = data["DateTo"]
      data.push(DateTo);
      q1.push(data);
  });

    return q1;
  }
}
