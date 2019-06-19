const wifi = require("node-wifi");
wifi.init({ iface: null });

const electron = require("electron");
const ipc = electron.ipcRenderer;

const net = require("net");

const fetchButton = document.getElementById("fetchButton");
const scanButton = document.getElementById("scanButton");
const connectButton = document.getElementById("connectButton");
const deleteButton = document.getElementById("deleteButton");
const tcpButton = document.getElementById("tcpButton");

// formtext

const ssidName = document.getElementById("ssidName");
const ssidPassword = document.getElementById("ssidPassword");
const ssidNames = document.getElementById("ssidNames");

let datas;
let wifiSsid;
const port = 80;
const host = "192.168.0.1";

wifi.getCurrentConnections(function(err, currentConnections) {
  if (err) {
    console.log("getCurrentConnections error: ", err);
  }
  console.log("getCurrentConnections list : ", currentConnections);
  ssidNames.value = currentConnections[0].ssid;
  wifiSsid = currentConnections[0].ssid;
});

tcpButton.addEventListener("click", function() {
  var client = new net.Socket();

  client.connect(
    port,
    host,
    function() {
      console.log("Connected");
      client.write("$SYC7866#");
      // client.write("$GHI7866#");
    }
  );

  client.on("data", function(data) {
    console.log("Received: " + data);
    client.destroy(); // kill client after server's response
  });

  client.on("close", function() {
    console.log("Connection closed");
  });
});

connectButton.addEventListener("click", function() {
  wifi.connect(
    { ssid: ssidName.value, password: ssidPassword.value },
    function(err) {
      if (err) {
        console.log("connection error : ", err);
      }
      console.log("Connected");
      if (!err) {
        ssidName.value = "";
        ssidPassword.value = "";
      }
    }
  );
});

deleteButton.addEventListener("click", function() {
  console.log("wifiSsid", wifiSsid);

  wifi.deleteConnection({ ssid: wifiSsid }, function(err) {
    if (err) {
      console.log("deleteConnection", err);
    }
    console.log("Deleted");
  });
});

fetchButton.addEventListener("click", function() {
  wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
      console.log("getCurrentConnections error: ", err);
    }
    console.log("getCurrentConnections list : ", currentConnections);

    var html = "<table border='10|10' style='width:100%'>";
    html += "<tr>";
    html += "<th>" + "Wifi" + "</th>";
    html += "<th>" + "Mac" + "</th>";
    html += "<th>" + "Mode" + "</th>";
    html += "</tr>";

    for (var i = 0; i < currentConnections.length; i++) {
      html += "<tr>";
      html += "<td>" + currentConnections[i].ssid + "</td>";
      html += "<td>" + currentConnections[i].mac + "</td>";
      html += "<td>" + currentConnections[i].mode + "</td>";

      html += "</tr>";
    }
    html += "</table>";

    document.getElementById("fetchWifi").innerHTML = html;
  });
});

scanButton.addEventListener("click", function() {
  wifi
    .scan()
    .then(function(networks) {
      datas = networks;
      var html = "<table border='10|10' style='width:100%'>";
      html += "<tr>";
      html += "<th>" + "Wifi" + "</th>";
      html += "<th>" + "Mac" + "</th>";
      html += "<th>" + "Mode" + "</th>";
      html += "</tr>";

      for (var i = 0; i < datas.length; i++) {
        html += "<tr>";
        html += "<td>" + datas[i].ssid + "</td>";
        html += "<td>" + datas[i].mac + "</td>";
        html += "<td>" + datas[i].mode + "</td>";

        html += "</tr>";
      }
      html += "</table>";

      document.getElementById("scanWifi").innerHTML = html;
    })
    .catch(function(error) {
      console.log("scan error : ", error);
    });
});
