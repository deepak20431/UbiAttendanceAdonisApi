import Database from "@ioc:Adonis/Lucid/Database";
import Helper from "App/Helper/Helper";

export default class loginService {
  public static async login1(getData) {
    let userName1: string = getData.userName;
    let password1: string = getData.password;
    const query = await Database
     .from("OrganizationTemp")
     .where("Email", userName1).andWhere("password", password1)
     .select("*")

     if(query.length>0){
      const arr: any = [];
    arr.push(query[0].Name);
    arr.push(query[0].Email);
    arr.push(query[0].password);
    arr.push(query[0].Id);
    arr.push(10); 
    return arr;
     }else{
      return 0;
     }
  }
  public static async storetoken(arr:any={}) {
    
    const query1 = await Database.query()
                  .select("*").from("Emp_key_Storage").where("EmployeeId",arr.id)
                  .andWhere("OrganizationId",arr.orgid)
    if (query1.length > 0) {
      let query2 = await Database.query()
                    .from("Emp_key_Storage")
                    .where("EmployeeId",arr.id)
                    .andWhere("OrganizationId",arr.orgid)
                    .update("token",arr.token)
                    return arr.id  ; //id where is updation perform

    } else {
      // console.log("else")
      const query = await Database.table("Emp_key_Storage")
        .insert({
          EmployeeId: arr.id,
          OrganizationId: arr.orgid,
          Token: arr.token,
        })
        .returning("id");
        
      return arr.id;// last inserted Id;
    }
  }
  public static async loginS(getData) {
    const arr: any = [];

    let userName1: string = Helper.encode5t(getData.userName);

    let password1: string = Helper.encode5t(getData.password);

    // let loginMethod:string = getData.loginMethod.trim();

    // let orgId:number = getData.orgId;

    let caseCondition = "";
    let caseCondition1 = "";

    // if (loginMethod === 'QR' && orgId !== undefined ) {
    //   caseCondition1 = `and UserMaster.OrganizationId = '${orgId}'`
    // }
    // else {
    //   caseCondition = `and password = '${password1}'`
    //   console.log( caseCondition )
    // }
    arr.push(userName1);
    arr.push(password1);
    // return arr;
    // const verifymail = await Database.from('OrganizationTemp')
    //   .where('Email', userName1)
    //   .orWhere('PhoneNumber', userName1)
    //   .andWhereRaw(caseCondition)
    //   .select("*")
    //   .first()
    //return verifymail

    //   if (verifymail) {
    //     const mail_varified = verifymail
    //     console.log(mail_varified)

    // if (mail_varified === '0') {
    //   return ({ mailstatus: '1'})
    // }
    //   }

    const orgTempRow = await Database.query()
      .from("UserMaster as U")
      .innerJoin("EmployeeMaster as E", "E.Id", "U.EmployeeId")
      .where("U.password", password1)
      .orWhere("U.username_mobile", password1)
      .whereNotIn("E.OrganizationId", [502, 1074, 138265])
      // .whereNot({ archive: 1, Is_Delete: 1 })
      .whereNot("E.archive", 1)
      .whereNot("E.Is_Delete", 1)
      .whereNotIn("VisibleSts", [0])
      .select("*")
      .limit(5);

    return orgTempRow;

    if (!orgTempRow) {
      const data = { response: "2" };
      return data;
    }

    //           const archive = row.archive
    //       const is_Del = row.Is_Delete
    //       const ubihrm_sts = getUbiatt_Ubihrmsts(row.OrganizationId) // Implement this function if it's available
    //       const VisibleSts = row.VisibleSts

    // if ((ubihrm_sts === '1') && (archive === 0 || is_Del === '1' || is_Del === '2' || VisibleSts === '0')) {
    //                 const data = { response: '2' }
    //                 return (data)
    //               }

    //               if (archive === 0 || is_Del === '1' || is_Del === '2') {
    //                 const data = { response: '2' }
    //                 return (data)
    //               }
  }
}
