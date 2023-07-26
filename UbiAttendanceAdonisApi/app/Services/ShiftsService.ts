import Database from "@ioc:Adonis/Lucid/Database";

export default class ShiftsService { 
  constructor() { }
  static async getShiftData(a){
  //  const currentpage:number = a.currentpage;
   // const perpage:number = a.perpage;
    //const rowperpage:number = (currentpage - 1) * perpage;
    function getCurrentDate(): string {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    const currentDate = getCurrentDate();
    //console.log(currentDate);
    const orgid:number = a.OrganizationId;
    type KeyValuePair = { [key: string]: any }
    const keyValueArray: KeyValuePair[] = [];
    keyValueArray.push({ OrganizationId: orgid});
    let conditionarr =  keyValueArray[0];
    const data = await Database.query().from('ShiftMaster').select('*').where(conditionarr).orderBy('Name')
      //.offset(rowperpage).limit(perpage);
    let res: number = 0;
    data.forEach(element => {
      let name :string = element['Name'];
      let archive: number = element['archive'];
      if (name.toUpperCase() == "TRIAL SHIFT" && archive == 1) { 
        res = 1;
      }
    });
    let data1:any = '';
    if (res == 1) {
      let archive: number = a.archive;
      keyValueArray[0].archive = archive;
      conditionarr = keyValueArray[0];
      console.log(conditionarr);
      data1 = await Database.query().from('ShiftMaster').select('*').where(conditionarr).orderBy('Name');
      //console.log('test');
      return data1;
      
    } else { 
      const row = await Database.table('ShiftMaster').returning('id').insert({
        Name: 'Trial Shift',
        TimeIn: '09:00:00',
        TimeOut: '18:00:00',
        TimeInGrace: '17:00:00',
        TimeOutGrace: '17:00:00',
        TimeInBreak: '00:00:00',
        TimeOutBreak: '00:00:00',
        OrganizationId: orgid,
        CreatedDate: currentDate,
        CreatedById: 0,
        LastModifiedDate: currentDate,
        LastModifiedById: 0,
        OwnerId: 0,
        BreakInGrace: '00:00:00',
        BreakOutGrace: '00:00:00',
        archive: 1,
        shifttype: 1,
      });
      const id = row[0].id;
      if (id > 0) {
        for (let i = 1; i < 8; i++) {// create default weekly off
          await Database.table('ShiftMasterChild').insert({
            ShiftId: id,
            Day: i,
            WeekOff: '0,0,0,0,0',
            OrganizationId: orgid,
            ModifiedBy: 0,
            ModifiedDate: currentDate  
          });
        }
      
        let archive: number = a.archive;
        keyValueArray[0].archive = archive;
        conditionarr = keyValueArray[0];
        console.log(conditionarr);
        data1 = await Database.query().from('ShiftMaster').select('*').where(conditionarr).orderBy('Name');
        return data1;
      }
    }
    return data1;
  }

}