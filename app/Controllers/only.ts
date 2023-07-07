import HolidayM from "App/Models/HolidayM";
import { hasOne } from "@ioc:Adonis/Lucid/Orm";

class User extends HolidayM {
    profile() {
      return this.hasOne('App/Models/HolidayM');
    }
  
  
  }
  