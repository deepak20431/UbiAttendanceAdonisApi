import Database from "@ioc:Adonis/Lucid/Database";

export default class EmployeesList {
 static async EmployeesList(data){
const begin = (data.currentPage - 1) * data.perPage
let limitBy = ''

if (data.currentPage !== 0 && data.pagename === 'shivam') {
  limitBy = `limit ${begin},${data.perPage}`
}
console.log(limitBy)
//   const adminstatus = data.empid
//   let cond = ''

//   if (adminstatus === '31701') {
//     const dptid = data.empid
//     cond = `AND Department = ${dptid}`
//   }


const query = await Database
.from("EmployeeMaster")
.select(
  Database.raw("Id,OrganizationId, CONCAT(FirstName, ' ', LastName) as name, EmployeeCode as ecode, NotificationStatus "))
.where("archive" , 1 )
.andWhere("is_Delete",0)
.andWhere("OrganizationId",data.orgid)
.andWhere("DOL ", '0000-00-00')
.orderBy("FirstName")
.limit(data.perPage)
.offset(begin)
//return query

const res : any[] = []
const queryResult = await query;
queryResult.forEach(function (row){
  const data1:any = {};
        data1["Id"]= row.Id;
        data1["OrganizationId"]= row.OrganizationId;
        data1["name"]= row.name;
        data1["sts"]= row.NotificationStatus;
        data1["ecode"]= row.ecode !== '' && row.ecode !== null ? row.ecode : '-';

        res.push(data1)
  })
     return res
}
}