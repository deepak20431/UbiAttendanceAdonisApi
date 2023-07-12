import Route from '@ioc:Adonis/Core/Route'


Route.get('/GetQr','GetQrKioskStatusController.getQrKioskStatus')
Route.get('/GetAdmin','GetQrKioskStatusController.getAdminQrKioskPin')
Route.get('/getlast','getLastTimeOutController.getLastTimeOut')
Route.get('/getAttendance','getAttendancebothController.getAttendance')