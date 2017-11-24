'use strict';

var secret = require('./secret');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var coo = position.coords;
    var loc = [coo.latitude, coo.longitude];
    // var loc = secret.loc;

    var mymap = L.map('mapid').setView(loc, 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: secret.accessToken
    }).addTo(mymap);

    var loc1 = [
      Math.floor(loc[0]), // 1 deg
      Math.floor(loc[1]) & 0xfffffffe // 2 deg
    ];
    var loc2 = [loc1[0] + 1, loc1[1] + 2];
    var square = [loc1, [loc2[0], loc1[1]], loc2, [loc1[0], loc2[1]]];
    var name = (
      String.fromCharCode(Math.floor(loc1[1] / 20) + 74) +
      String.fromCharCode(Math.floor(loc1[0] / 10) + 74) +
      ((n => n > 0 ? n : n + 10)((loc1[1] / 2) % 10)).toString() +
      (loc1[0] % 10).toString()
    );

    console.log(loc, square, name);
    var polygon = L.polygon(square, {fillOpacity: 0,}).addTo(mymap);
    var marker = L.marker(loc).addTo(mymap);
    marker.bindPopup(name).openPopup();
  });
}
