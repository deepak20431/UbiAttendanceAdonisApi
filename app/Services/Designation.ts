import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";

export default class DesignationService {
  // Insert Designation method
  public static async AddDesignation(a) {
    const currentDate = new Date();
    // return a.orgidret

    var query = await Database.query()
      .from("DesignationMaster")
      .where("Name", a.name)
      .andWhere("OrganizationId", a.orgid);

    const result: any = [];
    const res: any = await query;

    const r = res.length;

    if (r > 0) {
      result["status"] = -1; // if dept already exists
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
    var limitBy = "";

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
        .orderBy("name", "asc"); // Assuming $limitBy contains the limit value
    }

    return query;
  }

  // Update designation Method
  public static async updateDesignation(c) {
    const result: any[] = [];
    result["status"] = 0;
    let curdate = new Date();

    // const orgid =  Helper.getName(2);

    const query = await Database.from("DesignationMaster")
      .select("Name", "Id")
      .where("Name", c.design)
      .where("OrganizationId", c.orgid)
      .whereNot("Id", c.did);

    const Result: any = await query;
    const r = Result.length;
    return r;
    if (r > 0) {
      result["status"] = -1; // if dept already exists
      return false;
    }
    const queryResult = await Database.from("DesignationMaster")
      .select("Name", "archive")
      .where("OrganizationId", c.orgid)
      .where("Id", c.did)
      .first();

    let name = "";
    let sts1 = "";

    const qr = await queryResult;
    const count1 = qr.length;
    if (count1) {
      // Assign the values to the variables if a row is found
      name = queryResult.Name;
      sts1 = queryResult.archive;
    }

    var res: any = "";
    if (name != c.dna) {
      res = 2;
    } else if (name == c.dna && c.sts != sts1) {
      res = c.sts;
    }

    var updateResult: any = await Database.query()
      .from("DesignationMaster")
      .where("id", c.did)
      .update({
        Name: c.design,
        LastModifiedDate: curdate,
        LastModifiedById: c.uid,
        archive: c.sts,
      });

    const updateResponse = await updateResult;
    if (updateResponse > 0) {
      c.id = c.uid;
      const date = moment().format("YY-MM-DD HH:mm:ss");
    }
    return;
  }
}
