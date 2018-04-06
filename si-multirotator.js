/**
 * SI MultiRotator 0.0.1
 * Developed by Mike Spooner (thetuningspoon) for Solution Innovators 2018
 *
 * BASIC USAGE
 *
 * $(function() {
 *      new SiMultiRotator({
 *          transitionSpeed: 200,
 *          autoTransitionSpeed: 1000,
 *          slideTimeout: 5000,
 *          thumbnailSelector: '.thumb',
 *          imageSelector: '.img',
 *          captionSelector: '.caption',
 *          pauseOverSelector: '.thumb, .img, .caption',
 *      });
 * }
 *
 * Each element on the page (thumbnail, image, and caption) must have a data-index attribute with the numerical index of the element (starting at 0). For example, the thumbnail for a particular image, should have a data-index that matches a data-index on the corresponding full size image it represents. The appropriate caption element should also share the same index:
 *
 * <img class="thumb" src="" data-index="0" />
 * <img class="thumb" src="" data-index="1" />
 * <img class="thumb" src="" data-index="2" />
 *
 * <img class="img" src="" data-index="0" />
 * <img class="img" src="" data-index="1" />
 * <img class="img" src="" data-index="2" />
 *
 * <div class="caption" data-index="0" />
 * <div class="caption" data-index="1" />
 * <div class="caption" data-index="2" />
 *
 */

function SiMultiRotator(options) {

    // Default configuration options if none specified
    var defaults = {
        transitionSpeed: 200,
        autoTransitionSpeed: 1000,
        slideTimeout: 5000,
        thumbnailSelector: '.thumb',
        imageSelector: '.img',
        captionSelector: '.caption',
        pauseOverSelector: '.thumb, .img, .caption',
        startingIndex: 0,
    };
    var config = $.extend({}, defaults, options); // Merge the defaults and user specified options into config

    // Properties
    var $thumbnails = $(config.thumbnailSelector);
    var $displayImgs = $(config.imageSelector);
    var $captions = $(config.captionSelector);
    var $pauseOverElements = $(config.pauseOverSelector);
    var currentIndex = null;
    var slideshowInterval;


    // Initialization
    $thumbnails.on('click', function () {
        $this = $(this);
        switchSlide(parseInt($this.attr('data-index')));
    });

    $pauseOverElements.on('mouseenter', function () {
        //console.log('entered');
        stopSlideshow();
    });
    $pauseOverElements.on('mouseleave', function () {
        //console.log('left');
        startSlideshow();
    });

    // Wait until the starting slide image has fully loaded before showing it
    //$displayImgs.filter('[data-index="' + config.startingIndex + '"]').first().on('load', function () {
        switchSlide(config.startingIndex);
        startSlideshow();
    //});


    function startSlideshow() {
        slideshowInterval = setInterval(function () {
            if ((currentIndex + 1) < $thumbnails.length) {
                switchSlide(currentIndex + 1, config.autoTransitionSpeed);
            }
            else {
                switchSlide(0, config.autoTransitionSpeed);
            }
        }, config.slideTimeout);
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    function switchSlide(index, speed) {
        if(!speed) speed = config.transitionSpeed;

        if(index !== currentIndex) {
            $thumbnails.removeClass('active');
            $thumbnails.filter('[data-index="' + index + '"]').addClass('active');

            currentIndex = index;
            $displayImgs.fadeOut(speed);
            $displayImgs.filter('[data-index="' + index + '"]').fadeIn(speed);

            $captions.fadeOut(speed);
            $captions.filter('[data-index="' + index + '"]').fadeIn(speed);
        }
    }
}