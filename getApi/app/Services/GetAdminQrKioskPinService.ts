import Database from "@ioc:Adonis/Lucid/Database";

export default class GetAdminQrKioskPinService {

    static async GetAdminQrKioskPin(data) {

        var result: any = {};     //defines an array of object

        const query = await Database.from('UserMaster').select('kioskPin')
            .where('OrganizationId', '=', data.OrganizationId)
            .andWhere('EmployeeId', '=', data.EmployeeId)
            .andWhere('kioskPin', '=', data.kioskPin);

        if (query.length > 0) {
            result['response'] = 1; 
        }
        else {
            result['response'] = 2;
        }

        return result;

    }
}