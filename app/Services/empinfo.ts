import Database from "@ioc:Adonis/Lucid/Database";
// import moment from "moment-timezone";

export default class EmployeeInfo {

    public async getEmployee(reqdata:[]) {
        const orgid= reqdata['orgid'];
        var searchtext=reqdata['searchval'];
        // console.log(orgid);
        // console.log(searchtext);
        const data1: any = [];
        const query= await Database.query().select('Addon_FaceRecognition').from('licence_ubiattendance')
        .where('OrganizationId',orgid);
        if(query.length > 0){    
         var face_addon =query[0].Addon_FaceRecognition;  
        }
       let query1:any =  Database.query()
       .select('E.Id','E.FirstName',Database.raw(`IF(E.lastname != '', CONCAT(E.FirstName, ' ', E.lastname), E.FirstName) as Name`),'E.Department','D.Name as DepartmentName','E.Designation','Desig.Name as DesignationName','E.Shift','s.name as Shiftname','U.Username as Email','U.username_mobile as mobile','U.Password','U.appSuperviserSts as adminsts','VisibleSts as archive','E.ImageName','U.Selfie','U.Device_Restriction as Device_Restriction','U.Finger_Print','U.Face_Id','U.QR_code',Database.raw("IFNULL((SELECT countrycode FROM CountryMaster WHERE Id = (SELECT CurrentCountry FROM EmployeeMaster as Emp WHERE Emp.Id = U.EmployeeId)), 0) as CountryCode"))
       .from('EmployeeMaster as E')
       .innerJoin('UserMaster as U','E.Id','U.EmployeeId')
       .innerJoin('Departmentmaster as D','D.Id','E.Department')
       .innerJoin('Designationmaster as Desig','Desig.Id','E.Designation')
       .innerJoin('shiftMaster as S','S.Id','E.shift')
       .where('E.OrganizationId',orgid)
       .andWhere('U.VisibleSts',1)
       .andWhere('U.archive',1)
       .andWhere('E.archive',1)
       .andWhere('E.Is_Delete',0).limit(reqdata['perpage']).offset(reqdata['currentPage']);
       
       if(searchtext!=''){
            query1 = query1.andWhere('FirstName','LIKE',"%"+searchtext+"%");
             //query1 = query1.whereILike('FirstName',"%"+searchtext+"%")
       }
       if(reqdata['status'] == 2){
        //department head
        query1 = query1.andWhere('E.Department',);
         //query1 = query1.whereILike('FirstName',"%"+searchtext+"%")
        }
        const quer= await query1;
        quer.forEach((row: any)=>{
        const data: any = {};
        data["EmployeeId"] = row.Id;
        data["Name"] = row.Name.trim();
        data['DepartmentId']=row.Department;
        data['Department']='-';
        if(row.DepartmentName != '' || row.DepartmentName != 'NULL'){
            data['Department'] = row.DepartmentName;
        }
        data['DesignationId']=row.Designation;
        data['DesignationName']='-';
        if(row.DesignationName != '' || row.DesignationName != 'NULL'){
            data['DesignationName'] = row.DesignationName;
        }
        data['ShiftId']=row.Shift;
        data['DesignationName']='-';
        if(row.DesignationName != '' || row.Shiftname != 'NULL'){
            data['Shiftname'] = row.Shiftname;
        }
        data['archive']=row.archive;
        data['Admin']= row.adminsts;
        //////////////
        data['Email']=row.Email;
        data['Mobile']=row.mobile;
        data['Password']= row.Password;
        //////////////////////
        data['Selfie'] = row.Selfie;
        data['Finger_Print'] = row.Finger_Print;
        data['Device_Restriction'] = row.Device_Restriction;
        data['Face_Id'] = row.Face_Id;
        data['QR_code'] = row.QR_code;
        data['CountryCode']=row.CountryCode;
        data['AddonFaceRecognition']=face_addon;
        data1.push(data);
      });
      return data1;
        
    }


}