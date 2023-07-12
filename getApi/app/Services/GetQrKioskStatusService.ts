import Database from "@ioc:Adonis/Lucid/Database";

export default class GetQrKioskStatusService {

    static async GetQr(data) {
        var result:any = {};

        const query = await Database.query().from('UserMaster')
            .select('QrKioskPageReopen', 'kioskPin')
            .where('EmployeeId','=', data.EmployeeId)
            .andWhere('OrganizationId','=',data.OrganizationId)
            
        const affectedrows = query;

        if (affectedrows.length > 0) {

            affectedrows.forEach(function (row) {

                result['response'] = row.QrKioskPageReopen;
                result['kioskpin'] = row.kioskPin;

            });
        }
       
        else {
            result['response'] = '0';
        }
    
        return result;
    }
}
