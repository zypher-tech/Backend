


'use strict';



function ConsoleManager() {

	console.log("getting Orders making ajax req");

	var getOrdersReq = createCORSRequest('POST','https://us-central1-bookaholic-786.cloudfunctions.net/getUndeliveredOrders');
	if (!getOrdersReq) {
  			throw new Error('CORS not supported');
	}

	 getOrdersReq.onload = function() {
    	var text = xhr.responseText;
  			  console.log("Got response "+text);
 		 
 	 };

 		 getOrdersReq.onerror = function() {
  		  	alert('Woops, there was an error making the request.');
  		};

  		getOrdersReq.send();
	// Init Map 


};

  function initMap() {
  	console.log("Initing Map");
        var uluru = {lat:12.9716, lng:77.59};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      };








window.onload = function (event){
    console.log('Initializing Admin manager');
    window.console_manager = new ConsoleManager();
};
//https://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
	// xhr.setRequestHeader(“Access-Control-Allow-Origin”, “https:us-central1-bookaholic-786.cloudfunctions.net”);
	// xhr.setRequestHeader(“Access-Control-Allow-Credentials”, “true”);
	// xhr.setRequestHeader(“Access-Control-Allow-Methods”, “GET”);
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}