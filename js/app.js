var firstPasswordInput = document.querySelector('#inputPassword');
var submitsignin = document.querySelector('#signin');
var submitevent = document.querySelector('#submitevent');
var myFirebaseRef = new Firebase('https://eventplannerudacity.firebaseio.com/');



initInputs();
initSigninForm();
initEventForm();

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

function displayPasswordRules(){


}




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

/* If submit exists , then validate */

//if (submitsignin) {


  //      submitsignin.onclick = function () {
          /*
          Don't forget to grab the input's .value!
           */
        //  var firstPassword = firstPasswordInput.value;


          /*
          Make an issue tracker for each input because some validation messages should
          end up on the first one, some on the second.
           */
        //  var firstInputIssuesTracker = new IssueTracker();


          /*
          This steps through all of the requirements and adds messages when a requirement fails.
          Just checks the first password because the second should be the same when it runs.
           */
          // function checkRequirements() {
          //   if (firstPassword.length < 16) {
          //     firstInputIssuesTracker.add("fewer than 16 characters");
          //   } else if (firstPassword.length > 100) {
          //     firstInputIssuesTracker.add("greater than 100 characters");
          //   }
          //
          //   if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
          //     firstInputIssuesTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
          //   }
          //
          //   if (!firstPassword.match(/\d/g)) {
          //     firstInputIssuesTracker.add("missing a number");
          //   }
          //
          //   if (!firstPassword.match(/[a-z]/g)) {
          //     firstInputIssuesTracker.add("missing a lowercase letter");
          //   }
          //
          //   if (!firstPassword.match(/[A-Z]/g)) {
          //     firstInputIssuesTracker.add("missing an uppercase letter");
          //   }
          //
          //   var illegalCharacterGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
          //   if (illegalCharacterGroup) {
          //     illegalCharacterGroup.forEach(function (illegalChar) {
          //       firstInputIssuesTracker.add("includes illegal character: " + illegalChar);
          //     });
          //   }
          // };

          /*
          Here's the first validation check. Gotta make sure they match.
           */
           /*
           They match, so make sure the rest of the requirements have been met.
            */
          // if ( firstPassword.length > 0) {
          //
          //   checkRequirements();
          //   }


          /*
          Get the validation message strings after all the requirements have been checked.
           */
          // var firstInputIssues = firstInputIssuesTracker.retrieve()


          /*
          Let input.setCustomValidity() do its magic :)
           */
          // firstPasswordInput.setCustomValidity(firstInputIssues);


      //  }

//}



// if (submitevent) {
//
//       submitevent.onclick = function () {
//
//         // After the form is validated collect data and push to firebase
//         if ( eventForm.checkValidity() ) {
//
//                    console.log("Checking Validity");
//
//                   var title = $("#eventname #InputEventname").val();
//
//                    var hostname = $("#Hostname #InputHostname").val();
//
//
//                    var address = $("#Address #InputEventaddress").val();
//
//                   // var city = $("#citystatezip #InputEventcity").val();
//                    //var state = $("#citystatezip #InputEventstate").val();
//                    //var zip = $("#citystatezip #InputEventzip").val();
//
//
//                    var capacity = $("#capacity #InputEventCapacity").val();
//
//                    var startdate = $("#starttimedate #InputEventstartdate").toLocaleString();
//
//                   // var starttime = $("#starttimedate #InputEventstarttime").val();
//
//                    var enddate = $("#endtimedate #InputEventenddate").val();
//
//                    //var endtime = $("#endtimedate #InputEventendtime").val();
//
//                    var inputguestlist = $("#inputguestlist").val();
//
//                    var description = $("#description #InputEventDescription").val();
//
//                    //Add values to Firebase
//                    myFirebaseRef.push({
//                    title: title,
//                    hostname:hostname,
//
//                    location: {
//                    address:address
//                   //  city: city,
//                   //  state: state,
//                   //  zip: zip
//                    },
//                    capacity: capacity,
//                    startdate: startdate,
//                   // starttime: starttime,
//                    enddate: enddate,
//                    //endtime: endtime,
//
//                    Description: description
//                    });
//
//
//
//               }
//
//
//
//       } // END onclick
//
//
// }// END submitevent



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
