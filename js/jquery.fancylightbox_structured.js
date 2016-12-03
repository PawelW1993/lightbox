(function($, window, document, undefined) {
'use strict';

	var win = $(window),
        doc = $(document),
        body = $("body");

/* -----------------
	CONTAINER LIGHTBOX
----------------- */

    function createContainerLightbox(lightboxOverlay) {

    	var containerLightbox = $("<div></div>", {
			"class": "container-lightbox"
		}).appendTo(lightboxOverlay);

		var progress =  $("<span></span>", {
			"class": "progress-icon"
		}).appendTo(containerLightbox);

		var close = $("<span></span>", {
			"class": "lightbox-close"
		}).appendTo(containerLightbox);

		close.on("click", function(e) {
			e.stopPropagation();
			closeOverlay();
		});

    }

/* -----------------
	IMAGE ARRAY
----------------- */


	function createImageArray(dataLightbox) {

		var images = [];

		$(".fancy-lighbox").each(function() {
			if($(this).attr('data-group-lightbox') === dataLightbox ) {
				images.push(this);
			}
			
		});

		return images;

	}


/* -----------------
	ARROW CONTROL
----------------- */

	function createNextArrow() {

		var next =  $("<span></span>", {
			"class": "lightbox-next"
		}).appendTo($(".container-lightbox"));

		return next;

	}

	function createPrevArrow() {

		var prev = $("<span></span>", {
			"class": "lightbox-prev"
		}).appendTo($(".container-lightbox"));

		return prev;

	}

	function showControls(img, settings) {

		var dataLightbox = $(img).data('group-lightbox');

		if( ( dataLightbox === undefined )) return;

		var allImg = createImageArray(dataLightbox);

		if ( allImg.length <= 1 ) return;
		
		var next = createNextArrow(),
			prev = createPrevArrow();
		

		next.on("click", function(e) {
			e.stopPropagation();

			var imgNumber = $.inArray(img, allImg) + 1;

			if(imgNumber > allImg.length - 1 ) 
			{
				imgNumber = 0;
			}
			
			var imgNext = allImg[imgNumber];

			img = imgNext;

			$(".progress-icon").show();
			showLightbox(img, settings);

		});

		prev.on("click", function(e) {
			e.stopPropagation();

			var imgNumber = $.inArray(img, allImg) - 1;

			if(imgNumber < 0 ) 
			{
				imgNumber = allImg.length - 1;
			}
			
			var imgPrev = allImg[imgNumber];

			img = imgPrev;

			$(".progress-icon").show();
			showLightbox(img, settings);

		});

	}

/* -----------------
	OVERLAY
----------------- */


    function createOverlay() {

		var lightboxOverlay = $("<div></div>", {
			"class": "lightbox-overlay"
		}).appendTo('body');

		lightboxOverlay.on("click", function() {
			closeOverlay();
		});

		body.css({
			'overflow': 'hidden'
		});

		createContainerLightbox(lightboxOverlay);

    	return lightboxOverlay;

    }

    function showOverlay(settings) {

    	var lightboxOverlay = createOverlay();

    	lightboxOverlay.fadeIn(settings.speedOverlay);

    }

    function closeOverlay() {

        var lightboxOverlay = $(".lightbox-overlay");

        lightboxOverlay.fadeOut(500, function() {
        	$(this).remove();
        });

        body.css({
			'overflow': 'auto'
		});

    }

    function showLightbox(imgClick, settings) {

    	var lightbox = $(".container-lightbox"),
    		imgUrl = $(imgClick).attr('href');

    	var img = $("<img>");

        img.on("load", function() {

        	lightbox.find('img').remove()
                    .end()
                    .append( img );

            img.fadeIn(settings.speedLightbox, function() {
	            $(".progress-icon").hide();
	        });

            img.on("click", function(e) {
	        	e.stopPropagation();
	        });

        });

        img.attr("src", imgUrl);

    }

/* -----------------
	ESC CLOSE LIGHTBOX
----------------- */

	doc.on("keyup", function(e) {

        if(e.which === 27) {
            closeOverlay();
        }

    });

/* -----------------
		INIT
----------------- */

    function init(img, settings) {

    	showOverlay(settings);

    	if(settings.controls === true) {
    		showControls(img, settings);
    	}

    	showLightbox(img, settings);

    }

/* -----------------
		PLUGIN
----------------- */

	$.fn.fancyLightbox = function(userOptions) {
		
		var defaultOptions = {
			speedOverlay: 500,
			speedLightbox: 500,
			controls: true
		};

		var settings = $.extend({}, defaultOptions, userOptions);

		return this.each(function() {

			var that = $(this);

			that.on("click", function(e) {

				e.preventDefault();

				init(this, settings);

			});

		});
		

	};


})(jQuery, window, document);