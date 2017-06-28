const messaging = firebase.messaging();


function orderManager(){
  this.checkSetup();
  console.log("Inside order Manager Page");
  this.email = document.getElementById('o_email');
  this.password = document.getElementById('o_password');
  this.signInButton = document.getElementById('o_login_button');
  this.secretCode = document.getElementById('o_secret_code');
  this.signUpButton = document.getElementById('o_sign_up_buttton');
  this.auth = firebase.auth();
  this.db = firebase.database();
  this.messaging = firebase.messaging();

  this.checkSigin();

  this.signInButton.addEventListener('click',this.doLogin.bind(this));



};

orderManager.prototype.doLogin = function () {
    var email = this.email.value;
    var password = this.password.value;

    this.auth.signInWithEmailAndPassword(email, password)
        .then(function (e) {
          console.log("Sigined In");
          getOrders();




        })
        .catch(function(error) {
        // Handle Errors here.
          console.log('Not Logged In');
          var errorCode = error.code;


        var errorMessage = error.message;
      console.log(errorMessage);
    });
};


orderManager.prototype.checkSigin = function () {

    console.log('cehcking Sigin in');
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // User is signed in.

              console.log('signed In');
              console.log("calling getOrders()");
              //Get the Orders from Database Show it
              getOrders();



        } else {
            // User is signed out.
            console.log('signed out');
            // this.email.focus();

        }

    }).bind(this);

};

function getOrders(){

      console.log("Inside get Orders");

        window.location='orders_page.html';
};




orderManager.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions.');
    } else if (config.storageBucket === '') {
        window.alert('Your Cloud Storage bucket has not been enabled. Sorry about that. This is ' +
            'actually a Firebase bug that occurs rarely. ' +
            'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
            'and make sure the storageBucket attribute is not empty. ' +
            'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
            'displayed there.');
    }
};





window.onload = function (event){
    console.log('Initializing Order manager');
    window.orderManager = new orderManager();
};
