import Database from "@ioc:Adonis/Lucid/Database";
import moment, { min } from "moment-timezone";
import { DateTime } from "luxon";
export default class ServiceNameService {
  static async Fecth(Maindata) {
    const datetimeString = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    // console.log(currentDateTime  //2023-07-17 15:28:11




//     // Separate the date and time parts using string manipulation
//     // const date = datetimeString.split(' ')[0]; // "2023-07-17"
//     // return date
//     const time = datetimeString.split(' ')[1];
//     // return time

//     const [hours, minutes] = time.split(':');

//     // return minutes

//     const formattedHours = (parseInt(hours, 10) % 12) || 12; // Handle midnight (00:00) as 12

// // Format the time as "h:mm" (12-hour format with no leading zeros)
// const formattedTime = `${formattedHours}:${minutes}`;

// return formattedTime




const timeString = '15:41:58';

// Separate hours and minutes using the colon (:) as the delimiter
const [hours, minutes] = timeString.split(':');

// Convert hours to 12-hour format and remove leading zeros
const formattedHours = (parseInt(hours, 10) % 12) || 12; // Handle midnight (00:00) as 12

// Format the time as "h:mm" (12-hour format with no leading zeros)
const formattedTime = `${formattedHours}:${minutes}`;

// return formattedTime
// const startdate = '2020/01/09';
// const begin  = DateTime.fromISO(startdate)
// return begin null






const startdate = '2020-01-09';
const begin  = DateTime.fromISO(startdate)

// return begin"2020-01-09T00:00:00.000+05:30"
// const formattdate = begin.toFormat('yyyy/MM/dd')
// return formattdate2020/01/09

const newDate = begin.plus({days:1})  //"2020-01-10T00:00:00.000+05:30"
const changeformate = newDate.toFormat('yyyy-MM-dd')
// return changeformate
// const newDate = begin.minus({days:1})  //"2020-01-10T00:00:00.000+05:30"
// const changeformat = newDate.toFormat('yyyy-MM-dd')
// return changeformat
const cars:any = ["Saab", "Volvo", "BMW"];
const carNames:any = [];

for (let i = 0; i < cars.length; i++) {
  carNames.push(cars[i]);
}
let index = 1;
let carbyindex = carNames.at(index);
// let carbyindex = carNames.at(2);


// return carbyindex;


const car2 = new Array("Saab", "Volvo", "90");//creating a new array
car2[0] = "Opel";
car2.push('apple')
 return car2
let fruit = car2[car2.length - 1];

return fruit
 const car2_tostring = car2.toString();

return car2_tostring



// Array Object
const person = {firstName:"John", lastName:"Doe", age:46};
return person


  }
}
