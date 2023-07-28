import Database from "@ioc:Adonis/Lucid/Database";
import Helper from "App/Helper/Helper";

export default class loginService {
  public static async loginS(getData) {
  
    let userName1:string = Helper.encode5t(getData.userName.trim())

    let password1:string = Helper.encode5t(getData.password.trim())

    let loginMethod:string = getData.loginMethod.trim();

    let orgId:number = getData.orgId;

    let caseCondition = ''
    let caseCondition1 = ''


    if (loginMethod === 'QR' && orgId !== undefined ) {
      caseCondition1 = `and UserMaster.OrganizationId = '${orgId}'`
    } 
    else { 
      caseCondition = `and password = '${password1}'`
      console.log( caseCondition )
    }

    // const verifymail = await Database.from('OrganizationTemp')
    //   .where('Email', userName1)
    //   .orWhere('PhoneNumber', userName1)
    //   .andWhereRaw(caseCondition)
    //   .select("*")
    // //   .first()
    //  //return verifymail

    //   if (verifymail) {
    //     const mail_varified = verifymail
  
    //     if (mail_varified === '0') {
    //       return ({ mailstatus: '1'}) 
    //     }
    //   }


    const orgTempRow = await Database.query()
    .from('UserMaster as U').innerJoin("EmployeeMaster as E", "E.Id","U.EmployeeId").where('U.password',password1).orWhere("U.username_mobile",password1)
    .whereNotIn('E.OrganizationId', [502, 1074, 138265])
    // .whereNot({ archive: 1, Is_Delete: 1 })
    .whereNot("E.archive",1).whereNot("E.Is_Delete",1)
    .whereNotIn('VisibleSts',[0]).select('*').limit(5)

    return orgTempRow



    if(!orgTempRow){
        const data = { response: '2' }
        return data
    }

    //           const archive = row.archive
    //       const is_Del = row.Is_Delete
    //       const ubihrm_sts = getUbiatt_Ubihrmsts(row.OrganizationId) // Implement this function if it's available
    //       const VisibleSts = row.VisibleSts

    // if ((ubihrm_sts === '1') && (archive === 0 || is_Del === '1' || is_Del === '2' || VisibleSts === '0')) {
    //                 const data = { response: '2' }
    //                 return (data)
    //               }
            
    //               if (archive === 0 || is_Del === '1' || is_Del === '2') {
    //                 const data = { response: '2' }
    //                 return (data)
    //               }


     
  }
}