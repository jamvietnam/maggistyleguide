/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        //$.material.init();

        $(document).ready(function(){

          	var $container = $('.masonry-container');

              doc_width = $(document).width();

              if (doc_width >= 768){
                  $container.masonry({
                      itemSelector        : '.card-box',
                      columnWidth         : '.card-box',
                      transitionDuration  : 0
                  });
              } else {
                  $('.mas-container').removeClass('mas-container').addClass('row');
              }
      	});
				if ($(".float-label-control").length) {
					$('.float-label-control').floatLabels();
				}
				if ($('.icp-auto').length) {
					$('.icp-auto').iconpicker();
				}
				if ($(':checkbox').length) {
					$(':checkbox').checkbox();
				}

				if ($(':radio').length) {
					$(':radio').radio();
				}

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);


})(jQuery); // Fully reference jQuery after this point.

/**
 * Created with JetBrains WebStorm.
 * User: polzer
 * Date: 11.10.12
 * Time: 11:17
 *
 * Description:
 * A simple jQuery plugin to draw single grid lines.
 * Usually applied to the bootstrap "container":
 * jQuery(".container").drawBootstrapGrid();
 *
 * Default settings:
 *  {
 *    'columns':12,                     //define how much columns to draw
 *     'singleColumnName': 'span1',     //the css class name which you want to add for one column
 *    'color':'lightgrey',              //each columns background color
 *    'opacity':0.3,                    //opacity of the rendered grid
 *    'buttonLabel': 'Show/Hide Grid',  //the label for the button
 *    'startHidden':true,               //if we want the grid to be shown initially
 *     'includeMargin': false,          //if we include the original columns left margin
 *    'hiddenClassName': 'hidden',      //the css class name used in your bootstrap to hide elements -> visibility: hidden
 *    'keybinding': 'l'                 //hide/show grid on pressing this key
 *   }
 *
 * Fork me at github: https://github.com/plozi/jQDrawBootstrapGrid
 */

(function ($) {

    $.fn.drawBootstrapGrid = function (options) {

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            'columns':12,
            'singleColumnName': 'col-md-1',
            'color':'lightgrey',
            'opacity':0.4,
            'buttonLabel': 'Show/Hide Grid',
            'startHidden': true,
            'includeMargin': false,
            'hiddenClassName': 'invisible',
            'keybinding': 'l'
        }, options);

        return this.each(function () {
            var $this = jQuery(this),
                i = 0,
                height = $this.innerHeight() + 'px',
                width = $this.innerWidth() + 'px',

                leftmargin =  jQuery('[class*=\'span\']').css('marginLeft'),
                $gridEl = jQuery('<div></div>').addClass('gridoverlay')
                    .css("position", "absolute")
                    .css("top", "0")
                    .css("z-index", "-20")
                    .css("width", width);

            if(settings.includeMargin){
                $gridEl.css("margin-left", leftmargin);
            }
            $showHideButton = jQuery('<button></button>')
                .addClass("btn btn-primary btn-sm")
                .css('position','fixed')
                .css('bottom', '0em')
                .css('right', '0em')
                .css('margin','10px')
                .css('z-index', '2000')
                .text(settings.buttonLabel)
                .click(function(){
									$(this).toggleClass('btn-fill');
                    jQuery($gridEl).toggleClass(settings.hiddenClassName);
                });

            $(document).bind('keydown', function(ev) {
                if (settings.keybinding.toUpperCase() === String.fromCharCode(ev.which)) {
                    jQuery($gridEl).toggleClass(settings.hiddenClassName);
                }
            });

            if(settings.startHidden){
                $gridEl.addClass(settings.hiddenClassName);
            }
            $this.append($gridEl);
            $this.append($showHideButton);

            while (i < settings.columns) {
                $gridEl.append(
                    jQuery('<div></div>')
                        .addClass(settings.singleColumnName)
                        .css('height', height)
                );
                i++;
            }
        });

    };

})(jQuery);

//Animated Header
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();

/*
 * Bootstrap 3.0 IconPicker - jQuery plugin for Icon selection
 *
 * Copyright (c) 20013 A. K. M. Rezaul Karim<titosust@gmail.com>
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/titosust/Bootstrap-icon-picker
 *
 * Version:  1.0.0
 *
 */

// add this function to initialize
