console.log('new plugin wifi function called');

var WiFiControl = require('wifi-control');
 
//  Initialize wifi-control package with verbose output
WiFiControl.init({
  debug: true,
  iface :WiFiControl.findInterface() 
});

 //  Try scanning for access points:
 WiFiControl.scanForWiFi( function(err, response) {
    if (err) console.log(err);
    console.log(response);
  });