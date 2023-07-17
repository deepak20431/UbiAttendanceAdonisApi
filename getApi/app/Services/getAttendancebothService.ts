import Database from "@ioc:Adonis/Lucid/Database";
import moment from 'moment-timezone'
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
      .innerJoin('AttendanceChildMaster as AC', 'AM.Id', '=', 'AC.Id')
      .where('AM.OrganizationId', '=', a.OrganizationId)
      .select('AM.Id', 'AM.EmployeeId', 'EM.CurrentContactNumber', 'DM.Name',
        'EM.EmployeeCode', 'AM.ShiftId', 'AM.Dept_id', 'AM.Desg_id', 'AM.AttendanceDate',
        'AM.TimeIn', 'AM.TimeOut', 'AM.EntryImage', 'AM.ExitImage', 'AM.checkinloc',
        'AM.checkoutloc', 'AM.TimeInDeviceName', 'AM.remark', 'AM.remarks', 'AM.TimeInConfidence'
        , 'AM.TimeOutConfidence', 'SM.TimeInGrace', 'AM.TimeInGeoFence'
        , 'AM.TimeOutGeoFence', 'AM.FakeTimeOutTimeStatus', 'AC.timeincity', 'AC.timeoutcity',
        'AM.FakeTimeInTimeStatus', 'AM.FakeLocationStatusTimeIn', 'AM.FakeLocationStatusTimeOut'
        , 'AM.timeoutdate', 'AM.EmployeeId', 'AM.TimeInEditStatus', 'AM.TimeOutEditStatus', 'AM.latit_in _&_longi_in as lin', 'AM.latit_out_&_longi_out as lout', 'AM.device', 'AM.SuspiciousTimeInStatus', 'AM.SuspiciousTimeOutStatus', 'AM.SuspiciousDeviceTimeInStatus', 'AM.SuspiciousDeviceTimeOutStatus', 'EM.EmployeeCode', 'EM.FirstName', 'EM.MultipletimeStatus', 'SM.shifttype'
        , 'AM.AttendanceStatus', 'AC.Wo_H_Hd', 'AC.multitime_sts', Database.raw(`CASE
                    WHEN (SM.shifttype = 1) THEN SUBTIME(AM.TotalLoggedHours, SM.HoursPerDay)
                    ELSE (
                      CASE
                        WHEN (AM.TimeIn != '0000-00-00' AND AM.TimeOut != '00:00:00') THEN (
                          CASE
                            WHEN (AM.timeoutdate != '0000-00-00') THEN (
                              CASE
                                WHEN (SM.shifttype = 2 AND AM.timeoutdate = AM.timeindate) THEN SUBTIME(TIMEDIFF(CONCAT(AM.timeoutdate, ' ', AM.Timeout), CONCAT(AM.AttendanceDate, ' ', AM.TimeIn)), TIMEDIFF(CONCAT(DATE_ADD(AM.AttendanceDate, INTERVAL 1 DAY), ' ', SM.TimeOut), CONCAT(AM.AttendanceDate, ' ', SM.TimeIn)))
                                ELSE SUBTIME(TIMEDIFF(CONCAT(AM.timeoutdate, ' ', AM.TimeOut), CONCAT(AM.AttendanceDate, ' ', AM.TimeIn)), TIMEDIFF(CONCAT(AM.timeoutdate, ' ', SM.TimeOut), CONCAT(AM.AttendanceDate, ' ', SM.TimeIn)))
                              END
                            )
                            ELSE '00:00:00'
                          END
                        )
                        ELSE '00:00:00'
                      END
                    )
                  END AS overtime, 
                  SUBSTRING_INDEX(EntryImage,'.com/',-1) as EntryImage,
                  SUBSTRING_INDEX(ExitImage,'.com/',-1) as ExitImage
                  `))


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
      data['CurrentContactNumber'] = row.CurrentContactNumber;
      data['TimeInDeviceName'] = row.TimeInDeviceName;
      data['remark'] = row.remark;
      data['remarks'] = row.remarks;
      data['TimeInConfidence'] = row.TimeInConfidence;
      data['TimeOutConfidence'] = row.TimeOutConfidence;
      data['TimeInGrace'] = row.TimeInGrace;
      data['TimeInGeoFence'] = row.TimeInGeoFence;
      data['TimeOutGeoFence'] = row.TimeOutGeoFence;
      data['overtime'] = row.overtime;
      data['FakeTimeOutTimeStatus'] = row.FakeTimeOutTimeStatus;
      data['timeincity'] = row.timeincity;
      data['timeoutcity'] = row.timeoutcity;
      data['FakeTimeInTimeStatus'] = row.FakeTimeInTimeStatus;
      data['FakeLocationStatusTimeIn'] = row.FakeLocationStatusTimeIn;
      data['latit_in _&_longi_in'] = row.lin;
      data['lout'] = row.lout;
      data['lin'] = row.lin;
      data['device'] = row.device;
      data['SuspiciousTimeInStatus'] = row.SuspiciousTimeInStatus;
      data['SuspiciousTimeOutStatus'] = row.SuspiciousTimeOutStatus;
      data['SuspiciousDeviceTimeInStatus'] = row.SuspiciousDeviceTimeInStatus;
      data['SuspiciousDeviceTimeOutStatus'] = row.SuspiciousDeviceTimeOutStatus;
      data['EmployeeCode'] = row.EmployeeCode;
      data['FirstName'] = row.FirstName;
      data['MultipletimeStatus'] = row.MultipletimeStatus;
      data['shifttype'] = row.shifttype;

      res.push(data);

    })

    return res;
  }
}

