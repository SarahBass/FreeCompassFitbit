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
import { Gyroscope } from "gyroscope";

//By Lucas Vieira - Own work, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1247135
let lateven = 0;
let latodd = 0;
let background = document.getElementById("background");
background.image = "background.png";
let person = document.getElementById("person");
let rose = document.getElementById("rose");
let rosewheel = document.getElementById("rosewheel");
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
  
  


  
var watchID = geolocation.watchPosition(locationSuccess, locationError, { timeout: 60 * 1000 });

function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
   rosewheel.groupTransform.rotate.angle = position.coords.heading;
  
  if (position.coords.heading < 10) {headLabel.text = "N: "+ position.coords.speed + "m/s";}
  else if (position.coords.heading > 170 && position.coords.heading < 190 ) {headLabel.text = "S: "+ position.coords.speed + "m/s";}
 else{ headLabel.text= "DEG: "+ position.coords.heading;}
   locationLabel.text = "LAT:" + (position.coords.latitude).toFixed(5) + " LON:" + (position.coords.longitude).toFixed(5) ;
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

  
  
  
function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}
 
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



if (Gyroscope) {
   console.log("This device has a Gyroscope!");
   const gyroscope = new Gyroscope({ frequency: 1 });
   gyroscope.addEventListener("reading", () => {
     console.log(
      `Gyroscope Reading: \
        timestamp=${gyroscope.timestamp}, \
        [${gyroscope.x}, \
        ${gyroscope.y}, \
        ${gyroscope.z}]`
     );
     gyroLabel.text = "x:"+gyroscope.x +"-y:"+gyroscope.y+"-z:"+gyroscope.z;
       
   });
   gyroscope.start();
} else {
   console.log("This device does NOT have a Gyroscope!");
 gyroLabel.text= "- - -";
}



function checkAndUpdateBatteryLevel() {
  batteryLabel.text = `${battery.chargeLevel}%`;
  if (battery.chargeLevel > 30){ batteryLabel.class = "labelgreen";}
  else {batteryLabel.class = "labelred";
        battery.onchange = (charger, evt) => {batteryLabel.class = "labelgreen";}}
}