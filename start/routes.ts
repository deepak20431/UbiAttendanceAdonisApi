import Route from '@ioc:Adonis/Core/Route'
//import "../app/Routes/DepartmentRoute"
import  "../app/Routes/DesignationRoute"
Route.post('/login','loginApiController.checkLogin')
Route.get('/getdepartment','DepartmentsController.getdepartment').middleware('auth')
Route.post('/refreshtoken','GetTokensController.getToken')
Route.put('/logout','LogoutsController.logout').middleware('auth')