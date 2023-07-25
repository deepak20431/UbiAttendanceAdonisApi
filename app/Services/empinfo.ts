import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment-timezone";

export default class EmployeeInfo {

    public async getEmployee(reqdata:[]) {
        const orgid= reqdata['orgid'];
        console.log(orgid);
        //return false;
       const query1  = await Database.query()
       .select('E.Id',Database.raw(`IF(E.lastname != '', CONCAT(E.FirstName, ' ', E.lastname), E.FirstName) as Name`),'E.Department','D.Name as DepartmentName','E.Designation','Desig.Name as DesignationName','E.Shift','s.name as Shiftname','U.Username as Email','U.username_mobile as mobile','U.Password','U.appSuperviserSts as adminsts','VisibleSts as archive','E.ImageName','U.Selfie','U.Device_Restriction as Device_Restriction','U.Finger_Print','U.Face_Id','U.QR_code',Database.raw("(select countrycode from CountryMaster where Id IN (select CurrentCountry from EmployeeMaster as Emp where Emp.Id=U.EmployeeId)) as CountryCode"))
       .from('EmployeeMaster as E')
       .innerJoin('UserMaster as U','E.Id','U.EmployeeId')
       .innerJoin('Departmentmaster as D','D.Id','E.Department')
       .innerJoin('Designationmaster as Desig','Desig.Id','E.Designation')
       .innerJoin('shiftMaster as S','S.Id','E.shift')
       .where('E.OrganizationId',orgid)
       .andWhere('U.VisibleSts',1)
       .andWhere('U.archive',1)
       .andWhere('E.archive',1)
       .andWhere('E.Is_Delete',0);
       const data1: any = {};
       query1.forEach((row: any)=>{
        const data: any = {};
        data["EmployeeId"] = row.Id;
        data["Name"] = row.Name;
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
        data['DesignationId']=row.Designation;
        data['DesignationName']='-';
        if(row.DesignationName != '' || row.Shiftname != 'NULL'){
            data['Shiftname'] = row.Shiftname;
        }
        

        data['CountryCode']=row.CountryCode;

      });
        
    }


}