// $(document).ready(function() {
//
// $("body").on("click","#submit", function() {
//   console.log("clicked");
//   initMap();
// });
//
//   $("body").on("click", "#submit", function() {
//     console.log("click");
//     initMap();
//   });

//============================================================= GOOGLE MAPS API ===============================================================
console.log("Maps is connected");

var map;
var pos;
var infowindow;
var infoWindowUser;
var interval;
var GeoMarker;
var austin;

var initMap = function() {

  var austin = {
    lat: 30.2672,
    lng: -97.7431
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: austin,
    zoom: 11,
    mapTypeId: "roadmap"
  });

  infowindow = new google.maps.InfoWindow();
  // infoWindowUser = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: './assets/images/blueDot.png',
        position: pos
      });

      map.setCenter(pos);

      // var geocoder = new google.maps.Geocoder();

      geocodeAddress(map);

    }, function() {
      handleLocationError(true, infoWindowUser, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindowUser, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindowUser.setPosition(pos);
    infoWindowUser.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindowUser.open(map);
    console.log("I just blocked this");
  }
};

var destination;


// function geocodeAddress(geocoder, resultsMap) {
//   var address = "6001 Shepherd Mountain Cove, Austin, TX";
//   // var address = document.getElementById('address').value;
//
//   geocoder.geocode({
//     'address': address
//   }, function(results, status) {
//     if (status === 'OK') {
//       // resultsMap.setCenter(results[0].geometry.location);
//       for (var i = 0; i < results.length; i++) {
//         var marker = new google.maps.Marker({
//           map: resultsMap,
//           position: results[i].geometry.location
//         });
//       }
//       // destination = results[0].geometry.location;
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

function geocodeAddress(resultsMap) {
  var geocoder = new google.maps.Geocoder();
  var address = ["6001 Shepherd Mountain Cove, Austin, TX", "3303 N Lamar Blvd, Austin, TX 78705", "3704 Kerbey Ln, Austin, TX 78731", "4112 Medical Pkwy, Austin, TX 78756"];

  for (var i = 0; i < address.length; i++) {
    geocoder.geocode({
      'address': address[i]
    }, function(results, status) {
      if (status === 'OK') {
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          var contentString = '<h1>Hello World</h1>';
          // var contentString = '<div id="iw-container">' +
          //                   '<div class="iw-title">' + place.name + '</div>' +
          //                     '<div class="iw-content">' +
          //                       '<div id="open">' + isOpen + '</div>' +
          //                       '<div id="rating">' + "Rating: " + place.rating + '</div>' +
          //                       '<img id="image" src="' + place.photos[0].getUrl({'maxWidth': 75, 'maxHeight': 75}) + '"><br>' +
          //                       '<button id="directions" onclick="getDirections()">' + "Directions" + '</button>' +
          //                     '</div>' +
          //                   '</div>' +
          //                 '</div>';
          destination = results[0].geometry.location;
          infowindow.setContent(contentString);
          infowindow.open(map, this);
        });
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });
  }
}




// Function that creates the Google Maps Marker
var id = 0;
// var destination;
var placeLoc;
var isOpen;

// function createMarker(place) {
//   placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     animation: google.maps.Animation.DROP,
//     position: place.geometry.location
//   });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     destination = place.geometry.location;
//     infowindow.setContent(contentString);
//     infowindow.open(map, this);
//   });
// }

var travelMode = 'DRIVING';

function getDirections() {
  // $("#textDirections").show();
  // $("#textDirections").css("width", "40%");
  // $("#map").css("width", "60%");
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 30.2672,
      lng: -97.7431
    }
  });
  // $("#floating-panel").show();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('textDirections'));
  var control = document.getElementById("floating-panel");
  control.style.display = "block";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  document.getElementById('mode').addEventListener('change', function() {
    travelMode = $('#mode').val();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: pos,
    destination: destination,
    travelMode: travelMode,
    // travelMode: 'DRIVING',
    provideRouteAlternatives: true
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
// });
