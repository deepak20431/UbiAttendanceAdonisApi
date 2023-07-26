import Route from '@ioc:Adonis/Core/Route'

Route.get('/getAttendance', 'AttendancesController.getAttendance')
Route.get('/GetAdmin', 'AttendancesController.getAdminQrKioskPin')
Route.get('/GetQr', 'AttendancesController.GetQrKiosk')
Route.get('/getlast', 'AttendancesController.getLastTimeOut')
Route.get('/getshiftslist', 'AttendancesController.getmultishift')

Route.get('/getEmployeesList', 'AttendancesController.getEmployeesList')
Route.get('/setQrKioskPin', 'AttendancesController.setQrKioskPin')
Route.get('/getSetKioskPin', 'AttendancesController.getSetKioskPin')



