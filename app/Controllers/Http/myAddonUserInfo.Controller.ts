import { HttpContext } from "@adonisjs/core/build/standalone";

export default class myAddonUserInfo{
public async  myAddonUserInfo({request,response}:HttpContext) {
    const orgid: string = request.query.orgid ?? '';
    const empid: string = request.query.empid ?? '';
  
    const result: Record<string, any> = {};
  
    const query = await this.db.query(
      `SELECT * FROM UserMaster WHERE EmployeeId='${empid}' AND OrganizationId='${orgid}'`
    );
  
    for (const row of query.result()) {
      result['qrKioskPin'] = row.kioskPin;
    }
  
    response.send(JSON.stringify(result));
  }
}
  