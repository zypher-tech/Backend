

'use strict';
///The main Inistilisation code

function AdminManager() {

    this.checkSetup();
    // this.isSignedIn();todo: Add sign In

    pop('Initializing Variables');

    //Firebase Varaibles
    this.auth = firebase.auth();

    this.database = firebase.database();
    this.storage = firebase.storage();
    this.stroageRef = this.storage.ref();

    //Initialize DOM Variables


    //Progress bar
    // this.progressBar = document.getElementById('showbox');





    // ThE First Page of Add Books
    // Get ISBN or is ten or 13
    this.isbnToAddValue = document.getElementById('isbn_to_add');
    this.add_book_button = document.getElementById('isbn_add_button');
    this.add_book_button.addEventListener('click', this.addBookRequest.bind(this));



    //Add Book page variables
    this.productName = document.getElementById('pname');
    this.pid = document.getElementById('pid_text');
    this.pdesc = document.getElementById('pdesc');
    this.authorName = document.getElementById('aname');
    this.bSumm = document.getElementById('bsummary');
    this.publiserName  = document.getElementById('pubname');
    this.baseCategory = document.getElementById('base_category');
    this.subCateogry  = document.getElementById('sub_category');

    this.ISBN  = document.getElementById('isbn10');
    this.ISBN13 = document.getElementById('isbn13');
    this.MRP  = document.getElementById('mrp');
    this.ourPrice = document.getElementById('our_price');
    this.isBestSeller  = document.getElementById('best_seller');;
    this.isTopRated = document.getElementById('top_rate');;
    this.searchTags = document.getElementById('tags') ;

    //prcing
    this.unit1 = document.getElementById('unit_one_text');
    this.unit2 = document.getElementById('unit_two_text');
    this.unit3 = document.getElementById('unit_three_text');

    //Time Unit
    this.tm1 = document.getElementById('time_value1');
    this.tm2 = document.getElementById('time_value2');
    this.tm3 = document.getElementById('time_value13');

    //Price
    this.price1 = document.getElementById('price_one_text');
    this.price2 = document.getElementById('price_two_text');
    this.price3 = document.getElementById('price_three_text');
    //Image Upload Related DoM's
    this.submitImageButton = document.getElementById('submitImage');
    this.imageForm = document.getElementById('image-form');
    this.mediaCapture = document.getElementById('mediaCapture');
    //insert Product Button

    this.insetProductutton = document.getElementById('submit_button');
    this.insetProductutton.addEventListener('click',this.insertProduct.bind(this));
    //snackBar
    this.snackBar = document.getElementById('must-signin-snackbar');

    // Image upload
    this.submitImageButton.addEventListener('click',function (e) {
        e.preventDefault();
        this.mediaCapture.click();
    }.bind(this));

    this.mediaCapture.addEventListener('change',this.saveImage.bind(this));
        // Setting Pi -  NumChildren+1 in "books";
    this.setPid(this.database);








    //Search Functionality
    pop('Search initliazed');
    this.editbox = document.getElementById('search_editbox');
    this.searchButton = document.getElementById('search_button');
    this.searchButton.addEventListener('click',this.searchProduct.bind(this));
    this.lists = document.getElementById('lists1');

    //create Combo
    this.comboName  = document.getElementById('combo_name');
    // this.comboDescription = document.getElementById('');
    this.comboDesc = document.getElementById('combo_desc');

    // //Combo Products Pid
        this.cpid1 ;
        this.cpid2;
        this.cpid3;

    //Combo Product Name
        this.productName1;
        this.productName2;
        this.productName3;
    //Combo  Unit Values;
    this.cunit1  = document.getElementById('c_unit_one');
    this.cunit2 =  document.getElementById('c_unit_two');

    this.cunit3 =  document.getElementById('c_unit_three');

    //Combo TmeValues

    this.cTimeUnit1=  document.getElementById('c_time_value1');
    this.cTimeUnit2 =  document.getElementById('c_time_value1');
    this.cTimeUnit3=  document.getElementById('c_time_value1');

    //Pricing
    this.cpricing1=  document.getElementById('c_price_one_text');
    this.cpricing2=  document.getElementById('c_price_two_text');
    this.cpricing3 =  document.getElementById('c_price_three_text');

    //Combo Image
    this.cSubmitImageButton = document.getElementById('c_submitImage');
    this.cImageForm = document.getElementById('c_image-form');
    this.cMediaCapture = document.getElementById('cMediaCapture');

    this.cSubmitImageButton.addEventListener('click',function (e) {
        e.preventDefault();
        this.cMediaCapture.click();
    }.bind(this));

    this.cMediaCapture.addEventListener('change',this.saveComboImage.bind(this));
    this.cInsertComboButton = document.getElementById('submitComboButton');
    this.cInsertComboButton.addEventListener('click',this.insertComboProduct.bind(this));



    //Edit Functionality
    this.ePid =  document.getElementById('e_pid_text');
    this.ePname=  document.getElementById('e_pname');
    this.ePublisherName=  document.getElementById('epubname');
    this.eISBN10 =  document.getElementById('eisbn10');
    this.eISBN13 = document.getElementById('eisbn13');
    this.eBookSummary = document.getElementById('ebsummary');
    this.eAuthorName = document.getElementById('eaname');
    this.eMRP=  document.getElementById('emrp');
    this.eOurPrice=  document.getElementById('eour_price');
    this.ePdesc=  document.getElementById('epdesc');
    this.eUnit1 =  document.getElementById('eunit_one_text');
    this.eunit2 =  document.getElementById('eunit_two_text');
    this.eUnit3 =  document.getElementById('eunit_three_text');

    this.ePricing1 = document.getElementById('eprice_one_text');
    this.ePricing2 = document.getElementById('eprice_two_text');
    this.ePricing3 = document.getElementById('eprice_three_text');
    this.searchPidButton  = document.getElementById('edit_pid_button');
    this.searchPidButton.addEventListener('click',this.populateEditBoxes.bind(this));
    // this.updateProductbutton = =  document.getElementById('');

    //Edit image uploads




};



