
const functions = require('firebase-functions');



/*Home Page*/
exports.home_page =functions.https.onRequest((request, response) => {
 response.send("Hello from Home AppBackend");
});

exports.orderIsRecevied = functions.database.ref('/orders/{pushId}')
    .onWrite(snapshot => {
      // Grab the current value of what was written to the Realtime Database.
      console.log("Order Received : "+snapshot.data.val());
      

    });
