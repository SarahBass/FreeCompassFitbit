/*--- Import Information from user Account ---*/
import { settingsStorage } from "settings";
import { me as appbit } from "appbit";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";
import { units } from "user-settings";
import { geolocation } from "geolocation";
//import { Gyroscope } from "gyroscope";
import { me as companion } from "companion";

//By Lucas Vieira - Own work, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1247135
let lateven = 0;
let latodd = 0;
let background = document.getElementById("background");
let buttonnumber = 0;
let person = document.getElementById("person");
let rose = document.getElementById("rose");
let rosewheel = document.getElementById("rosewheel");
let rosecircle = document.getElementById("rosecircle");
let needle = document.getElementById("needle");
person.image = "person.png";
rose.image = "rose.png";
needle.image = "needle.png";
// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const clockLabel = document.getElementById("clockLabel");
const locationLabel = document.getElementById("locationLabel");
const gyroLabel = document.getElementById("gyroLabel");
const headLabel = document.getElementById("headLabel");
const batteryLabel = document.getElementById("batteryLabel");
let am = "am";
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
 
  let today = evt.date;
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();
  let mins = util.zeroPad(today.getMinutes());
  let seconds = today.getSeconds();
  
  if (util.zeroPad(hours) < 12){am = "AM";}
  else{am = "PM";}
  
  if (buttonnumber == 1){background.image = "background1.jpeg";}
  else{background.image = "background0.jpeg";}

if (geolocation && (appbit.permissions.granted("access_location")) && (appbit.permissions.granted("run_background"))){
  
var watchID = geolocation.watchPosition(locationSuccess, locationError, { timeout: 60 * 1000 });

function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
   rosewheel.groupTransform.rotate.angle = position.coords.heading;
  if(position.coords.speed > 0 ){rosecircle.animate("enable");}
  else{rosecircle.animate("disable");}
  if (position.coords.heading < 30 && position.coords.heading >= 0) {headLabel.text = "N: "+ (position.coords.speed).toFixed(2) + "m/s";}
  else if (position.coords.heading > 135 && position.coords.heading < 225 ) {headLabel.text = "S: "+ (position.coords.speed).toFixed(2) + "m/s";}
 else{ headLabel.text= "DEG: "+ (position.coords.heading).toFixed(0);}
  
  
  if ((position.coords.latitude == 0 && position.coords.latitude == 0) || (position.coords.speed == "null")) {locationLabel.text = "BEGIN WALKING AT STEADY SPEED";}
  else{locationLabel.text = "LAT:" + (position.coords.latitude).toFixed(5) + " LON:" + (position.coords.longitude).toFixed(5) ;}
  
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}
}
  else {headLabel.text= "GPS NOT FOUND";locationLabel.text = "ALLOW PERMISSION TO START"; }

  checkAndUpdateBatteryLevel();
  
  //west rosewheel.groupTransform.rotate.angle = 90;
  
  // south rosewheel.groupTransform.rotate.angle = 180;
  
 //east rosewheel.groupTransform.rotate.angle = 270;
  
  // north rosewheel.groupTransform.rotate.angle = 0;
  
 
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  clockLabel.text = `${hours}:${mins}`+ am +" " + (months+1) + "/"+ dates +"/"+ years;
    display.addEventListener('change', function () { if (this.on) {checkAndUpdateBatteryLevel();}
  
                                                    
                                                    
});
}


function checkAndUpdateBatteryLevel() {
  batteryLabel.text = `${battery.chargeLevel}%`;
  if (battery.chargeLevel > 30){ batteryLabel.class = "labelgreen";}
  else {batteryLabel.class = "labelred";
        battery.onchange = (charger, evt) => {batteryLabel.class = "labelgreen";}}
}
