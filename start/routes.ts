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
Route.group(()=>{
    Route.get('/','HolidayMastersController.index')
    Route.get('/insert','HolidayMastersController.create')
    Route.get('/Fetch','HolidayMastersController.store')
}).prefix('HolidayMastersController')



//--------------------------------------------------------------

Route.get('/getSet','GetSetKioskPinsController.getSetKioskPin')
//--------------------------------------------------------------

Route.get('/getAttendances','getAttendances_Controller.index')
