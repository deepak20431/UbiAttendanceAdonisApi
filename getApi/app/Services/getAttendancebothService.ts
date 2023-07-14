import Database from "@ioc:Adonis/Lucid/Database";
// import moment from "moment";
import moment from 'moment-timezone'


import { DateTime } from "luxon";
export default class getAttendancebothService {

    public static async getAttendance(a) {

        const res: any[] = [];
        // const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        // return currentDateTime;


        var query: any = Database.from('AttendanceMainMaster as AM')
            .innerJoin('DepartmentMaster as DM', 'AM.Dept_id', '=', 'DM.Id')
            .innerJoin('DesignationMaster as DSm', 'AM.Desg_id', '=', 'DSm.Id')
            .innerJoin('ShiftMaster as SM', 'AM.ShiftId', '=', 'SM.Id')
            .innerJoin('EmployeeMaster as EM', 'AM.EmployeeId', '=', 'EM.Id')
            .where('AM.OrganizationId', '=', a.OrganizationId)
            .select('AM.Id', 'AM.EmployeeId', 'DM.Name', 'EM.EmployeeCode', 'AM.ShiftId', 'AM.Dept_id', 'AM.Desg_id', 'AM.AttendanceDate', 'AM.TimeIn', 'AM.TimeOut', 'AM.EntryImage', 'AM.ExitImage', 'AM.checkinloc', 'AM.checkoutloc')


        if (a.date != undefined) {

            const inpdate = a.date.toFormat('yyyy-MM-dd');
            query = query.where('AttendanceDate', inpdate);
        }

        else {
            var todaydate = new Date();
            var curdate = moment(todaydate).utcOffset('Asia/Kolkata').format('YYYY-MM-DD');
            query = query.where('AttendanceDate', '=', curdate)
        }


        const queryres = await query;

        queryres.forEach(function (row) {
            var data = {};
            data['Id'] = row.Id;
            data['OrganizationId'] = row.OrganizationId;
            data['EmployeeId'] = row.EmployeeId;
            data['ShiftId'] = row.ShiftId;
            data['DeptId'] = row.Dept_id;
            data['DesgId'] = row.Desg_id;
            data['Name'] = row.Name;
            data['EmployeeCode'] = row.EmployeeCode;
            data['AttendanceDate'] = moment(row.AttendanceDate).utcOffset('Asia/Kolkata').format('YYYY-MM-DD');
            data['TimeIn'] = row.TimeIn;
            data['TimeOut'] = row.TimeOut;
            data['EntryImage'] = row.EntryImage;
            data['ExitImage'] = row.ExitImage;
            data['checkinloc'] = row.checkinloc;
            data['checkoutloc'] = row.checkoutloc;

            res.push(data);

        })

        return res;
    }
}