AdminManager.prototype.setPid = function (db) {

    pop('set PId Method');

    var rootRef = db.ref();
    var bookRef = db.ref('books');
    var count =0;
    count++;

    bookRef.once("value")
        .then(function (snapshot) {

            snapshot.forEach(function (singleData) {
                // var bookName = singleData.key;
                count++;
            });
           var mPid  = document.getElementById('pid_text');
           mPid.value = count;
        });



            // this.setPidToEntity(count);
            // mPid.focus();


};



/*This is Function which prints the log,
* send only Variables and Strings
* */
function pop(data) {

    console.log(data);

};


var pricing= {
    unit : 0,
    timeUnit: 0,
    timeText : 'NA',
    price:0,

    init: function (mUnit,mTimeUnit,mPrice) {
        this.unit =  mUnit;
        this.timeUnit = mTimeUnit;
        this.price = mPrice;
    },

    getTimeUnit:function () {
        switch (this.timeUnit){
            case 0: return "day";
            case 1:return "week";
            case 2: return "month";
        }

    },

    getPrice: function () {
        if (this.price != null){

            return this.price;
        }
        else{
            alert('no Price Declared');
        }
    }

};

AdminManager.prototype.insertProduct = function (event) {

    pop(this.productEntitiy.imageURL);
    this.validateFields();

};
/**
 * Created by nandhu on 25/4/17.
 */
var mSubCat;


AdminManager.prototype.isImageUploded = false;





