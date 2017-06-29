function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation) {
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    output.innerHTML = "<p><strong>You are Here:</strong></p>";

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {
        lat: lat,
        lng: long
      }
    });


    var u = "https://developers.zomato.com/api/";
    var version = "v2.1";
    var url = u + version;
    var key = "bd73bb6587237be319492bcc0dadb697";
    var zheader = {
      Accept: "text/plain; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Zomato-API-Key": key
    };

    $.ajax({
      url: url + "/geocode?",
      headers: zheader,
      data: {
        lat: lat,
        lon: long
      }
    }).then(function(data) {
      var output = data.nearby_restaurants;
      var randomOut = output[Math.floor(Math.random() * output.length)];
      var outputLocationData = {};
      outputLocationData.name = randomOut.restaurant.name;
      outputLocationData.address = randomOut.restaurant.location.address;
      outputLocationData.city = randomOut.restaurant.location.locality;
      resLat = randomOut.restaurant.location.latitude;
      resLong = randomOut.restaurant.location.longitude;
      var mapOutput = document.getElementById("out");

      var marker = new google.maps.Marker({
        position: {lat: parseFloat(resLat), lng: parseFloat(resLong)},
        map: map
      });

      var nameAddress = document.getElementById("nameOut");
      nameAddress.innerHTML = "<span style=\"text-decoration:underline;\"><strong>You Should Try This Restaurant:</strong></span><br><dl><li>Name: " + outputLocationData.name + "</li><li>Address: " + outputLocationData.address + "</li><li>Neighborhood: " + outputLocationData.city + "</li></dl>";
    });

  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<img src=\"./assets/loading.gif\"/>";

  navigator.geolocation.getCurrentPosition(success, error);

}
