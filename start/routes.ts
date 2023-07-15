import Route from '@ioc:Adonis/Core/Route'
import { Group } from '@japa/runner'


Route.get("/book/" ,() =>{
     return "Hello AdonisJs with Id "
})

Route.put("/",() =>{
    return "Hello AdonisJs"
})

Route.post("/routes",() =>{
    return "Hello AdonisJs"
})

Route.patch("/",() =>{
    return "Hello AdonisJs"
})




//---------------Grouping---------

Route.group(()=>{

    Route.get("/book/" ,() =>{
        return "Hello AdonisJs with Id "
   }).prefix("/api")

}).prefix("/Users")






//-------------------------------------------------------------



Route.get('/holidayM/index/','HolidayMastersController.index')
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

Route.get('/holidayinsert','HolidayMastersController.create')
Route.get('/holidaysFetch','HolidayMastersController.store')

//--------------------------------------------------------------

Route.get('/getSet','GetSetKioskPinsController.getSetKioskPin')
//--------------------------------------------------------------

Route.get('/getAttendances','getAttendances_Controller.index')

// Route.get('/getSet','GetSetKioskPinsController.getSetKioskPin').name='route';