// Used In ISBN PAGE , Makes Request SHow Repsonse
// Modifies Div if needed
AdminManager.prototype.addBookRequest = function (event) {
    event.preventDefault();
    var isbnToAdd  = document.getElementById('isbn_to_add').value;
    console.log("making Req for isbn "+isbnToAdd);
    var jsonData = {
        'isbn': parseInt(isbnToAdd),
        'isten':1

    };
    console.log("Sending Request Body : "+JSON.stringify(jsonData));
    $.ajax({
          url:'http://localhost:5000/api/isBooksPresent',
          type: "POST",
          data: JSON.stringify(jsonData),
          dataType: 'json',
          contentType: "application/json",
          success: function(data) {
           // processMyData(data);
           console.log("Got Response");
           var response = data;
           console.log("POJO :"+data);
           var pdi = data.pid;
           console.log("Pdi "+pdi);
           var pdd = data['pid'];
           console.log("pdd "+pdd);
            
           // showProductPage(response);

        }
      });

    //       beforeSend: function(x) {
    //         if (x && x.overrideMimeType) {
    //           x.overrideMimeType("application/j-son;charset=UTF-8");
    //         }
    //       },
    //       success: function(result) {
    //      //Write your code here

    //      console.log("Success: "+result);
    //     }
    // });      
};


function showProductPage(data) {
    console.log("Showinf Product Page");
    // body...
    try{
           
            console.log("Pid is "+ data['pid']);
           
    }
    catch(e){
        console.log("error Happed "+e);
    }
};


AdminManager.prototype.matched_PID_Array = [];


AdminManager.prototype.comboEntity = {
    comboId : '',
    comboName:'',

    comboDescription:'',
    // products : {
    //     "p1":{
    //         productName:'',
    //         pid:'',
    //         imageURL : ''
    //     },
    //      "p2":{
    //         productName:'',
    //         pid:'',
    //         imageURL : ''
    //     },
    //      "p3":{
    //         productName:'',
    //         pid:'',
    //         imageURL : ''
    //     }
    // },
    ourPrice:'',
    duration:'',
    c_pricing:{
        c_pricing1:{
            unit:'',
            timeUnit:'',
            price:''

        },  c_pricing2:{
            unit:'',
            timeUnit:'',
            price:''

        },
        c_pricing3:{
            unit:'',
            timeUnit:'',
            price:''

        }
    },
    imageURL :'',
    // quantity : '',
    tags:{
      tag1:'fdsaf',
        tag2:'afssd',
    }
};
AdminManager.prototype.productEntitiy = {
    pid:'',
    pName:'',
    productDescription:'',
    authorName:'',
    publisherName:'',
    MRP : '',
    isTopRated:'',
    isBestSeller:'',
    bookSummary:'',
    baseCategory:'',
    subCategory:'',
    genre:'',
     ourPrice:'',
    //todo add quantity
    quantity : '',
    tags:{
      tag1:'fdsaf',
      tag2:'afssd'

    },
    details:{
        ISBN : '',
        ISBN13:'',

    },
    pricing:{
        pricing1:{
            unit:'',
            timeUnit:'',
            price :''

        },  pricing2:{
            unit:'',
            timeUnit:'',
            price:''

        },
        pricing3:{
            unit:'',
            timeUnit:'',
            price:''

        }
    }
};
AdminManager.prototype.showImageUploadedToast = function () {
    var data = {
        message: 'Image Uploaded',
        timeout: 2000
    };
    this.snackBar.MaterialSnackbar.showSnackbar(data);
};

AdminManager.prototype.showEmptyText =function(text){
    var data = {
        message: text,
        timeout: 2000
    };
    this.snackBar.MaterialSnackbar.showSnackbar(data);
    return;
};

AdminManager.prototype.saveImage = function (event) {
    event.preventDefault();


    var file = event.target.files[0];
    this.imageForm.reset();
    if (!file.type.match('image.*')){
        var data  = {
            message: 'Upload Only Images',
            timeout: 2000
        };
        this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
        return;

    }
    var filePath = 'productImages/books/'+file.name;
    pop(filePath);

    this.booksRef = this.stroageRef.child(filePath);
    this.booksRef.put(file)
        .then(function (snapshot) {



            this.productEntitiy.imageURL = snapshot.downloadURL;
            pop('file Inserted');
            this.showImageUploadedToast();
            this.isImageUploded = true;


            // console.log(snapshot.downloadURL);
            // pop(snapshot.fullpath.toString());
            // pop(snapshot.key);
            // var full_path = snapshot.metadata.fullpath;
            // pop(full_path);
        }.bind(this));
};

