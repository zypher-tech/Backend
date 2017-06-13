
const functions = require('firebase-functions');



/*Home Page*/
exports.home_page =functions.https.onRequest((request, response) => {
 response.send("Hello from Home AppBackend");
});



