
const wifi = require('node-wifi');
wifi.init({ iface : null});

const electron = require('electron');
const ipc = electron.ipcRenderer;

const fetchButton = document.getElementById('fetchButton');
const scanButton = document.getElementById('scanButton');
const connectButton = document.getElementById('connectButton');
const deleteButton = document.getElementById('deleteButton');

let datas;

connectButton.addEventListener('click', function(){
    wifi.connect({ ssid : 'Airconnect Coding Town', password : '9487665541'}, function(err) {
    if (err) {
        console.log('connection error : ', err);
    }
    console.log('Connected');
   });
});

deleteButton.addEventListener('click', function(){
    wifi.deleteConnection({ ssid : 'Airconnect Coding Town'}, function(err) {
    if (err) {
        console.log('deleteConnection', err);
    }
    console.log('Deleted');
  });
});

fetchButton.addEventListener('click', function(){
    wifi.getCurrentConnections(function(err, currentConnections) {
        if (err) {
            console.log('getCurrentConnections error: ', err);
        }
        console.log('getCurrentConnections list : ', currentConnections);

        var html = "<table border='10|10' style='width:200%'>";
        html+= "<tr>";
        html+= "<th>"+'Wifi'+"</th>";
        html+="<th>"+'Mac'+"</th>";
        html+="<th>"+'Mode'+"</th>";
        html+= "</tr>";

    for (var i = 0; i < currentConnections.length; i++) {
        html+="<tr>";
        html+="<td>"+currentConnections[i].ssid+"</td>";
        html+="<td>"+currentConnections[i].mac+"</td>";
        html+="<td>"+currentConnections[i].mode+"</td>";
        
        html+="</tr>";

    }
    html+="</table>";
   
    document.getElementById("fetchWifi").innerHTML = html;

    });
})

scanButton.addEventListener('click', function(){
 
    wifi.scan().then(function (networks) {
        datas = networks;
        var html = "<table border='10|10' style='width:200%'>";
        html+= "<tr>";
        html+= "<th>"+'Wifi'+"</th>";
        html+="<th>"+'Mac'+"</th>";
        html+="<th>"+'Mode'+"</th>";
        html+= "</tr>";

    for (var i = 0; i < datas.length; i++) {
        html+="<tr>";
        html+="<td>"+datas[i].ssid+"</td>";
        html+="<td>"+datas[i].mac+"</td>";
        html+="<td>"+datas[i].mode+"</td>";
        
        html+="</tr>";

    }
    html+="</table>";
   
    document.getElementById("scanWifi").innerHTML = html;

      }).catch(function (error) {
          console.log('scan error : ', error)
      })
});