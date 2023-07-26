import Route from '@ioc:Adonis/Core/Route'

Route.get('/getAttendance', 'AttendancesController.getAttendance')
Route.get('/GetAdmin', 'AttendancesController.getAdminQrKioskPin')
Route.get('/GetQr', 'AttendancesController.GetQrKiosk')
Route.get('/getlast', 'AttendancesController.getLastTimeOut')
Route.get('/getshiftslist', 'AttendancesController.getmultishift')
Route.get('/getdepartment','AttendancesController.getdepartment')
Route.post('/addDept','AttendancesController.addDept')
Route.post('/updatedept','AttendancesController.updatedept')