import Database from "@ioc:Adonis/Lucid/Database";
import moment from 'moment-timezone'
export default class getAttendancebothService {

  public static async getAttendance(a) {

    const res: any[] = [];

    // const currentDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    // return currentDateTime;

    var query = Database.from('AttendanceMainMaster as AM')
      .innerJoin('DepartmentMaster as DM', 'AM.Dept_id', '=', 'DM.Id')
      .innerJoin('DesignationMaster as DSm', 'AM.Desg_id', '=', 'DSm.Id')
      .innerJoin('ShiftMaster as SM', 'AM.ShiftId', '=', 'SM.Id')
      .innerJoin('EmployeeMaster as EM', 'AM.EmployeeId', '=', 'EM.Id')
      .where('AM.OrganizationId', '=', a.OrganizationId)
      .select('AM.Id', 'AM.EmployeeId', 'EM.CurrentContactNumber', 'DM.Name',
        'EM.EmployeeCode', 'AM.ShiftId', 'AM.Dept_id', 'AM.Desg_id', 'AM.AttendanceDate',
        'AM.TimeIn', 'AM.TimeOut', 'AM.EntryImage', 'AM.ExitImage', 'AM.checkinloc',
        'AM.checkoutloc', 'AM.TimeInDeviceName', 'AM.remark', 'AM.remarks', 'AM.TimeInConfidence', 'AM.OrganizationId'
        , 'AM.TimeOutConfidence', 'SM.TimeInGrace', 'AM.TimeInGeoFence'
        , 'AM.TimeOutGeoFence', 'AM.FakeTimeOutTimeStatus',
        'AM.FakeTimeInTimeStatus', 'AM.FakeLocationStatusTimeIn', 'AM.FakeLocationStatusTimeOut'
        , 'AM.timeoutdate', 'AM.EmployeeId', 'AM.TimeInEditStatus', 'AM.TimeOutEditStatus', 'AM.latit_in _&_longi_in as lin', 'AM.latit_out_&_longi_out as lout', 'AM.device', 'AM.SuspiciousTimeInStatus', 'AM.SuspiciousTimeOutStatus', 'AM.SuspiciousDeviceTimeInStatus', 'AM.SuspiciousDeviceTimeOutStatus', 'EM.EmployeeCode', 'EM.FirstName', 'EM.MultipletimeStatus', 'SM.shifttype'
        , 'AM.AttendanceStatus', Database.raw(`CASE
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

    var query1 = Database.from('ArchiveAttendanceMaster as A')
      .innerJoin('DepartmentMaster as DM', 'A.Dept_id', '=', 'DM.Id')
      .innerJoin('DesignationMaster as DSm', 'A.Desg_id', '=', 'DSm.Id')
      .innerJoin('ShiftMaster as SM', 'A.ShiftId', '=', 'SM.Id')
      .innerJoin('EmployeeMaster as EM', 'A.EmployeeId', '=', 'EM.Id')
      .where('A.OrganizationId', '=', a.OrganizationId)
      .select('A.Id', 'A.EmployeeId', 'EM.CurrentContactNumber', 'DM.Name',
        'EM.EmployeeCode', 'A.ShiftId', 'A.Dept_id', 'A.Desg_id', 'A.AttendanceDate',
        'A.TimeIn', 'A.TimeOut', 'A.EntryImage', 'A.ExitImage', 'A.checkinloc',
        'A.checkoutloc', 'A.TimeInDeviceName', 'A.remark', 'A.remarks', 'A.TimeInConfidence', 'A.OrganizationId'
        , 'A.TimeOutConfidence', 'SM.TimeInGrace', 'A.TimeInGeoFence'
        , 'A.TimeOutGeoFence', 'A.FakeTimeOutTimeStatus',
        'A.FakeTimeInTimeStatus', 'A.FakeLocationStatusTimeIn', 'A.FakeLocationStatusTimeOut'
        , 'A.timeoutdate', 'A.EmployeeId', 'A.TimeInEditStatus', 'A.TimeOutEditStatus', 'A.latit_in as lin', 'A.latit_out as lout', 'A.device', 'A.SuspiciousTimeInStatus', 'A.SuspiciousTimeOutStatus', 'A.SuspiciousDeviceTimeInStatus', 'A.SuspiciousDeviceTimeOutStatus', 'EM.EmployeeCode', 'EM.FirstName', 'EM.MultipletimeStatus', 'SM.shifttype'
        , 'A.AttendanceStatus', Database.raw(`CASE
                    WHEN (SM.shifttype = 1) THEN SUBTIME(A.TotalLoggedHours, SM.HoursPerDay)
                    ELSE (
                      CASE
                        WHEN (A.TimeIn != '0000-00-00' AND A.TimeOut != '00:00:00') THEN (
                          CASE
                            WHEN (A.timeoutdate != '0000-00-00') THEN (
                              CASE
                                WHEN (SM.shifttype = 2 AND A.timeoutdate = A.timeindate) THEN SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.Timeout), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(DATE_ADD(A.AttendanceDate, INTERVAL 1 DAY), ' ', SM.TimeOut), CONCAT(A.AttendanceDate, ' ', SM.TimeIn)))
                                ELSE SUBTIME(TIMEDIFF(CONCAT(A.timeoutdate, ' ', A.TimeOut), CONCAT(A.AttendanceDate, ' ', A.TimeIn)), TIMEDIFF(CONCAT(A.timeoutdate, ' ', SM.TimeOut), CONCAT(A.AttendanceDate, ' ', SM.TimeIn)))
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

  if (a.startdate == undefined || a.enddate == undefined) {
    var todaydate = new Date();
    var curdate = moment(todaydate).utcOffset('Asia/Kolkata').format('YYYY-MM-DD');
    query = query.where('AM.AttendanceDate', curdate)
    query1 = query1.where('A.AttendanceDate', curdate);
  }
  if(a.startdate!=undefined && a.enddate!=undefined){
    var startdate = a.startdate.toFormat('yyyy-MM-dd');
    var enddate = a.enddate.toFormat('yyyy-MM-dd');
    query = query.whereBetween('AM.AttendanceDate',[startdate,enddate])
    query1 = query1.whereBetween('A.AttendanceDate',[startdate, enddate])
  }
      if (a.Dept_id != undefined) {
        query = query.where('AM.Dept_id', a.Dept_id)
        query1 = query1.where('A.Dept_id', a.Dept_id)
      }
      if (a.Desg_id != undefined) {
        query = query.where('AM.Desg_id', a.Desg_id)
        query1 = query1.where('A.Desg_id', a.Desg_id)
      }
      if (a.ShiftId != undefined) {
        query = query.where('AM.ShiftId', a.ShiftId)
        query1 = query1.where('A.ShiftId', a.ShiftId)
      }
      if(a.EmployeeId != undefined){
        query = query.where('AM.EmployeeId', a.EmployeeId)
        query1 = query1.where('A.EmployeeId', a.EmployeeId)
      }
      if (a.searchvalue != null) {
        query = query.where('EM.FirstName', a.searchvalue);
        query1 = query1.where('EM.FirstName', a.searchvalue);
      }

    const queryres = await query.union(query1)
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
      console.log(data['AttendanceDate'])
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

// whereIn('disapp_sts',query2)
    // var range = ['2023-04-01', '2023-07-01']
    // var query2 = Database.from('Disapprove_approve')
    //   .where('Disapprove_approve.AttendanceId', 'AM.Id')
    //   .andWhere('Disapprove_approve.disapp_sts', 0)
    //   .whereIn('Disapprove_approve.AttendanceDate', range)
    //   .limit(1);

    //   return query2;
        // const lastquery= Database.getQueryLog().pop();

        // var filterquery = Database.from('Disapprove_approve')
        // .where('Disapprove_approve.AttendanceId','=','AM.Id')
        // .andWhere('Disapprove_approve.disapp_sts','=',0)
        // .whereBetween('Disapprove_approve.AttendanceDate', [startdate,enddate])
        // .select('disapp_sts');