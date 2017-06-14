/*Created 27/4/17 by Nandha*/


'use strict';


function Login() {


        this.checkSetup();
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.signInButton = document.getElementById('login_button');
        this.secretCode = document.getElementById('secret_code');
        this.signUpButton = document.getElementById('sign_up_buttton');
        this.auth = firebase.auth();
        this.checkSigin();

        this.signInButton.addEventListener('click',this.doLogin.bind(this));



};

Login.prototype.doLogin = function () {
    var email = this.email.value;
    var password = this.password.value;

    this.auth.signInWithEmailAndPassword(email, password)
        .then(function (e) {
           window.location.href = './index.html';

        })
        .catch(function(error) {
        // Handle Errors here.
          console.log('Not Logged In');
        var errorCode = error.code;


        var errorMessage = error.message;
            console.log(errorMessage);
        // ...
    });
};




function pop(data) {

    console.log(data);

};

Login.prototype.checkSigin = function () {

    console.log('cehcking Sigin in');
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // User is signed in.

                pop('signed In');
            window.location.href = './index.html';


        } else {
            // User is signed out.
            pop('user Signed Out');
            // this.email.focus();

        }

    });

}
window.onload = function () {
    console.log('Insdide Login Function');
    window.login = new Login();
};

Login.prototype.checkSetup = function () {
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
