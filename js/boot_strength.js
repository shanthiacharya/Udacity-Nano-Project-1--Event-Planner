/*!
 * boot_strength.js
 * Author: Richard van Katwijk
 * Based on the work by author: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

  var pluginName = "boot_strength",
      defaults = {
            strength_minlength: 8,
            strength_required_upper: 1,
            strength_required_lower: 1,
            strength_required_digits: 1,
            strength_required_special: 1,
      };

  function Plugin( element, options ) {
   this.element = element;
   this.options = $.extend( {}, defaults, options );
   this._defaults = defaults;
   this._name = pluginName;
   this.init();
   this.required_score = this.options.strength_required_upper+this.options.strength_required_lower+this.options.strength_required_digits+this.options.strength_required_special+1; // the extra 1 is for password length
//console.log("Required score: "+this.required_score);
  } // end function Plugin

  Plugin.prototype = {
   init: function() {
          var self = this;
          self.$elem = $(self.element);
          var this_elem_id = self.$elem.attr('id');
//console.log("Required score: "+required_score);

          // Add the strength meter div after the password input field. This contains the main <div> for the actual strength bar and an embedded <p> which contains the strength level string.
          // Using CSS these are 'moved' so that the bar overalps the password field, and the strength text is positioned under and to the right of the password field.
          self.$elem.after('<div class="strength_meter"><div data-meter="'+this_elem_id+'"><p></p></div></div><div class="idiv" data-meter-fa="'+this_elem_id+'"><i class="fa fa-info-circle"></i></div>');

          // When a key is pressed in the password field, re-check the strength
          //self.$elem.bind('keyup keydown', function(event) {
          self.$elem.bind('keyup', function(event) {
           console.log ("Keyup Event");
           thisval = $('#'+this_elem_id).val();
           self.check_strength(thisval,this_elem_id);
          }); // end bind

            self.$elem.bind('blur', function(event) {
               //hide popover when password field is blurred
               console.log ("Blur Event");
              $('#inputPassword').attr('data-content', '');
              $('#inputPassword').popover('hide');
            });

            self.$elem.bind('focus', function(event) {
               //hide popover when password field is in focus until user starts typing
                 $('#inputPassword').attr('data-content', '');
               $('#inputPassword').popover('hide');
            });
            self.$elem.bind('click', function(event) {

            $('#inputPassword').attr('data-content', '');
            $('#inputPassword').popover('hide');
            });


          //$("i.fa[data-meter-fa='"+this_elem_id+"']").on('click',function(){
          $("div.idiv[data-meter-fa='"+this_elem_id+"']").on('click',function(){
           var myalert = 'Password requirements:\nUppercase characters: '+self.options.strength_required_upper;
           myalert+="\nLowercase characters: "+self.options.strength_required_lower;
           myalert+="\nSpecial characters: "+self.options.strength_required_special;
           myalert+="\nDigits: "+self.options.strength_required_digits;
           myalert+="\nMinimum Length: "+self.options.strength_minlength;
           alert(myalert);
          }); // end bind

         }, // end init function
         check_strength: function (thisval,thisid) {
//console.log("Checking elem:'"+thisid+"' with val: "+thisval+", required="+this.required_score );

          var num_upper = 0;
          var num_lower = 0;
          var num_digits = 0;
          var num_special = 0;
          var sufficient_length = 0;
          var usrmessage ="";

          var upper_score = 0;
          var lower_score = 0;
          var digit_score = 0;
          var special_score = 0;

          var upper_matches = thisval.match(/[A-Z]/g);
          var lower_matches = thisval.match(/[a-z]/g);
          var digit_matches = thisval.match(/[0-9]/g);
          var special_matches = thisval.match(/([!,%,&,@,#,$,^,*,?,_,~])/g);
          if (upper_matches) { num_upper = upper_matches.length; }
          if (lower_matches) { num_lower = lower_matches.length; }
          if (digit_matches) { num_digits = digit_matches.length; }
          if (special_matches) { num_special = special_matches.length; }
          if (thisval.length >= this.options.strength_minlength) {sufficient_length=1;}

          if (num_upper>=this.options.strength_required_upper) {upper_score=this.options.strength_required_upper;} else {upper_score=num_upper;}
          if (num_lower>=this.options.strength_required_lower) {lower_score=this.options.strength_required_lower;} else {lower_score=num_lower;}
          if (num_digits>=this.options.strength_required_digits) {digit_score=this.options.strength_required_digits;} else {digit_score=num_digits;}
          if (num_special>=this.options.strength_required_special) {special_score=this.options.strength_required_special;} else {special_score=num_special;}
          console.log("NumUpper: "+num_upper+", UpperScore: "+upper_score);
          console.log("NumLower: "+num_lower+", LowerScore: "+lower_score);
          console.log("NumDigits: "+num_digits+", DigitScore: "+digit_score);
          console.log("NumSpecial: "+num_special+", SpecialScore: "+special_score);
          console.log("Length: "+thisval.length+", SuffLength: "+sufficient_length);

          var score = upper_score+lower_score+digit_score+special_score+sufficient_length;
          var rating = score/this.required_score;
          rating = rating.toFixed(2);

          if (upper_score !=1) usrmessage += "Missing upper case character" + "<br>" ;
          if (special_score !=1) usrmessage +=  "Missing special character" + "<br>";
          if (lower_score !=1) usrmessage += "Missing lower case character"+ "<br>";
          if (digit_score !=1) usrmessage +=  "Missing digits"+ "<br>" ;
          if (sufficient_length !=1) usrmessage += "Password needs to be 16 characters long" + "<br>";

          console.log(usrmessage);
//console.log("Required: "+this.required_score+" Score: "+score+" Rating: "+rating);
          this.redraw_strength_meter(rating,thisid,usrmessage);
         }, // end function check_strength
         redraw_strength_meter: function (rating,thisid,usrmessage){
//console.log("Redrawing for "+thisid);
          var thismeter = $('div[data-meter="'+thisid+'"]');
          console.log(rating);
          if (rating == 0){
           thismeter.removeClass().html('');
          this.hide_passwordrules_popover();

          }
          else if (rating <= 0.33) {
           thismeter.removeClass();
           thismeter.addClass('veryweak').html('<p>Strength: very weak </p>' );
           this.show_passwordrules_popover(usrmessage);
          }
          else if (rating <= 0.66){
           thismeter.removeClass();
           thismeter.addClass('weak').html('<p>Strength: weak</p>');
           this.show_passwordrules_popover(usrmessage);
          }
          else if(rating < 1){
           thismeter.removeClass();
           thismeter.addClass('medium').html('<p>Strength: medium</p>');
           this.show_passwordrules_popover(usrmessage);

          }
          else {
           thismeter.removeClass();
           this.hide_passwordrules_popover();
           thismeter.addClass('strong').html('<p>Strength: strong</p>')
          }


        }, // end function redraw_strength_meter

         show_passwordrules_popover : function (usrmessage) {
          $('#inputPassword').attr('data-placement', 'top');
          $('#inputPassword').attr('data-html', 'true');
          $('#inputPassword').attr('data-content', usrmessage);
          $('#inputPassword').popover('show');

        },

        hide_passwordrules_popover : function () {
          $('#inputPassword').attr('data-content', '');
          $('#inputPassword').popover('hide');

        }

  }; // end Plugin.prototype

  // A lightweight plugin wrapper around the constructor, preventing against multiple instantiations on the SAME element!
  $.fn[pluginName] = function ( options ) {
   return this.each(function () {
    if (!$.data(this, "plugin_" + pluginName)) {
     $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
    } // end if
   }); // end return this.each
  }; // end $.fn[pluginName]

})( jQuery, window, document );
