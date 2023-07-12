import Database from "@ioc:Adonis/Lucid/Database";

export default class getLastTimeOutService {

    static async getLastTimeOut(data) {

        var curdate = new Date().toISOString().split('T')[0];
        // var attDatePastTwodays= 

        // var res={};
        // if(shifttype!=2){

        const query = await Database.from('AttendanceMaster').select('*')
            .where('EmployeeId', '=', data.EmployeeId).
            andWhere('OrganizationId', '=', data.OrganizationId)
            .andWhere('AttendanceDAte','<',curdate)
            .andWhere('TimeOut','=','00:00:0000')
            .andWhere('AttendanceStatus','=','1,3,5,8')
            
    }

}