AdminManager.prototype.checkSetup = function () {
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

AdminManager.prototype.isSignedIn = function () {


    // pop('checking Login'); todo:add 0Login Here
    // firebase.auth().onAuthStateChanged(function(user) {

    //     if (user) {
    //         // User is signed in.

    //             pop('user Signed In- Main Page');




    //     } else {
    //         // User is signed out.
    //         pop('user Signed Out');
    //         window.location.href = './Login.html';


    //     }

    // });

};



window.pids = [];


/*The Produccts Which Mathces the Search Come HEre*/
AdminManager.prototype.showProduct =  function (imageUrl,productName,pid,MRP,desc) {
                pop('showing  product');

              var div = document.getElementById(pid);
               // If that Pid does not Exists a.ka. Created , then Show it
               if (!div) {
                 var container = document.createElement('div');
                 container.innerHTML = AdminManager.SEARCH_ITEM;
                   div = container.firstChild;
                 div.setAttribute('id', pid);
                   pop('Product Name ' + productName);

                   //set Name
                   div.querySelector('.s_item_span_pName').textContent = productName;
                   //set Image
                   div.querySelector('.s_item_p_image').src = imageUrl;
                    div.querySelector('.s_item_p_image').style.width = '100px';
                 this.lists.appendChild(container);
               }

};




/*
*this function is used from different Pages
*and results are dispatched accordingly.
1. 0 - function callfrom Search page
2.  1 - function call from Edit Books Page
*/


AdminManager.prototype.getDetails = function(pid,fromWhere) {

    if (fromWhere == 0) {
        // For Search page
    pop('Inside Get Details for Pid of '+pid);
    var bookReff = firebase.database().ref().child('books');
    bookReff.orderByChild("pid").equalTo(pid)
        .on('child_added',function (e) {
            //These are the Messages , show it to Them
            this.showProduct(e.val().imageURL,e.val().pName,e.val().pid,e.val().MRP,e.val().productDescription);
        }.bind(this));
  }
  else if (fromWhere == 1) {
    var bookReff = firebase.database().ref().child('products/books/');
    bookReff.orderByChild("pid").equalTo(pid)
        .on('child_added',function (snap) {
            //These are the Messages , show it to Them
            this.fillEditBoxes(snap);
        }.bind(this));
  }

};
AdminManager.prototype.searchProduct = function (data) {


    var mSearchQueryText = this.editbox.value;

    pop(mSearchQueryText);

    //Do Elastic Search Here
    //Get the Resuls back
    //Display Custom List

    var bookRefs = this.database.ref('books');


    //Strings(pName) are matched, if Hit
    // Push it window.pid(Array)
    bookRefs.on("child_added", function (snapshot, prevChildKey) {

        //Get Te Single Child
        var singleBook = snapshot.val();
        //If matching occurs, get The Job Done


        try {

            if (singleBook.pName.includes(mSearchQueryText)) {



                // Names Match
                // Push to Pid Array
                this.getDetails(singleBook.pid,0);
            }
          else{
            //DO no thing
          }

        } catch (e) {
          console.log("Error "+e);

        } finally {
          //Do nothing;
        }



    }.bind(this));

};

// The search Item view
 AdminManager.SEARCH_ITEM =  '<div class="mdl-card mdl-shadow--8dp " style="width: 80%">'+

                                                //The Product Title
                                                '<div class = "mdl-card__title ">' +
                                                    '<span class ="s_item_span_pName">Product Name</span>' +
                                                '</div>'+
                                                '<div class="mdl-card__supporting-text">'  +
                                                      //The Product Id
                                                       '<span class="s_item_span_pid"> Pid</span>'+
                                                           //Product Image
                                                        '<img class="s_item_p_image">'+
                                                '</div>'+
                                             '</div>';





function validateText(text) {
    pop(text);

    if (text =='' ){

        return false;
    }
    else {
        return true;
    }
};


function validateNumber(munit1) {
    if (munit1 == ''){
        return false;
    }
    else{
        return true;
    }
};
AdminManager.prototype.validateFields  = function (){
    pop('validating Fields');


    //Pid
    var pid = this.pid.value;
    //validating Product Name
    this.productEntitiy.pid = pid;
    var pname = this.productName.value;
        if (!validateText(pname)) {
            this.showEmptyText('Enter Product Name');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pName = pname;
        }
    //product Desc
    var pDesc = this.pdesc.value;
        if (!validateText(pDesc)) {
            this.showEmptyText('Enter Product Description');
            showInsertButton();
            return
        }
        else{
            this.productEntitiy.productDescription = pDesc;
        }
    //Author Name
    var aName = this.authorName.value;
        if (!validateText(aName)) {
            this.showEmptyText('Enter Author Name');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.authorName  = aName;
        }
    //Book Summary
    var bSumm  = this.bSumm.value;
        if (!validateText(bSumm)){
            this.showEmptyText('Enter Book Summary');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.bookSummary = bSumm;
        }


    //Publisher Name
    var pubName = this.publiserName.value;
        if (!validateText(pubName)){
            this.showEmptyText('Enter Publisher Name');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.publisherName  = pubName;
        }
    //base Cateogry
    var category = this.baseCategory.options[this.baseCategory.selectedIndex].value;
            if (category == 0){
                this.showEmptyText('Select a Category');
                showInsertButton();
                return;
            }
            else{
                this.productEntitiy.baseCategory = category;
            }

    // Subcategory
    var subCategory = this.subCateogry.options[this.subCateogry.selectedIndex].value;
       if (subCategory == 0){
           this.showEmptyText('Select a SubCategory');
           showInsertButton();
           return;
       }
       else{
          this.productEntitiy.subCategory = subCategory;
       }

    //ISBN 10
    var ISBN = this.ISBN.value;
        if (!validateText(ISBN)) {
            this.showEmptyText('Enter ISBN');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.details.ISBN = ISBN;
        }

    var ISBN13 = this.ISBN13.value;
        if (!validateText(ISBN13)) {
            this.showEmptyText('Enter ISBN13');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.details.ISBN13 = ISBN13;
        }

    var MRP = this.MRP.value;
    if (!validateText(MRP)) {
        this.showEmptyText('Enter MRP');
        showInsertButton();
        return;
    }
    else{
        this.productEntitiy.MRP = MRP;
    }


    var ourPrice  = this.ourPrice.value;
    if (!validateText(ourPrice)) {
        this.showEmptyText('Enter Bought Price');
        showInsertButton();
        return;
    }
    else{
        this.productEntitiy.details.ourPrice = ourPrice;
    }

    if(this.isImageUploded == false){
        this.showEmptyText('Upload image');
        showInsertButton();

    }

    var ibs = this.isBestSeller.options[this.isBestSeller.selectedIndex].value;
        if (ibs == 0){

                this.showEmptyText('Choose Whether Best Seller or Not');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.isBestSeller = ibs;
        }

    var itr = this.isTopRated.options[this.isTopRated.selectedIndex].value;
        if (itr == 0){
            this.showEmptyText('Select IS Top Rated');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.isTopRated  = itr;
        }


    var munit1 = this.unit1.value;
            if (!validateNumber(munit1))  {
                this.showEmptyText('Enter Unit 1');
                showInsertButton();
                return;
            }
            else{
                this.productEntitiy.pricing.pricing1.unit = munit1;
            }
    var munit2 = this.unit2.value;
        if (!validateNumber(munit2)){
            this.showEmptyText('Enter Unit 1');
            showInsertButton();
            return;
        }

        else{
            this.productEntitiy.pricing.pricing2.unit = munit2;
        }

    var munit3 = this.unit3.value;
    if (!validateNumber(munit3)) {
        this.showEmptyText('Enter Unit 1');
        showInsertButton();
        return;
    }

    else{
        this.productEntitiy.pricing.pricing3.unit = munit3;
    }


    var mTU1  =this.tm1.options[this.tm1.selectedIndex].value;
        if (mTU1 == 0){
            this.showEmptyText('Select 1st Time unit');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pricing.pricing1.timeUnit = mTU1;
        }
    var mTU2  =this.tm2.options[this.tm2.selectedIndex].value;
        if (mTU2 == 0){
            this.showEmptyText('Select 2nd Time unit');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pricing.pricing2.timeUnit = mTU2;
        }
    var mTU3  =this.tm3.options[this.tm3.selectedIndex].value;
         if (mTU3 == 0){
                this.showEmptyText('Select 3rd Time unit');
             showInsertButton();
             return;
         }
         else{
             this.productEntitiy.pricing.pricing3.timeUnit = mTU3;
         }
    var price1 = this.price1.value;
        if (!validateNumber(price1)){
            this.showEmptyText('Enter PRice 1');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pricing.pricing1.price = price1;
        }

    var price2 = this.price2.value;
        if (!validateNumber(price2)){
            this.showEmptyText('Enter PRice 2');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pricing.pricing2.price = price2;
        }
    var price3 = this.price3.value;
        if (!validateNumber(price3)){
            this.showEmptyText('Enter PRice 2');
            showInsertButton();
            return;
        }
        else{
            this.productEntitiy.pricing.pricing3.price = price3;
        }



        if (this.isImageUploded == false){
            this.showEmptyText('Upload a Image and Insert');
            showInsertButton();
            return;
        }

        //Product Entity Has Been Constructed Push to Database
        // this.showbox.style.visibility = 'visible';

        // var empsRef = ref.child("employees");

        //         empsRef.child('11111').set({
        //         lastname: "Lee",
        //         firstname: "Kang"
        //         });

        //      empsRef.child('22222').set({
        //              lastname: "Nut",
        //              firstname: "Dough"
        //         });

            var booksRef = this.database.ref().child("books");
            booksRef.child(this.productEntitiy.pid).set(this.productEntitiy).then(this.resetEverything(),pop('error'));

        // this.database.ref().child("/products/books/")
        //     .push(this.productEntitiy)
        //     .then(function (snapshot) {

        //         // this.insetProductutton.removeAttribute('hidden');
        //         this.resetEverything();
        //         pop('Inserted Successfully ');
        //         pop(snapshot.data);
        //         // this.showbox.style.visibility = 'hidden'
        //     }.bind(this))
        //     .catch(function (event) {
        //         pop('Error in Inserting');
        //         pop(event);
        //     })
        // ;

};

AdminManager.prototype.clearFields = function () {


    pop('clearing Fields');
    this.pid.value = '';
    this.productName.value= '';
    this.publiserName.value = '';
    this.ISBN.value = '';
    this.ISBN13.value = '';
    this.authorName.value = '';
    this.MRP.value = '';
    this.ourPrice.value = '';
    this.pdesc.value = '';
    this.unit1.value = '';
    this.unit2.value = '';
    this.unit3.value = '';

    this.price1.value = '';
    this.price2.value = '';
    this.price3.value = '';

    this.searchTags.value = '';
};
AdminManager.prototype.resetEverything = function () {
    this.clearFields();
    this.setPid(this.database);
};
function dateSelected(date,ui) {
   pop(date);
};
function resetSubCategoriesOptions() {
    pop('clearing options');
    $('#sub_category').empty();

    // var mSubCategory = document.getElementById('sub_category');
    // for (var i = 0; i < mSubCategory.length; i++){
    //
    //    mSubCategory.remove(i);
    // }
};
function populateCompetitiveCateogires() {

    // pop('here');
    resetSubCategoriesOptions();
    var c_categories = ["Sub Category","GRE","GMAT","IELTS","APTI","TOEFL","MATHS INTRO","KPSC","TNPSC","BANKING","SSB","AFCAT","CENTRAL GOVERNTMENT"];




    var  options;
    var mSubCategory = document.getElementById('sub_category');
    for (var i =0;i < c_categories.length;i++){
        options = document.createElement("option");
        options.value = c_categories[i];
        options.text = c_categories[i];


        mSubCategory.appendChild(options);

    }
};
var populateGeneralCategories = function () {
    resetSubCategoriesOptions();
    var categories = ["Sub Category","Science Ficton","Drama","Action and Adventure","Romance","Mystery","Horror","Self help","Health",
        "Guide","Travel","Children's","Religion, Spirituality & New Age","Science","History","Math"
        ,"Poetry","Encylopedia's","Dictionaries","Comics","Art","CookBooks","Diaries","Journals","Prayer Books","Series","Triology"
        ,"Biographies","Autobiographies","Fantasy","Adult"

    ];

    var mSubCategory = document.getElementById('sub_category');

    var  options;
    for (var i =0;i < categories.length;i++){
        options = document.createElement("option");
        options.value = categories[i];
        options.text = categories[i];

           mSubCategory.appendChild(options);

    }
};
var populateStartupBooks = function () {

};
var populateCollegeBooks = function () {

};



//Combo Related Mehtods

AdminManager.prototype.saveComboImage = function (event) {
    event.preventDefault();
    pop('combo Uploading');

    var file = event.target.files[0];
    this.cImageForm.reset();
    if (!file.type.match('image.*')){
        var data  = {
            message: 'Upload Only Images',
            timeout: 2000
        };
        this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
        return;

    }
    var filePath = 'productImages/combos/books/'+file.name;
    this.comboPathRef = this.stroageRef.child(filePath);
    this.comboPathRef.put(file)
        .then(function (snapshot) {

            this.comboEntity.imageURL = snapshot.downloadURL;
            this.showImageUploadedToast();
            // console.log(snapshot.downloadURL);
            // pop(snapshot.fullpath.toString());
            // pop(snapshot.key);
            // var full_path = snapshot.metadata.fullpath;
            // pop(full_path);
        }.bind(this));
};



/*Insert Combo */


AdminManager.prototype.insertComboProduct = function(event){
    this.validateComboFields();

};

AdminManager.prototype.COMBO_PRODUCT_ITEM_1 = {
    pid:'',
    productName:'',
    MRP:''
};

AdminManager.prototype.COMBO_PRODUCT_ITEM_2 = {
    pid:'',
    productName:'',
    MRP:''
};

AdminManager.prototype.COMBO_PRODUCT_ITEM_3 = {
    pid:'',
    productName:'',
   MRP:''
};

AdminManager.prototype.validateComboFields = function(event){


    var cName = this.comboName.value;
    if (!validateText(cName)) {
        this.showEmptyText('Enter combo name');
        return;
    }
    else{

        pop('combo Name Not Epty '+cName);
        this.comboEntity.comboName = cName;
    }



    var cDesc = this.comboDesc.value;
    if (!validateText(cDesc)) {
            this.showEmptyText('Enter Combo Description');
            return;
    }
    else{
        this.comboEntity.comboDescription = cDesc;
    }


    var product1 = AdminManager.COMBO_PRODUCT_ITEM_1;
    var product2 = AdminManager.COMBO_PRODUCT_ITEM_2;
    var product3 = AdminManager.COMBO_PRODUCT_ITEM_3;

    //ipdate pricing variables
    //1st Price
       var comboUnit1Value = this.cunit1.value;

       if (!validateText(comboUnit1Value)) {
            this.showEmptyText('Enter Unit 1');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing1.unit = comboUnit1Value;
       }
       var comboTimeUnit1Value  = this.cTimeUnit1.options[this.cTimeUnit1.selectedIndex].value;
        if (comboUnit1Value == 0 ) {
            this.showEmptyText('Enter TimeUnit for combo 1');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing1.timeUnit = comboUnit1Value;
       }
       var comboPricingOne = this.cpricing1.value;
       if (!validateNumber(comboPricingOne)) {
        this.showEmptyText('Enter Pricing for Product 1');
       }
       else{
        this.comboEntity.c_pricing.c_pricing1.price = comboPricingOne;
       }
    //2nd Price
       var comboUnit2Value = this.cunit2.value;
        if (!validateNumber(comboUnit2Value)) {
            this.showEmptyText('Enter Unit 2');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing2.unit = comboUnit2Value;
       }


       var comboTimeUnit2Value  = this.cTimeUnit2.options[this.cTimeUnit2.selectedIndex].value;
         if (comboUnit2Value == 0 ) {
            this.showEmptyText('Enter TimeUnit for combo 1');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing2.timeUnit = comboUnit2Value;
       }


       var comboPricingtwo = this.cpricing2.value;
       if (!validateNumber(comboPricingtwo)) {
        this.showEmptyText('Enter Pricing for Product 1');
       }
       else{
        this.comboEntity.c_pricing.c_pricing2.price = comboPricingtwo;
       }

    //3rd Price
       var comboUnit3Value = this.cunit3.value;
         if (!validateNumber(comboUnit3Value)) {
            this.showEmptyText('Enter Unit 3');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing3.unit = comboUnit3Value;
       }


      var comboTimeUnit3Value  = this.cTimeUnit3.options[this.cTimeUnit3.selectedIndex].value;
        if (comboTimeUnit3Value == 0 ) {
            this.showEmptyText('Enter TimeUnit 3 for combo');
            return;
       }
       else{
        this.comboEntity.c_pricing.c_pricing3.timeUnit = comboTimeUnit3Value;
       }


       var comboPricingthree = this.cpricing3.value;
       if (!validateNumber(comboPricingthree)) {
        this.showEmptyText('Enter Pricing for Product 1');
       }
       else{
        this.comboEntity.c_pricing.c_pricing3.price = comboPricingthree;
       }
        pop('pushing Combo : '+this.comboEntity);
        this.database.ref().child("/products/combos/")
            .push(this.comboEntity)
            .then(function (snapshot) {

                // this.insetProductutton.removeAttribute('hidden');
                // this.resetEverything();
                pop('Combo Inserted Successfully ');
                this.resetComboFields();
            }.bind(this))
            .catch(function (event) {
                pop('Error in Inserting');
                pop(event);
            }) ;
};




AdminManager.prototype.resetComboFields = function(event){
    pop('clearing Combo Fields');
    this.comboName.value = '';
    this.comboDesc.value = '';
    this.cunit1.value = '';
    this.cunit2.value = '';
    this.cunit3.value = '';

    this.cpricing1.value = '';
    this.cpricing2.value = '';
    this.cpricing3.value = '';

};



//Edit Implementations todo//change Method Names;

AdminManager.prototype.populateEditBoxes = function(event){
    var pid2find = this.ePid.value;
    if (!validateNumber(pid2find)) {
            //wrong  pid
            this.showEmptyText('Enter Pid to Search');
            return;
    }
    else{
        //Pid Correct Format , Get the Books Reference

            this.getDetails(singleBook.pid);
    }
};


AdminManager.prototype.fillEditBoxes = function(snap){
    pop('Filling EditBoxes');
    this.ePname.value = snap.productName;
    this.ePdesc.value = snap.productDescription;
    this.eUnit3.value = snap.pricing.pricing3.unit;
    this.eUnit1.value = snap.pricing.pricing1.unit;
    this.eAuthorName.value = snap.authorName;
    this.ePublisherName.value = snap.publisherName;
    this.eMRP.value = snap.MRP;
    this.eOurPrice.value = snap.ourPrice;
    this.ePricing1.value = snap.pricing.pricing1.price;
    this.ePricing2.value = snap.pricing.pricing2.price;
    this.ePricing3.value = snap.pricing.pricing3.price;
    };


function baseCategorySelected(data){
    var vale = data.value;
    pop(data.value);
    switch (vale){
        case '0':
            popAlert('Enter a Proper Category');
            return;
        case '1':
            console.log('here');
            populateCompetitiveCateogires();
            break;
        case '2':
            populateGeneralCategories();
            break;
        case '3':
            populateStartupBooks();
            break;
        case '4':
            populateCollegeBooks();
            break;
        default:
            break;
    }
};

function fileUploaded(event){
        pop('in Function');
};

function popAlert(data) {
    alert(data);
};



window.onload = function (event){
    console.log('Initializing Admin manager');
    window.admin = new AdminManager();
};
