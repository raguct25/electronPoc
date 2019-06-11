console.log('wifi function called');

var wifi = require('node-wifi');
 
// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null
});

// wifi.scan(function(err, networks) {
//     if (err) {
//         console.log('Scanning Error : ', err);
//     } else {
//         console.log('scan wifi : ', networks);
//     }
// });

// All functions also return promise if there is no callback given
wifi.scan().then(function (networks) {
    // networks
    console.log('networks : ', networks)
  }).catch(function (error) {
      console.log('scan error : ', error)
    // error
  })


// Connect to a network
// wifi.connect({ ssid : 'Airconnect Coding Town', password : '9487665541'}, function(err) {
//     if (err) {
//         console.log('connection error : ', err);
//     }
//     console.log('Connected');
// });

// Delete a saved network
// not available on all os for now
// wifi.deleteConnection({ ssid : 'CODINGTOWN ACT'}, function(err) {
//     if (err) {
//         console.log('deleteConnection', err);
//     }
//     console.log('Deleted');
// });


// List the current wifi connections
wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log('getCurrentConnections error: ', err);
    }
    console.log('getCurrentConnections list : ', currentConnections);
});

 