/*
 * Droppy 0.1.2
 * (c) 2008 Jason Frame (jason@onehackoranother.com)
 */
(function($) {
	
	$.fn.droppy = function(options) {

	  options = $.extend({speed: 250, delay: 500, className: 'droppy'}, options || {});

	  this.each(function() {

	    var root = this, zIndex = 1000;

	    $(root).addClass(options.className);

	    function getSubnav(ele) {
	      if (ele.nodeName.toLowerCase() == 'li') {
	        var subnav = $('> ul', ele);
	        return subnav.length ? subnav[0] : null;
	      } else {
	        return ele;
	      }
	    };

	    function getActuator(ele) {
	      if (ele.nodeName.toLowerCase() == 'ul') {
	        return $(ele).parents('li')[0];
	      } else {
	        return ele;
	      }
	    };

	    function hide() {
	      var subnav = getSubnav(this);
	      if (!subnav) return;
	      $.data(subnav, 'cancelHide', false);
	      if (options.delay) {
	        setTimeout(function() {
	          if (!$.data(subnav, 'cancelHide')) {
	            if (options.speed) {
	              $(subnav).slideUp(options.speed);
	            } else {
	              $(subnav).hide();
	            }
	          }
	        }, options.delay);
	      } else {
	        if (options.speed) {
	          $(subnav).slideUp(options.speed);
	        } else {
	          $(subnav).hide();
	        }
	      }
	    };

	    function show() {
	      var subnav = getSubnav(this);
	      if (!subnav) return;
	      $.data(subnav, 'cancelHide', true);
	      $(subnav).css({zIndex: zIndex++})
	      if (options.speed) {
	        $(subnav).slideDown(options.speed);
	      } else {
	        $(subnav).show();
	      }
	      if (this.nodeName.toLowerCase() == 'ul') {
	        var li = getActuator(this);
	        $(li).addClass('hover');
	        $('> a', li).addClass('hover');
	      }
	    };
	    
	    if (typeof $.fn.hoverIntent == 'function') {
	        $('ul, li', this).hoverIntent($.extend({
	            sensitivity: 2, interval: 50, timeout: 100
	        }, options.hoverIntent || {}, {over: show, out: hide}));
	    } else {
	        $('ul, li', this).hover(show, hide);
	    }

	    $('li:has(ul)').addClass('subnav');
        $('ul.b-hornav > li').mouseover(show);
	    $('li', this).hover(
	      function() { $(this).addClass('hover'); $('> a', this).addClass('hover'); $(this).css('z-index', '10000') },
	      function() { $(this).removeClass('hover'); $('> a', this).removeClass('hover'); $(this).css('z-index', '1000') }
	    );

	  });

	};

})(jQuery);
