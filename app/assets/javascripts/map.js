var map;
var center = new google.maps.LatLng(35, -4);
var page;

google.maps.visualRefresh = true;
var MY_MAPTYPE_ID = 'custom_style';

function initialize() {
  var featureArray = [
    {
      "featureType": "administrative",
        "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
        "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road",
        "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "transit",
        "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "labels",
      "stylers": [
      { "visibility": "off" }
      ]
    }
  ];

  var uploadsMap = [
    {
      "featureType": "landscape",
      "stylers": [
        { "lightness": 12 },
        { "color": "#004f82" }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        { "lightness": 11 },
        {"color": "#3CB5E6" }
      ]
    }
  ];
  var downloadsMap = [
    {
      "featureType": "landscape",
        "stylers": [
        { "color": "#e69780" },
        { "gamma": 0.51 }
      ]
    },{
      "featureType": "water",
        "stylers": [
        {"color": "#F7B68D" }
      ]
    }
  ];
  var accountsMap = [
    {
      "featureType": "landscape",
      "stylers": [
      { "color": "#005c41" }
      ]
    },{
      "featureType": "water",
      "stylers": [
      { "color": "#87c182" }
      ]
    }
  ];

  page = window.location.pathname.split("/")[2];
  var featureOpts = [];

  if(page == "uploads"){
    featureOpts = featureArray.concat(uploadsMap);
  }else if(page == "downloads"){
    featureOpts = featureArray.concat(downloadsMap);
  }else if(page == "accounts"){
    featureOpts = featureArray.concat(accountsMap);
  };

  var mapOptions = {
    zoom: 3,
    center: center,
    disableDefaultUI: true,
    scrollwheel: false,
    scaleControl: false,
    navigationControl: false,
    draggable: false,
    disableDoubleClickZoom: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

}

//=================
// Circle Animation
//=================

var circleType = '';
var lat = 0.0;
var lng = 0.0;

var circleColors = {
  'download': '#FF9933',
  'upload': '#9BDDFF'
};

function newCircle(type,lat,lng) {
  var i = setInterval(function(){
    drawCircle(circleColors[type],lat,lng);
  },4500);
  setTimeout(function(){
    clearInterval(i);
  },60000);
}

function drawCircle(type,lat,lng) {
  var rad = 0;
  var fillOp = 1;
  for(var i=0; i<100; i++){
    setTimeout(function() {
      animate(type,lat,lng);
      rad += 10000;
      fillOp -= 0.01;
    }, i*50);
  };

  function animate() {
    var circle = new google.maps.Circle({
      map: map,
      radius: rad,
      center: new google.maps.LatLng(lat,lng),
      strokeOpacity: 0.0,
      fillColor: type,
      fillOpacity: fillOp,
    });
    setTimeout(function(){
      circle.setMap(null);
    },200);
  }
}


google.maps.event.addDomListener(window, 'load', initialize);


//=========================================================
// Dropdown and buttons
//=========================================================

$('#toggleStats').click(function(){
  $('.overlay').fadeToggle(100);
});

$('.large-tr').click(function() {
  $('.hiddenHr').fadeToggle(500);
  $('.hiddenDiv').slideToggle(50);
  $('.hidden').toggle();
  $('.arrow-left').toggleClass('hovered');
});

