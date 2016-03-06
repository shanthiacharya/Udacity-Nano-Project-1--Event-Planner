var firstPasswordInput = document.querySelector('#inputPassword');
var submitsignin = document.querySelector('#signin');
var submitevent = document.querySelector('#submitevent');
var myFirebaseRef = new Firebase('https://eventplannerudacity.firebaseio.com/');


//initPasswordStrengthMeter();
initInputs();
initSigninForm();
initEventForm();


if (submitsignin){
$("#inputPassword").boot_strength({
   strength_minlength: 16,
  // strength_required_special:3
});
}


function initInputs() {

        var inputs = document.getElementsByTagName("input");
        var inputs_len = inputs.length;
        var addDirtyClass = function(evt) {
        //  sampleCompleted("Forms-order-dirty");
          evt.srcElement.classList.toggle("dirty", true);
        };
        for (var i = 0; i < inputs_len; i++) {
          var input = inputs[i];
          input.addEventListener("blur", addDirtyClass);
          input.addEventListener("invalid", addDirtyClass);
          input.addEventListener("valid", addDirtyClass);
        }

}



    function initSigninForm() {
      var form = document.getElementById("signupForm")
      if (form) {
      form.addEventListener("submit", function(evt) {
        if (form.checkValidity() === false) {
          evt.preventDefault();
          alert("Form is invalid - submission prevented!");
          return false;
        } else {
          // Form is valid
          return true;
        }
      });
    }
}


function checkDates(event) {
 console.log ("Changed End Date here")
    var startDate = $("#starttimedate #InputEventstartdate").val();
    var endDate =$("#endtimedate #InputEventenddate").val();
    var elemEndDate = document.getElementById("InputEventenddate");

    if ((Date.parse(startDate) >= Date.parse(endDate))) {
      //  End date should be greater than Start date
          elemEndDate.setCustomValidity("End Date must be after Start date");
    }
    else {
        elemEndDate.setCustomValidity("");
    }


}

function initEventForm() {
        var form = document.getElementById("eventForm")
        if (form) {
        form.addEventListener("submit", function(evt) {
            if (form.checkValidity() === false) {
              evt.preventDefault();
              alert("Form is invalid - submission prevented!");
              return false;
            } else {

                var title = $("#eventname #InputEventname").val();
                var hostname = $("#Hostname #InputHostname").val();
                var address = $("#Address #InputEventaddress").val();
                var capacity = $("#capacity #InputEventCapacity").val();
                var startdate = $("#starttimedate #InputEventstartdate").val();
                var enddate = $("#endtimedate #InputEventenddate").val();
                var inputguestlist = $("#inputguestlist").val();
                var description = $("#description #InputEventDescription").val();

                 //Add values to Firebase
                 myFirebaseRef.push({
                 title: title,
                 hostname:hostname,

                 location: {
                 address:address

                 },
                 capacity: capacity,
                 startdate: startdate,

                 enddate: enddate,
                 Description: description
                 });
                 return true;
               }

          });
      }
}




// function analyzePassword ()
// {
//   var strPassword= $("#inputPassword").val();
// 	var charPassword = strPassword.split("");
//   var minPasswordLength = 16;
//   var passwdStrength = $("#passwdStrength")
//
//   if ($("#inputPassword").val()== "")
// 	{
// 		passwdStrength.html("");
// 	}
//   else if (charPassword.length < minPasswordLength)
//    {
//      passwdStrength.html("At least " + minPasswordLength+ " characters !");
//    }
//    else {
//      for (i=0; i<charPassword.length;i++)
//      {
//          if (!charPassword[i].match(/[A-Z]/g))
//          {
//            passwdStrength.html("Missing Upper case");
//          }
//          else if (!charPassword[i].match(/[0-9]/g))
//          {
//             passwdStrength.html("Missing number");
//          }
//
//          else if (!charPassword[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/))
//          {
//            passwdStrength.html("Missing symbol");
//          }
//     }
//    }
//
//
//
//
// }
//
//
//
//
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('InputEventaddress')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}


// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
// [END region_geolocation]


// [START region_fillform]
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];


//        if (componentForm[addressType]) {
//            var val = place.address_components[i][componentForm[addressType]];
//            document.getElementById(addressType).value = val;
//        }
    }

}



/*
I'm using this IssueTracker to help me format my validation messages.
 */
function IssueTracker() {
  this.issues = [];
}
IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ""
        break;
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};




// Retreive data from firebase

function getEventsList (){
  myFirebaseRef.once('value', function(snap) {

  if (snap.val()) {
  var eventList = snap.val();

         $.each( eventList, function( i, val ) {
              //  for( key in val ) {
                  //console.log(key);
                 $("ul#mylist").append("<li class='list-group-item'>" +"<i>" + val['startdate' ] + "</i>" +  "<h3>"+  val['title' ] + "</h3>" + "<p>" + "From: " + val['hostname'] +"</p>"  +"</li>");
              //  } // END for
          }); // END each
      }  // END if snap.val
    else{
      $("ul#mylist").append("<li class='list-group-item'>" + "You have no upcoming Events" + "</li>");
    }
  }); // END once firebase
} // END getEventsList
