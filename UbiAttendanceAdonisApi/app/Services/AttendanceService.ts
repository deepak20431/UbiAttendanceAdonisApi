import Database from "@ioc:Adonis/Lucid/Database";
import moment from 'moment'

export default class AttendanceService {

  public static async getAttendance(a) {

    const res: any[] = [];

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
    if (a.startdate != undefined && a.enddate != undefined) {
      var startdate = a.startdate.toFormat('yyyy-MM-dd');
      var enddate = a.enddate.toFormat('yyyy-MM-dd');
      query = query.whereBetween('AM.AttendanceDate', [startdate, enddate])
      query1 = query1.whereBetween('A.AttendanceDate', [startdate, enddate])
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
    if (a.EmployeeId != undefined) {
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

  static async GetQrKiosk(data) {
    var result: any = {};

    const query = await Database.query().from('UserMaster')
      .select('QrKioskPageReopen', 'kioskPin')
      .where('EmployeeId', '=', data.EmployeeId)
      .andWhere('OrganizationId', '=', data.OrganizationId)

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

  static async getLastTimeOut(data) {

    var curdate = new Date().toISOString().split('T')[0];
    // var attDatePastTwodays= 

    // var res={};
    // if(shifttype!=2){

    const query = await Database.from('AttendanceMaster').select('*')
      .where('EmployeeId', '=', data.EmployeeId).
      andWhere('OrganizationId', '=', data.OrganizationId)
      .andWhere('AttendanceDAte', '<', curdate)
      .andWhere('TimeOut', '=', '00:00:0000')
      .andWhere('AttendanceStatus', '=', '1,3,5,8')

  }

  public static async getmultishift(datas) {

    var res: any[] = [];

    var data = {};

    var query: any;
    var query1: any;

    query = await Database.from('ShiftPlanner').where('empid', datas.EmployeeId).andWhere('orgid', datas.OrganizationId);

    return query;
    query.forEach(async (row) => {
      data['ShiftDate'] = row.ShiftDate;
      data['shiftid'] = row.shiftid;
      data['weekoffStatus'] = row.weekoffStatus;
      data['Id'] = row.Id;

      query1 = await Database.from('ShiftMaster').where('OrganizationId', datas.OrganizationId).andWhere('Id', data['shiftid']);
    })

    // var q =  await GetMultishiftlist.query().from('ShiftPlanner').where('empid',datas.EmployeeId).andWhere('orgid',datas.OrganizationId).select('*');


    //     // await query1; 
    //     // return query;

    // })
    // var q1= await GetMultishiftlist.query().from('ShiftMaster').where('OrganizationId',datas.OrganizationId).andWhere('Id',data['shiftid'])

    //  res1.push(data1)

  }
}

