import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class UserValidator  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super()

  }

  
  
  
  // Insert Designation schema
    static AddDesignationschema ={
  
   schema:schema.create({
      uid: schema.number.optional(),
      orgid: schema.number(),
      name: schema.string(),
      sts: schema.number.optional(),
      desc: schema.string.optional(),
    })
  }
  
  // Fetch Designation schema
     static Designationschema ={
      schema:schema.create({
        orgid:schema.number(),
        status:schema.number.optional(),
        pagename:schema.number.optional(),
        currentpage:schema.number.optional(),
        perpage:schema.number.optional()
  
      })
     }
  
  
    //  Update designation schema
     static updateDesignationschema={
      schema:schema.create({
        uid:schema.number(),
        design:schema.string(),
        sts:schema.number.optional(),
        orgid:schema.number()
        
      })
     }
  
  
  
  
  }
  

