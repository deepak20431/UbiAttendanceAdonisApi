import Database from "@ioc:Adonis/Lucid/Database";
// import moment from "moment";
import Helper from "App/Helper/Helper";
const moment = require("moment");
require("moment-timezone");

export default class DesignationService {
  // Insert Designation method
  public static async AddDesignation(a) {
    const currentDate = new Date();

    var designationList= await Database.query()
      .from("DesignationMaster")
      .where("Name", a.name)
      .andWhere("OrganizationId", a.orgid)
      .select("Id");

      
    const result: any = [];
    const res: any = await designationList;

    const affectedRows = res.length;
    
    if (affectedRows> 0) {
      result["status"] = -1;
      return false;
    }

    var insertDesignation: any = await Database.insertQuery()
      .table("DesignationMaster")
      .insert({
        Name: a.name,
        OrganizationId: a.orgid,
        CreatedDate: currentDate,
        CreatedById: 1,
        LastModifiedDate: currentDate,
        LastModifiedById: 2,
        OwnerId: 3,
        Code: 8,
        RoleId: 9,
        HRSts: a.sts,
        Description: "YourDescriptionValue",
        archive: "YourArchiveValue",
        daysofnotice: "YourDaysOfNoticeValue",
        sts: a.sts,
        add_sts: "YourAddStsValue",
      });

    const res2: any = await insertDesignation;

    const affectedRows2 = res2.length;

    if (affectedRows2 > 0) {
      const timezone = await Helper.getTimeZone(a.orgid);
      const zone = timezone[0]?.name;

      const currentDateTime = moment().tz(zone);

      const date = new Date();
      const module = "Attendance app";
      const appModule = "Designation";
      const activityby = 1;
      var action = Helper.getempnameById(a.uid);
      const insertActivityHistoryMaster:any = await Database.insertQuery()
        .table("ActivityHistoryMaster")
        .insert({
          ActionPerformed:action,
          AppModule:appModule,
        });
      result["status"] = 1;
      return result;
    }
  }
  // Fetch data method
  public static async getDesignation(a) {
    const begin = (a.currentpage - 1) * a.perpage;

    let designationList: any = Database.from("DesignationMaster")
      .select(
        "Id",
        "OrganizationId",
        Database.raw(
          "IF(LENGTH(`Name`) > 30, CONCAT(SUBSTR(`Name`, 1, 30), '...'), `Name`) AS `Name`"
        ),
        "archive"
      )
      .where("OrganizationId", a.orgid)
      .orderBy("Name", "asc");

    if (a.currentpage != 0 && a.pagename == 0) {
      designationList = designationList.offset(begin).limit(a.perpage);
    }

    if (a.status != undefined) {
      designationList = designationList.where("Archive", a.status);
    }
    const currentDate = new Date();

    const result = await designationList;
    const s: any[] = [];
    var res = 0;
    result.forEach(function (val) {
      const data: any = {};
      data["name"] = val.Name;
      data["archive"] = val.archive;
      const Name = data["name"];

      const archive = data["archive"];
      if (Name.toUpperCase() == "TRIAL DESIGNATION" && archive === 1) {
        res = 1;
      }
    });

    if (res == 1) {
      designationList = Database.from("DesignationMaster")
        .select(
          "Id",
          Database.raw(
            "IF(LENGTH(`Name`) > 30, CONCAT(SUBSTR(`Name`, 1, 30), '...'), `Name`) AS `Name`"
          ),
          "archive"
        )
        .where("OrganizationId", a.orgid)
        .orderBy("name", "asc");
    }

    return designationList;
  }
  





  // Update designation Method
  public static async updateDesignation(c) {
    const result: any[] = [];
    result["status"] = 0;

    let curdate = new Date();

    const designationList = await Database.from("DesignationMaster")
      .select("Id")
      .where("Name", c.UpdateName)
      .andWhere("OrganizationId", c.Updateorgid)
      .andWhere("Id", c.Updateid);

    const Result: any = await designationList;
    const r = Result.length;

    if (r > 0) {
      result["status"] = -1;
      return result["status"];
      // if dept already exists
      return false;
    }
    const designationList2 = await Database.from("DesignationMaster")
      .select("Name", "archive")
      .where("OrganizationId", c.Updateorgid)
      .where("Id", c.Updateid);

    let name = "";
    let sts1 = "";

    const qr: any = await designationList2;
    const count3 = qr.length
    
    if (count3) {
      // Assign the values to the variables if a row is found
      name = qr.Name;
      sts1 = qr.archive;
    }

    var res: any = "";
    if (name != c.UpdateName) {
      res = 2;
    } else if (name == c.UpdateName && c.sts != sts1) {
      res = c.sts;
    }

    var updateDesignaion: any = await Database.query()
      .from("DesignationMaster")
      .where("id", c.Updateid)
      .update({
        Name: c.UpdateName,
        LastModifiedDate: curdate,
        LastModifiedById: c.uid,
        archive: c.sts,
        OrganizationId: c.Updateorgid,
      });

    const updateResponse = await updateDesignaion;
const count = updateResponse.length

if(count>0){

  const timezone = await Helper.getTimeZone(c.Updateorgid);
      const zone = timezone[0]?.name;

      const currentDateTime = moment().tz(zone);

      const date = new Date();
      const module = "Attendance app";
      const appModule = "Designation";
    const id = c.uid
    let actionperformed:any =""
    let r = 0
    if(r == 2)
    {
      actionperformed = Helper.getempnameById(c.uid);
      
    }else if(r==1){
      actionperformed = Helper.getempnameById(c.uid);
    }
    else
    {
      actionperformed = Helper.getempnameById(c.uid);
    }
    const activityby = 1;
      const insertctivityHistoryMaster:any = await Database.insertQuery()
        .table("ActivityHistoryMaster")
        .insert({
          ActionPerformed:actionperformed,
          AppModule:appModule,
        });
      result["status"] = 1;
      return result;
    
}
    return updateDesignaion;
  }
}
