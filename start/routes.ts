import Route from '@ioc:Adonis/Core/Route'
const jwt = require('jsonwebtoken')
//import getAttendances from 'App/Controllers/Http/getAttendances_Controller'
//import { Group } from '@japa/runner'


//---------------Grouping---------

Route.group(()=>{

    Route.get("/book/" ,() =>{
        return "Hello AdonisJs with Id "
   }).prefix("/api")

}).prefix("/Users")

//-------------------------------------------------------------

Route.get('/holidayM','HolidayMastersController.Fetchholidaymaster')
Route.get('/holidayM/store','HolidayMastersController.store')
Route.get('/holidayM/show','HolidayMastersController.show')

// Route.group(()=>{
//     Route.group(()=>{
//         Route.group(()=>{
// Route.get('/index/','HolidayMastersController.index').as('index')
// Route.get('/store','HolidayMastersController.store').as('store')
// Route.get('/show','HolidayMastersController.show').as('show')
// }).prefix('/holidayM1').as('data')
// }).prefix('/holid').as('data1')
// }).prefix('/holida').as('data2')

Route.get('/holidayinsert','HolidayMastersController.Insert')
Route.get('/holidaysFetch','HolidayMastersController.index')


//--------------------------------------------------------------

//Route.get('/getAttendances','getAttendances_Controller.index')

// Route.get('/getAttendances', async (ctx) => {
//     return new getAttendances().index(ctx)
//   })

  Route.get('/getAttendances', async (ctx) => {
    const { default: getAttendances } = await import(
        'App/Controllers/Http/getAttendances_Controller'
    )
    return new getAttendances().index(ctx)
  })

  Route.post('/login', 'AuthController.login');


  // Route.get('/',async(auth)=>{

  

  // })



