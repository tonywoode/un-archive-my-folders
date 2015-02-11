/*********************************************
 * Helper scripts for the display of a 
 * roadblock advertisement.
 *********************************************/
//You need an anonymous function to wrap around your function to avoid conflict
(function($){

	//Attach this new method to jQuery
 	$.fn.extend({ 
 		
 		//This is where you write your plugin's name
 		ShowRoadblockAd: function(options) {

            // set the default values
			var defaults = {
			    windowSize : 700,
			    backgroundColor : "#000",
			    clickClass : "closeWin",
			    countClass : "rc",
			    startCount : 20,
			    opacity : '0.7'			    
			};
			var options = $.extend(defaults, options);
			
			// create iframe divshim and set style elements
			var divShim = $("#DivShim")
			divShim.css({
		        'position': 'fixed',
                'border': '0', 
                'top' : '0px',
                'left' : '0px',
                'z-index': '999997', 
                'display': 'none',
                'height': '100%', 
                'width' : '100%',
                'background-color' : 'transparent'
            }); 							
			
			// create overlay background
			var rbBackground = $("#roadblockbackground");
		    rbBackground.css({ 
		        'display' : 'block',
		        'opacity' : options.opacity, 
		        'background-color' : options.backgroundColor,
		        'position' : 'fixed',
		        'width' : '100%',
		        'height' : '100%',
		        'top' : '0px',
		        'left' : '0px',
		        'z-index' : '999998'
		    });
			
			// show the div shim and background - hide the iframe in IE
			if(!$.browser.msie)
			    divShim.show();
			rbBackground.show();	

			//Iterate over the current set of matched elements
    		return this.each(function() {							
				
				var o = options;				    				    				    
			    var obj = $(this);
			    
			    // get window width and height
			    var wHeight = $(window).height();
			    var wWidth = $(window).width();
			    
			    // get the center position for the window
			    var top = 50; //(wHeight / 2) - (options.windowSize / 2);
			    var left = (wWidth / 2) - (options.windowSize / 2);        
    
			    // set center position
			    obj.css({ 
			        position : 'fixed',
			        left : left + 'px', 
			        top : top + 'px', 
			        width : options.windowSize + 'px',
			        height : options.windowSize + 'px',
			        'z-index' : '999999'
			    }).show();
			    
			    var reveal = function() {
			        // remove all the overlays
			        obj.hide();
			        rbBackground.hide();
			        divShim.hide();
			        return false;
			    }
			    
			    // to be executed when page loads
			    $(document).ready(function() {
			        // enable close click to close the window
			        $('.'+options.clickClass, obj).click(reveal);
			        
			        // set the stat count so we know it has the right value
			        $('.'+options.countClass).css("display", "inline").html(options.startCount);
	                
	                // start the counter
	                setTimeout(function() {
	                    var counter = $('.'+options.countClass);
	                    var clock = counter.html();
	                    clock = clock - 1;
	                    counter.html(clock);
	                    if (clock == 0) {
	                        reveal();
	                        return;
	                    }
	                    setTimeout(arguments.callee, 1000);
	                }, 1000);
			    });
    		});
    	}
	});
	
//pass jQuery to the function, 
//So that we will able to use any valid Javascript variable name 
//to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )		
})(jQuery);