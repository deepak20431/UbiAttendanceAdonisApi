import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { DateTime } from 'luxon';
import Validator from 'App/Validators/Validator'
import ServiceOne from 'App/Services/HolidayM_Service'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User1sController {

  public async index({request,response}: HttpContextContract){   //HolidayMaster refer to  holidayM_services.ts
    const valid:any = await request.validate(Validator.newPostSchema)
    const result = await ServiceOne.Services1(valid)
    return response.json(result)       
}
  
  public async create({}: HttpContextContract){

   const data = await Database.table('holidays').multiInsert([      // Multi-insert in holiday refers to Models/holidays.ts
      { holiday_name: 'Gandhi Jayanti' , HM_Id: '53' },
      { holiday_name: 'Republic day' , HM_Id: '77' },
      { holiday_name: 'Shivratri' , HM_Id: '79' },
      { holiday_name: 'Strike' , HM_Id: '92' },
      { holiday_name: 'Eid' , HM_Id: '99' },
      { holiday_name: 'Independence Day' , HM_Id: '150' },
      { holiday_name: "Mahatma Gandhi Jayanthi" , HM_Id: '177' },
      { holiday_name: "Dussehra" , HM_Id: '183' },
      { holiday_name: "Diwali 2018" , HM_Id: '175' },
      { holiday_name: "Election" , HM_Id: '208' },
    ])
    return data
  }

  public async store({response}: HttpContextContract) {   //  fetching common data from holidaymaster & holidays

    const show = await Database
    .from('holidaymaster')
    .innerJoin('holidays',' holidaymaster.Id','holidays.HM_Id')
    .select("*")
    return response.json(show)

    // const show2 = await HolidayM.all()  // fetched all data from HolidayM -model
    // return show2
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
