const chalk = require("chalk");
const request = require("request");
const city = process.argv[2];
if(city){
 console.log(city)
}
else{
console.log("no city")
}