(function($, window, document, undefined) {
'use strict';

	var lightbox = {

        doc: $(document),
        body: $("body"),

        createContainerLightbox: function(lightboxOverlay) {
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
				this.closeOverlay();
			}.bind(this));

			var containerLightboxImg = $("<div></div>", {
				"class": "container-lightbox-img"
			}).appendTo(containerLightbox);

			containerLightboxImg.on("click", function(e) {
				e.stopPropagation();
			});
        },

		createOverlay: function() {
			var lightboxOverlay = $("<div></div>", {
			"class": "lightbox-overlay"
			}).appendTo('body');

			lightboxOverlay.on("click", function() {
				this.closeOverlay();
			}.bind(this));

			this.body.css({
				'overflow': 'hidden'
			});

			this.createContainerLightbox(lightboxOverlay);

	    	return lightboxOverlay;
		},

		showOverlay: function(settings) {
			var lightboxOverlay = this.createOverlay();
    		lightboxOverlay.fadeIn(settings.speedOverlay);
		},

		closeOverlay: function() {
			var lightboxOverlay = $(".lightbox-overlay");

	        lightboxOverlay.fadeOut(500, function() {
	        	$(this).remove();
	        });

	        this.body.css({
				'overflow': 'auto'
			});
		},

		createImageArray: function(dataLightbox) {

			var images = [];

			$(".fancy-lighbox").each(function() {
				if($(this).attr('data-group-lightbox') === dataLightbox ) {
					images.push(this);
				}
				
			});

			return images;

		},

		createNextArrow: function() {

			var next =  $("<span></span>", {
				"class": "lightbox-next"
			}).appendTo($(".container-lightbox"));

			return next;

		},

		createPrevArrow: function() {

			var prev = $("<span></span>", {
				"class": "lightbox-prev"
			}).appendTo($(".container-lightbox"));

			return prev;

		},

		showControls: function(img, settings) {
			var dataLightbox = $(img).data('group-lightbox');

			if( ( dataLightbox === undefined )) return;

			var allImg = this.createImageArray(dataLightbox);

			if ( allImg.length <= 1 ) return;
			
			var next = this.createNextArrow(),
				prev = this.createPrevArrow(),
				progressIcon = $(".progress-icon"),
				containerLightboxImg = $(".container-lightbox-img");
			

			next.on("click", function(e) {
				e.stopPropagation();
				$(".progress-icon").show();
				containerLightboxImg.hide();

				var imgNumber = $.inArray(img, allImg) + 1;

				if(imgNumber > allImg.length - 1 ) 
				{
					imgNumber = 0;
				}
				
				var imgNext = allImg[imgNumber];

				img = imgNext;

				this.showLightbox(img, settings);

			}.bind(this));

			prev.on("click", function(e) {
				e.stopPropagation();
				progressIcon.show();
				containerLightboxImg.hide();

				var imgNumber = $.inArray(img, allImg) - 1;

				if(imgNumber < 0 ) 
				{
					imgNumber = allImg.length - 1;
				}
				
				var imgPrev = allImg[imgNumber];

				img = imgPrev;

				this.showLightbox(img, settings);

			}.bind(this));
		},

		createlightboxImg: function() {

			var img = $(".lightbox-img");

			if(img) img.remove();

			img = $("<img>", {
    			"class": "lightbox-img"
    		});
    		

			return img;
		},

		showLightbox: function(imgClick, settings) {
			var lightboxContainerImg = $(".container-lightbox-img"),
    		imgUrl = $(imgClick).attr('href'),
    		img = this.createlightboxImg();

	        img.on("load", function() {

	        	lightboxContainerImg.show().append( img );

	            img.fadeIn(settings.speedLightbox, function() {
		            $(".progress-icon").hide();
		        });

	            img.on("click", function(e) {
		        	e.stopPropagation();
		        });

	        });

	        img.attr("src", imgUrl);
		},

		closeEsc: function() {
			this.doc.on("keyup", function(e) {
		        if(e.which === 27) {
		            this.closeOverlay();
		        }
	    	}.bind(this));
		},

		init: function(img, settings) {
			this.showOverlay(settings);

			if(settings.controls === true) {
	    		this.showControls(img, settings);
	    	}

	    	this.showLightbox(img, settings);

		}

	};


	$.fn.fancyLightbox = function(userOptions) {
		
		var defaultOptions = {
			speedOverlay: 500,
			speedLightbox: 700,
			controls: true
		};

		var settings = $.extend({}, defaultOptions, userOptions);

		return this.each(function() {

			var that = $(this);

			that.on("click", function(e) {

				e.preventDefault();

				lightbox.init(this, settings);

			});

		});
		

	};


})(jQuery, window, document);