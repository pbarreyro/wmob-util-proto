var map, infoWindow;

var ERR_GEOLOC_FAIL = 'Error: The Geolocation service failed.';
var ERR_BROWSER_FAIL = 'Error: Your browser doesn\'t support geolocation.';

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), { center: {lat: -34.397, lng: 150.644}, zoom: 20 });
	infoWindow = new google.maps.InfoWindow;
	getCurrentLocation();
}


function getCurrentLocation(){

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };

	            infoWindow.setPosition(pos);
	            infoWindow.setContent('Location found.');
	            infoWindow.open(map);
	            map.setCenter(pos);

		}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

/****************** ERROR HANDLING / DEBUGGING UTILITIES ******************/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ? ERR_GEOLOC_FAIL : ERR_BROWSER_FAIL );
	infoWindow.open(map);
}