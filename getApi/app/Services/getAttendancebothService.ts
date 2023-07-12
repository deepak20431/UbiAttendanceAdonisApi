import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";
import { DateTime } from "luxon";
// import { MomentTimezone } from "moment-timezone";
export default class getAttendancebothService {

    public static async getAttendance(a) {

        var query: any;
        const res: any[] = [];
        var curdate;
       
        
       
        if (a.date != undefined) {
            
                const parsedDate = DateTime.fromISO(a.date);
                const curdate = parsedDate.toFormat('yyyy-MM-dd');

                // curdate = moment(formattedDate).utcOffset('Asia/Kolkata')
                // return formattedDate;

             query = await Database.from('AttendanceMainMaster')
                .innerJoin('AttendanceChildMaster', 'AttendanceMainMaster.Id', '=', 'AttendanceChildMaster.Id')
                .select('*').where('AttendanceDate', '=', curdate);

        }else {
              
            var todaydate= new Date();
            curdate = moment(todaydate).utcOffset('Asia/Kolkata').format('YYYY-MM-DD');
           
             
            query = await Database.from('AttendanceMainMaster')
                .innerJoin('AttendanceChildMaster', 'AttendanceMainMaster.Id', '=', 'AttendanceChildMaster.Id')
                .select('*').where('AttendanceDate', '=', curdate);
        }

        //curdate = moment(formattedDate).utcOffset('Asia/Kolkata')
        query.forEach(function (row) {
            var data = {};
            data['OrganizationId'] = row.OrganizationId;
            data['EmployeeId'] = row.EmployeeId;
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
// const curdate = new Date().toISOString().split('T')[0];
            // const currentdate = new Date(curdate);
            // const todaydate=  new Intl.DateTimeFormat("en-IN").format(currentdate)
            //  return todaydate;
            // const curdate = moment().format('YYYY-MM-DD');
            // return curdate;
            // const todaydate = new Date(curdate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            // const todaydate1 = new Intl.DateTimeFormat("en-IN").format(todaydate)
            // return todaydate;

            // const date = new Date();
            // const curdate = moment(date).locale('en-in').format('YYYY/MM/DD').toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });;
            // return curdate;
             // console.log(query.toSQL().toNative());
