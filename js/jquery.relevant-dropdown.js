!function(e){e.expr[":"].RD_contains=e.expr.createPseudo(function(t){return function(i){return e(i).text().toUpperCase().indexOf(t.toUpperCase())>=0}}),e.fn.relevantDropdown=function(t){return t=e.extend({fadeOutSpeed:"normal",change:null},t),this.each(function(){function i(e){"function"==typeof t.change&&t.change.call(this,e)}var o,n=e(this),l=n.attr("list"),s=e("#"+l),a=s.find("option"),c=0,d=document.createDocumentFragment(),r=null;e("ul#"+l).is(s)||(e("<ul />",{"class":"datalist",id:l}).appendTo("body"),s.remove(),s=e("#"+l),a.each(function(){r=e("<li />",{text:e(this).val()})[0],d.appendChild(r)}),s.append(d)),a=s.find("li"),n.on("focus",function(){s.scrollTop(0),c=0}).on("blur",function(){setTimeout(function(){s.fadeOut(t.fadeOutSpeed),a.removeClass("active")},500)}).on("keyup focus",function(t){o=n.position(),s.show().css({top:o.top+e(this).outerHeight(),left:o.left,width:n.outerWidth()}),a.hide(),s.find("li:RD_contains('"+n.val()+"')").show()}),a.on("mouseenter",function(){e(this).addClass("active").siblings().removeClass("active")}).on("mouseleave",function(){e(this).removeClass("active")}),e(window).resize(function(){o=n.position(),s.css({top:o.top+e(this).outerHeight(),left:o.left,width:n.outerWidth()})}),n.on("keydown",function(e){var o=s.find("li.active"),l=s.outerHeight(),d=a.outerHeight();if(38==e.keyCode&&o.length&&(prevAll=o.prevAll("li:visible"),prevAll.length>0&&(o.removeClass("active"),prevAll.eq(0).addClass("active")),prevAll.length&&prevAll.position().top<0&&c>0&&s.scrollTop(c-=d)),40==e.keyCode)if(o.length){var r=o.nextAll("li:visible");r.length>0&&(o.removeClass("active"),r.eq(0).addClass("active")),r.length&&r.position().top+d>=l&&s.stop().animate({scrollTop:c+=d},200)}else a.removeClass("active"),s.find("li:visible:first").addClass("active");13!=e.keyCode&&9!=e.keyCode||(o.length&&(n.val(o.text()),i(o.text())),s.fadeOut(t.fadeOutSpeed),a.removeClass("active")),13!=e.keyCode&&38!=e.keyCode&&40!=e.keyCode&&(a.removeClass("active"),s.find("li:visible:first").addClass("active"),s.scrollTop(0),c=0)}),a.on("click",function(){var o=e("li.active");o.length&&n.val(e(this).text()),s.fadeOut(t.fadeOutSpeed),a.removeClass("active"),i(e(this).text())})})}}(jQuery);