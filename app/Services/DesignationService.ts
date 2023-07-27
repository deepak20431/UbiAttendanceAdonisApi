import Database from "@ioc:Adonis/Lucid/Database";
// import moment from "moment";

export default class DesignationService {
  // Insert Designation method
  public static async AddDesignation(a) {
    const currentDate = new Date();

    var query = await Database.query()
      .from("DesignationMaster")
      .where("Name", a.name)
      .andWhere("OrganizationId", a.orgid);

    const result: any = [];
    const res: any = await query;

    const r = res.length;

    if (r > 0) {
      result["status"] = -1;
      return false;
    }

    var query2: any = await Database.insertQuery()
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

    return query2;
  }














  // Fetch data method
  public static async getDesignation(a) {
    const begin = (a.currentpage - 1) * a.perpage;

    let query: any = Database.from("DesignationMaster")
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
      query = query.offset(begin).limit(a.perpage);
    }

    if (a.status != undefined) {
      query = query.where("Archive", a.status);
    }
    const currentDate = new Date();

    const result = await query;
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
      query = Database.from("DesignationMaster")
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

    return query;
  }






  
  // Update designation Method
  public static async updateDesignation(c) {
    const result: any[] = [];
    result["status"] = 0;
    let curdate = new Date();

    const query = await Database.from("DesignationMaster")
      .select("Id")
      .where("Name", c.design)
      .andWhere("OrganizationId", c.orgid)
      .andWhere("Id", c.uid);

    const Result: any = await query;
    const r = Result.length;
    if (r > 0) {
      result["status"] = -1;
      return result['status']
       // if dept already exists
      return false;
    }
    const queryResult = await Database.from("DesignationMaster")
      .select("Name", "archive")
      .where("OrganizationId", c.orgid)
      .where("Id", c.uid);

    let name = "";
    let sts1 = "";

    const qr: any = await queryResult;

    if (qr) {
      // Assign the values to the variables if a row is found
      name = qr.Name;
      sts1 = qr.archive;
    }

    var res: any = "";
    if (name != c.dna) {
      res = 2;
    } else if (name == c.design && c.sts != sts1) {
      res = c.sts;
    }

    var updateResult: any = await Database.query()
      .from("DesignationMaster")
      .where("id", c.uid)
      .update({
        Name: c.design,
        LastModifiedDate: curdate,
        LastModifiedById: c.uid,
        archive: c.sts,
        OrganizationId: c.orgid,
      });

    const updateResponse = await updateResult;
    if (updateResponse > 0) {
      c.id = c.uid;
      // const date = moment().format("YY-MM-DD HH:mm:ss");
    }
    return updateResult;
  }
}