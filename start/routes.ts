import Route from '@ioc:Adonis/Core/Route'


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










//-------------------------------------------------------------
Route.get('/holidayM','HolidayMastersController.index')
Route.get('/holidayinsert','HolidayMastersController.create')
Route.get('/holidaysFetch','HolidayMastersController.store')

//--------------------------------------------------------------

Route.get('/getSet','GetSetKioskPinsController.getSetKioskPin')
//--------------------------------------------------------------

Route.get('/getAttendances','getAttendances_Controller.index')
