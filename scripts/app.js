function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation) {
    output.innerHTML = "<p><small>Geolocation is not supported by your browser</small></p>";
    return;
  }

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    output.innerHTML = "<p>You are Here:</p>";

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=13&size=372x200&sensor=false";

    output.appendChild(img);

    var u = "https://developers.zomato.com/api/";
    var version = "v2.1";
    var url = u + version;
    var key = "bd73bb6587237be319492bcc0dadb697";
    var zheader = {
      Accept : "text/plain; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Zomato-API-Key":key
    };

    $.ajax({
      url:url+"/geocode?",
      headers:zheader,
      data:{
        lat:lat,
        lon:long
      }
    }).then(function(data){
      var output = data.nearby_restaurants;
      var randomOut = output[Math.floor(Math.random()* output.length)];
      var outputLocationData = {};
      outputLocationData.name = randomOut.restaurant.name;
      outputLocationData.address = randomOut.restaurant.location.address;
      outputLocationData.city = randomOut.restaurant.location.locality;
      var nameAddress = document.getElementById("nameOut");
      nameAddress.innerHTML = "<span style=\"text-decoration:underline;\">You Should Try This Restaurant:</span><br><br><dl><li>Name: " + outputLocationData.name + "</li><li>Address: " + outputLocationData.address + "</li><li>Neighborhood: " + outputLocationData.city + "</li></dl>";
    });

  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p><small>Locating…</small></p>";

  navigator.geolocation.getCurrentPosition(success, error);

}
