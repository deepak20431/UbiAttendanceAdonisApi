import Database from "@ioc:Adonis/Lucid/Database";

export default class GeofencesService{
    constructor(){}

    static async GetGeofenceallData(data){
      
       const currentpage:Number = data.currentpage ;
       const pagename:Number = data.pagename; 
       const orgid:Number = data.orgid;
       const perPage:Number = data.perPage
       const begin:Number = (currentpage - 1)*perPage
       console.log(begin);
       
       const query:any= await Database.query().from('Geo_Settings').select(' Id,Name,Location,Status,Lat_Long,Radius').where(data).limit(10)
       return query
        

    }


}