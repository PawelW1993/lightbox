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

			this.containerLightbox = containerLightbox;
			this.progressIcon = progress;
			this.containerLightboxImg = containerLightboxImg;
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

		showOverlay: function() {
			var lightboxOverlay = this.createOverlay();
    		lightboxOverlay.fadeIn(this.settings.speedOverlay);
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
			}).appendTo($(this.containerLightbox));

			return next;

		},

		createPrevArrow: function() {

			var prev = $("<span></span>", {
				"class": "lightbox-prev"
			}).appendTo($(this.containerLightbox));

			return prev;

		},

		showControls: function() {
			var dataLightbox = $(this.img).data('group-lightbox');

			if( ( dataLightbox === undefined )) return;

			var allImg = this.createImageArray(dataLightbox);

			if ( allImg.length <= 1 ) return;
			
			var next = this.createNextArrow(),
				prev = this.createPrevArrow(),
				progressIcon = $(this.progressIcon),
				containerLightboxImg = $(this.containerLightboxImg);
			

			next.on("click", function(e) {
				e.stopPropagation();
				progressIcon.show();
				containerLightboxImg.hide();

				var imgNumber = $.inArray(this.img, allImg) + 1;

				if(imgNumber > allImg.length - 1 ) 
				{
					imgNumber = 0;
				}
				
				var imgNext = allImg[imgNumber];

				this.img = imgNext;

				this.showLightbox();

			}.bind(this));

			prev.on("click", function(e) {
				e.stopPropagation();
				progressIcon.show();
				containerLightboxImg.hide();

				var imgNumber = $.inArray(this.img, allImg) - 1;

				if(imgNumber < 0 ) 
				{
					imgNumber = allImg.length - 1;
				}
				
				var imgPrev = allImg[imgNumber];

				this.img = imgPrev;

				this.showLightbox();

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

		showLightbox: function() {
			var lightboxContainerImg = $(this.containerLightboxImg),
    		imgUrl = $(this.img).attr('href'),
    		img = this.createlightboxImg(),
    		progressIcon = $(this.progressIcon);

	        img.on("load", function() {

	        	lightboxContainerImg.append( img );

	            lightboxContainerImg.fadeIn(this.settings.speedLightbox, function() {
		            progressIcon.hide();
		        });

	            img.on("click", function(e) {
		        	e.stopPropagation();
		        });

	        }.bind(this));

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

			this.settings = settings;
			this.img = img;

			this.showOverlay();

			if(this.settings.controls === true) {
	    		this.showControls();
	    	}

	    	this.showLightbox();

	    	this.closeEsc();

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