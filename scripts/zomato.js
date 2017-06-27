var zheader,version,url;
var u = "https://developers.zomato.com/api/";
var Zomato = {
  init:function (opts) {
    if (opts.key!==null) {
      zheader = {
        Accept : "text/plain; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Zomato-API-Key":opts.key
      };
    } else {
      console.error("Enter the key");
    }
    version = opts.version||"v2.1";
    url = u + version;
  },
  geocode:function (coords,scb,ecb) {
    if (coords.latitude&&coords.longitude===null) {
      console.error("Enter the coordinates correctly");
    } else {
      $.ajax({
        url:url+"/geocode",
        headers:zheader,
        data:{
          lat:coords.latitude,
          lon:coords.longitude
        },
        success:function (response) {
          scb(response);
        },
        error:function (res) {
          ecb(res);
        }
      });
    }
  },
  restaurant:function (resid,scb,ecb) {
    if (resid===null) {
      console.error("Enter the restaurant id correctly");
    } else {
      $.ajax({
        url:url+"/restaurant",
        headers:zheader,
        data:{
          res_id:resid
        },
        success:function (response) {
          scb(response);
        },
        error:function (res) {
          ecb(res);
        }
      });
    }
  }
};
