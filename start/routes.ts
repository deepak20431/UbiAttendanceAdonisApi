/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import Database from '@ioc:Adonis/Lucid/Database'
// import User1sController from 'App/Controllers/Http/User1sController'

// Route.get('/', async () => {

//   await Database
//     .insertQuery() // 👈 gives an instance of insert query builder.
//     .table('students')
//     .insert({id: 36 , name: 'Rocky', email: 'Rocky@.com',password: '#@##' })

    // await Database
    // .insertQuery() // 👈 gives an instance of insert query builder.
    // .table('student_info')
    // .insert({stu_id: '22' ,stu_Address: 'gwalior', stu_Mobile: '7974240666' })


    // await Database.table('students').multiInsert([                   // Multi-insert .
    //   { id: 7 , name: 'virk' ,email: 'romain' ,password: '3$456#' },
    //   { id: 8 , name: 'honey' ,email: 'honey@.com' ,password: '3$456#' },
    //   { id: 9 , name: 'money' ,email: 'sunny@.com' ,password: '3$456#' },
    //   { id: 10 , name: 'sunny',email: 'money@.com' ,password: '3$456#'},
    //   { id: 11 , name: 'Ronny',email: 'Ronny@.com' ,password: '3&d6#'}
    // ])
    

    // await Database   // // for delte all data.
    // .from("students")
    // .where('name','om') // // for delte single/condintioned data.
    // // .select("*")
    // .delete()


    //  await Database   // // for update  data.
    // .from("students")
    // .where('id','2')
    // .update({name:"shivu",email:"shivu@.comm",password:"shivu12"})


    // await Database
    // .from("students")
    // .where("id",17)
    // .andWhere("name","fiza")
    // .orWhere("name","shivam")
    // .delete()

    // await Database
    // .from("students")
    // .where("name","ashu")
    // .whereNot("id",20)
    // .delete()

  
    // await Database
    // .from("students")
    // .where("name","abhi")
    // .orWhereNot("id",21)
    // .delete()

  // const give = await Database
  // .from('students')
  // // .innerJoin('student_info',' students.id','student_info.password2')
  // // .join('student_info','student_info.password2','=','students.id')
  // // .rightJoin('student_info', 'student_info.password2', '=', ' students.id')
  // // .leftJoin('student_info', 'student_info.password2', '=', ' students.id')
  // .select("*")
  //  return give
   
  // var show= await Database
  //   .query()  // 👈 gives an instance of select query builder.
  //   .from('students')
  //   .select('*')
  //   return show

    // var show= await Database
    // .query()  // 👈 gives an instance of select query builder.
    // .from('student_info')
    // .select('*')
    // return show
  

// const query = Database.connection() // // to see all commmands.
// console.log(query);
// return query
// })
Route.get('/fetch','User1sController.index')
Route.get('/data22','User1sController.store')


// Route.get('/data','User1sController.index')
// Route.get('/data21','User1sController.create')
// Route.get('/data22','User1sController.store')
// Route.get('/data23','User1sController.show')
// Route.get('/data25','User1sController.update')
// Route.get('/data26','User1sController.destroy')
