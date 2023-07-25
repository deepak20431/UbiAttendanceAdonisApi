import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class UserValidator  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super()

  }

  
  
  
  
    static AddDesignationschema ={
  
   schema:schema.create({
      uid: schema.number.optional(),
      orgid: schema.number(),
      name: schema.string(),
      sts: schema.number.optional(),
      desc: schema.string.optional(),
    })
  }
     static Designationschema ={
      schema:schema.create({
        orgid:schema.number(),
        status:schema.number(),
        pagename:schema.number(),
        currentpage:schema.number(),
        perpage:schema.number()
  
      })
     }
  
  
     static updateDesignationschema={
      schema:schema.create({
        uid:schema.number(),
        design:schema.string(),
        sts:schema.number(),
        did:schema.number(),
        orgid:schema.number()
        
      })
     }
  
  
  
  
  }
  

