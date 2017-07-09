/*global jQuery, document, window, Waypoint, grecaptcha, google, InfoBox, Photostack, Cookies, smoothScroll*/
var headerScroll,
    flickrUserID,
    localZoneTime,
    donationSymbol,
    parallaxEffect,
    instagramUserID,
    scheduleWeekDay,
    mailchimpListURL,
    pageSmoothScroll,
    recaptchaSiteKey,
    blocksAtSameHeight,
    eventsTableWeekDay,
    eventsTableStartDay,
    instagramAccessToken,
    gfortRecaptchaSiteKey,
    notificationExpireDays,
    donationSymbolPosition;


/* =============================================================================
Settings
============================================================================= */
// Choose between ( fixed / autoHide / normal )
headerScroll = 'normal';

// Enable or disable Parallax Effect ( true / false )
parallaxEffect = true;

// Mailchimp list URL
mailchimpListURL = 'http://Graphicfort.us11.list-manage.com/subscribe/post?u=dffe9a5d2b472dbe0cc471e1b&amp;id=4150cd2f12';

// Your Website recaptcha Key
recaptchaSiteKey = '6LdHCQwTAAAAAK0HvYvQJ5oA_9W-vlv5A41xBEGp';

// Change $ to any currency symbol you want
donationSymbol = '$';

// Donation symbol Position ( left / right )
donationSymbolPosition = 'left';

// Local Time GMT Used for Timer countdown
localZoneTime = '+2';

// Make blocks at same Height as grid ( true / false )
blocksAtSameHeight = true;

// Schedule week days names
scheduleWeekDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Events Table
/*
0 => Sun
1 => Mon
2 => Tue
3 => Wed
4 => Thu
5 => Fri
6 => Sat
*/
eventsTableWeekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
eventsTableStartDay = 0;

// Instagram userID and Access Token
instagramUserID = '269801886';
instagramAccessToken = '2546719702.1677ed0.12f1f21e44014e37b3e5dacc494cfcdd';

// Flickr userID
flickrUserID = '136162511@N05';

// Notification Expire Days
notificationExpireDays = 10;

// Smooth Scroll ( true / false )
pageSmoothScroll = true;




/* =============================================================================
Ajax
============================================================================= */
jQuery.ajaxPrefilter(function (options) {
    'use strict';
    options.cache = true;
});




/* =============================================================================
Document Ready Function
============================================================================= */
jQuery(document).ready(function () {

    'use strict';

    var isWin,
        isOpera,
        headerTimer,
        songDetails,
        delayTime = 0,
        totalEvents = 0,
        currentPosition,
        eventsTableTimer,
        elCurrentMap = [],
        notificationBlockTimer,
        progressBarBlockArray = [],
        eventsTableCurrentYear = 0,
        eventsTableCurrentMonth = 0;


    /* =========================================================================
    Opera on Win Fix
    ========================================================================= */
    isWin = /win/.test(navigator.platform.toLowerCase());
    isOpera = /opera/.test(navigator.userAgent.toLowerCase());

    if (isWin) {
        if (isOpera) {
            jQuery('html').addClass('ie9');
        }
    }


    /* =========================================================================
    UP Button
    ========================================================================= */
    /* Button
    ------------------------------------------------------------------------- */
    jQuery('#up-button a').on('click', function () {
        jQuery('html, body').animate({scrollTop: '0'}, 800);
        return false;
    });

    /* Window Scroll
    ------------------------------------------------------------------------- */
    jQuery(window).scroll(function () {
        currentPosition = jQuery(window).scrollTop();
        if (currentPosition >= 300) {
            jQuery('#up-button').addClass('correct-position');
        } else {
            jQuery('#up-button').removeClass('correct-position');
        }
    });


    /* =========================================================================
    GFort Ripple Animation
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortRippleAnimationfn(xAxes, yAxes) {

        jQuery('.gfort-ripple').remove();

        var rippleTopPosition,
            rippleLeftPosition,
            el = jQuery('.gfort-ripple-animation'),
            elPosTop = el.offset().top,
            elPosLeft = el.offset().left,
            elouterWidth = el.outerWidth(),
            elouterHeight = el.outerHeight();

        el.prepend('<span class="gfort-ripple"></span>');

        if (elouterWidth >= elouterHeight) {
            elouterHeight = elouterWidth;
        } else {
            elouterWidth = elouterHeight;
        }

        rippleLeftPosition = xAxes - elPosLeft - elouterWidth / 2;
        rippleTopPosition = yAxes - elPosTop - elouterHeight / 2;

        jQuery('.gfort-ripple').css({
            width: elouterWidth,
            height: elouterHeight,
            top: rippleTopPosition + 'px',
            left: rippleLeftPosition + 'px'
        }).addClass('ripple-animation');

    }

    /* Action
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.wave-effect', function (e) {

        if (e.button === 2) {
            return false;
        }

        jQuery('.gfort-ripple-animation').removeClass('gfort-ripple-animation');
        jQuery(this).addClass('gfort-ripple-animation');
        gfortRippleAnimationfn(e.pageX, e.pageY);

    });


    /* ==========================================================================
    Notification Block ( Cookie )
    ========================================================================== */
    /* Notification Top Function
    ------------------------------------------------------------------------- */
    function gfortNTopfn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).css('display', 'none');
        } else {
            jQuery('.notification-block-style-' + nbsno).css('display', 'block');
        }
    }

    /* Notification Top Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNTopDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).slideUp(500);
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
    }

    /* Notification Modal Function
    ------------------------------------------------------------------------- */
    function gfortNModalfn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).find('.modal').modal('hide');
        } else {
            notificationBlockTimer = setTimeout(function () {
                jQuery('.notification-block-style-' + nbsno).find('.modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });
            }, 4000);
        }
    }

    /* Notification Modal Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNModalDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).find('.modal').modal('hide');
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
        clearTimeout(notificationBlockTimer);
    }

    /* Notification Translate Function
    ------------------------------------------------------------------------- */
    function gfortNTranslatefn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).removeClass('correct-position');
        } else {
            notificationBlockTimer = setTimeout(function () {
                jQuery('.notification-block-style-' + nbsno).addClass('correct-position');
            }, 4000);
        }
    }

    /* Notification Translate Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNTranslateDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).removeClass('correct-position');
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
        clearTimeout(notificationBlockTimer);
    }

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortNotificationsfn() {

        /* Styles
        --------------------------------------------------------------------- */
        /* Style 1
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-1')) {
            gfortNTopfn(1);
        }

        /* Style 2
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-2')) {
            gfortNTopfn(2);
        }

        /* Style 3
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-3')) {
            gfortNTopfn(3);
        }

        /* Style 4
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-4')) {
            gfortNModalfn(4);
        }

        /* Style 5
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-5')) {
            gfortNModalfn(5);
        }

        /* Style 6
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-6')) {
            gfortNModalfn(6);
        }

        /* Style 7
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-7')) {
            gfortNModalfn(7);
        }

        /* Style 8
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-8')) {
            gfortNModalfn(8);
        }

        /* Style 9
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-9')) {
            gfortNModalfn(9);
        }

        /* Style 10
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-10')) {
            gfortNTranslatefn(10);
        }

        /* Close Button
        --------------------------------------------------------------------- */
        jQuery('.close-notification').on('click', function (e) {

            e.preventDefault();
            var elNotificationClass = '.' + jQuery(this).parents('.notification-block').attr('class').replace(/\s/g, '.');

            /* Styles
            ----------------------------------------------------------------- */
            if (jQuery(elNotificationClass).hasClass('notification-block-style-1')) {
                gfortNTopDismissfn(1);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-2')) {
                gfortNTopDismissfn(2);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-3')) {
                gfortNTopDismissfn(3);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-4')) {
                gfortNModalDismissfn(4);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-5')) {
                gfortNModalDismissfn(5);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-6')) {
                gfortNModalDismissfn(6);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-7')) {
                gfortNModalDismissfn(7);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-8')) {
                gfortNModalDismissfn(8);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-9')) {
                gfortNModalDismissfn(9);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-10')) {
                gfortNTranslateDismissfn(10);
            }

            return false;

        });

        /* Main Link
        --------------------------------------------------------------------- */
        jQuery('.notification-block-modal .main-link').on('click', function () {
            var elNotificationClass = '.' + jQuery(this).parents('.notification-block').attr('class').replace(/\s/g, '.');
            if (jQuery(elNotificationClass).hasClass('notification-block-style-9')) {
                gfortNModalDismissfn(9);
            }
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.notification-block').length) {
        jQuery.getScript('js/plugins/cookie/js.cookie.min.js', function () {
            gfortNotificationsfn();
        });
    }


    /* =========================================================================
    Background Image Block
    ========================================================================= */
    if (jQuery('.remove-white-content').length) {
        jQuery('.remove-white-content').each(function () {
            jQuery(this).parents('.section-container').parent().addClass('border-bottom');
        });
    }


    /* =========================================================================
    Menu Button
    ========================================================================= */
    jQuery('.navbar-toggle').on('click', function () {
        jQuery('.navbar-toggle').toggleClass('gfort-toggle');
    });


    /* =========================================================================
    Header Scroll Style
    ========================================================================= */
    /* Smooth Scroll
    ------------------------------------------------------------------------- */
    if (jQuery('[data-scroll]').length) {
        jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js');
    }

    /* Fixed / Auto hide header smooth scroll function
    ------------------------------------------------------------------------- */
    function gfortScrollTo() {

        /* Adding data-scroll to each link
        --------------------------------------------------------------------- */
        jQuery('.navbar-brand').each(function () {
            if (jQuery(this).attr('href').charAt(0) === '#') {
                jQuery(this).attr('data-scroll', '');
            }
        });

        jQuery('.header-menu-container a').each(function () {
            if (jQuery(this).attr('href').charAt(0) === '#') {
                jQuery(this).attr('data-scroll', '');
            }
        });

    }

    /* on click
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-scroll]', function (e) {

        e.preventDefault();

        if (headerScroll === 'autoHide') {
            jQuery('html, body').scrollTo(this.hash, 800, {
                offset: 0
            });
        } else {
            jQuery('html, body').scrollTo(this.hash, 800, {
                offset: -60
            });
        }

        if (jQuery('.navbar-collapse').hasClass('in')) {
            jQuery('.navbar-toggle').removeClass('gfort-toggle');
            jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
        }

    });

    /* Fixed Header Function
    ------------------------------------------------------------------------- */
    function fixedHeaderfn() {

        var headerEl = jQuery('.header-menu-container');

        headerEl = new Waypoint.Sticky({
            element: headerEl[0],
            stuckClass: 'header-menu-stuck',
            wrapper: '<div class="header-menu">'
        });

        jQuery(window).scroll(function () {
            currentPosition = jQuery(window).scrollTop();
            if (currentPosition >= 300) {
                jQuery('.header-menu-stuck').addClass('header-menu-tiny');
            } else {
                jQuery('.header-menu-stuck').removeClass('header-menu-tiny');
            }
        });

        gfortScrollTo();
        clearTimeout(headerTimer);

    }

    /* Auto Hide Header Function
    ------------------------------------------------------------------------- */
    function autoHideHeaderfn() {

        var headerEl = jQuery('.header-menu-container');

        headerEl = new Waypoint({
            element: headerEl[0],
            handler: function () {

                var lastScrollTop = 0,
                    el = jQuery(this.element),
                    elParent = el.parent(),
                    elGParentHeight = elParent.parent().outerHeight(true);

                elParent.css({height: el.outerHeight(true)});

                jQuery(window).scroll(function () {

                    currentPosition = jQuery(window).scrollTop();

                    if (currentPosition > elGParentHeight) {

                        if (currentPosition > lastScrollTop) {
                            elParent.find('.header-menu-container').addClass('header-menu-autohide');
                            if (currentPosition >= 300) {
                                jQuery('.header-menu-autohide').addClass('header-menu-tiny');
                            }
                        } else if (currentPosition < lastScrollTop) {
                            elParent.find('.header-menu-container').addClass('header-menu-stuck').removeClass('header-menu-autohide');
                        }

                    } else if (currentPosition < elGParentHeight && currentPosition < parseInt(elParent.offset().top, 10)) {
                        elParent.find('.header-menu-container').removeClass('header-menu-stuck');
                    }

                    if (currentPosition < 300) {
                        elParent.find('.header-menu-container').removeClass('header-menu-tiny');
                    }

                    lastScrollTop = currentPosition;

                });

            }
        });

        gfortScrollTo();
        clearTimeout(headerTimer);

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (headerScroll === 'fixed') {
        if (jQuery('.header-menu-container').length) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/waypoint/sticky.min.js', function () {
                    jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js', function () {
                        fixedHeaderfn();
                    });
                });
            });
        }
    } else if (headerScroll === 'autoHide') {
        if (jQuery('.header-menu-container').length) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/waypoint/sticky.min.js', function () {
                    jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js', function () {
                        autoHideHeaderfn();
                    });
                });
            });
        }
    }

    /* Close Notification
    ------------------------------------------------------------------------- */
    jQuery('.close-notification').on('click', function () {
        headerTimer = setTimeout(function () {
            if (headerScroll === 'fixed') {
                fixedHeaderfn();
            } else if (headerScroll === 'autoHide') {
                autoHideHeaderfn();
            }
        }, 600);
    });


    /* ==========================================================================
    Data Spy
    ========================================================================== */
    jQuery('body').attr('data-spy', 'scroll').attr('data-target', '.header-menu-container').attr('data-offset', '61');

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        jQuery('[data-spy="scroll"]').each(function () {
            jQuery(this).scrollspy('refresh');
        });
    });


    /* =========================================================================
    Sub Menu
    ========================================================================= */
    /* Arrow
    ------------------------------------------------------------------------- */
    jQuery('ul.navbar-nav li ul').parent('li').addClass('parent-list');
    jQuery('.parent-list > a').append('<span class="menu-arrow"><i class="fa fa-angle-down"></i></span>');

    /* List
    ------------------------------------------------------------------------- */
    jQuery('.parent-list > ul').addClass('sub-menu');

    /* Parent Item
    ------------------------------------------------------------------------- */
    jQuery('.parent-list').each(function () {
        var el = jQuery('> .sub-menu', this);
        jQuery('> a', this).clone().prependTo(el).wrap('<li></li>');
    });
    jQuery('.sub-menu').find('.sub-menu li:first').remove();
    jQuery('.sub-menu a').addClass('wave-effect');
    jQuery('.sub-menu li:first-child a').removeClass('wave-effect');

    /* Show / Hide Sub Menu
    ------------------------------------------------------------------------- */
    jQuery('.parent-list').on({
        mouseenter: function () {
            var el = jQuery('> ul', this),
                elHeight = el.find('> li').length * 42 + 20;
            el.animate({
                width: '200px',
                height: elHeight
            }, 300);
        },
        mouseleave: function () {
            var el = jQuery('> ul', this);
            el.animate({
                width: '0',
                height: '0'
            }, 100);
        }
    });


    /* =========================================================================
    Swiper Slider
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function swiperSliderfn() {
        jQuery('.gfort-swiper-slider').each(function (index) {

            var grabTouchMouse,
                sliderDirection,
                el = jQuery(this),
                slideItemsPerView,
                slideItemsMDPerView,
                slideItemsSMPerView,
                slideItemsXSPerView,
                centeredSlidesItems,
                slideAnimationEffect,
                windowWidth = jQuery(window).outerWidth(true);

            /* Thumbs
            ----------------------------------------------------------------- */
            if (el.hasClass('thumbs-swiper-slider')) {
                el.find('.swiper-pagination').addClass('swiper-pagination-tumbs');
                el.find('.swiper-pagination').removeClass('swiper-pagination');
                el.find('.swiper-pagination-tumbs span:first').addClass('active-swiper-slide');
                el.find('.swiper-pagination-tumbs span').each(function (slidesIndex) {
                    jQuery(this).attr('data-gfort-swiper-slide-to', slidesIndex + 1);
                });
            }

            /* Slider, Pagination and Arrows IDs
            ----------------------------------------------------------------- */
            el.attr('id', 'gfort-swiper-slider-' + index);
            el.find('.swiper-pagination').attr('id', 'gfort-swiper-pagination-' + index);
            el.find('.swiper-button-next').attr('id', 'gfort-swiper-button-next-' + index);
            el.find('.swiper-button-prev').attr('id', 'gfort-swiper-button-prev-' + index);

            /* Mouse Cursor
            ----------------------------------------------------------------- */
            grabTouchMouse = jQuery('#gfort-swiper-slider-' + index).hasClass('fade-swiper-slider')
                ? !1
                : !0;

            /* Direction
            ----------------------------------------------------------------- */
            sliderDirection = jQuery('#gfort-swiper-slider-' + index).hasClass('vertical-swiper-slider')
                ? 'vertical'
                : 'horizontal';

            /* Centerd Items
            ----------------------------------------------------------------- */
            centeredSlidesItems = jQuery('#gfort-swiper-slider-' + index).hasClass('center-swiper-slider')
                ? !0
                : !1;

            /* Animation Effect ( fade / slide )
            ----------------------------------------------------------------- */
            slideAnimationEffect = jQuery('#gfort-swiper-slider-' + index).hasClass('fade-swiper-slider')
                ? 'fade'
                : 'slide';

            /* Animation Effect ( coverflow )
            ----------------------------------------------------------------- */
            if (jQuery('#gfort-swiper-slider-' + index).hasClass('coverflow-swiper-slider')) {
                if (windowWidth < 1024) {
                    jQuery('#gfort-swiper-slider-' + index).removeClass('swiper-container-3d');
                    jQuery('#gfort-swiper-slider-' + index).find('.swiper-slide').css({transform: 'rotateY(0)'});
                    slideItemsPerView = '2';
                    slideAnimationEffect = 'slide';
                } else {
                    slideAnimationEffect = 'coverflow';
                }
            }

            /* Slide Items Per View ( on Large screen )
            ----------------------------------------------------------------- */
            slideItemsPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-items');
            if (slideItemsPerView === '' || slideItemsPerView === undefined) {
                slideItemsPerView = 1;
            }

            /* Slide Items Per View ( on Medium screen )
            ----------------------------------------------------------------- */
            slideItemsMDPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-md-items');
            if (slideItemsMDPerView === '' || slideItemsMDPerView === undefined) {
                slideItemsMDPerView = 2;
            }

            /* Slide Items Per View ( on Small screen )
            ----------------------------------------------------------------- */
            slideItemsSMPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-sm-items');
            if (slideItemsSMPerView === '' || slideItemsSMPerView === undefined) {
                slideItemsSMPerView = 2;
            }

            /* Slide Items Per View ( on Small screen )
            ----------------------------------------------------------------- */
            slideItemsXSPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-xs-items');
            if (slideItemsXSPerView === '' || slideItemsXSPerView === undefined) {
                slideItemsXSPerView = 1;
            }

            if (sliderDirection === 'horizontal') {
                if (windowWidth < 401) {
                    slideItemsPerView = 1;
                } else if (windowWidth < 601) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsXSPerView
                        : 1;
                } else if (windowWidth < 768) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsSMPerView
                        : 1;
                } else if (windowWidth < 1024) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsMDPerView
                        : 1;
                }
            } else {
                slideItemsPerView = 1;
            }

            /* Configurations
            ----------------------------------------------------------------- */
            jQuery('#gfort-swiper-slider-' + index).swiper({
                loop: true,
                speed: 800,
                coverflow: {
                    depth: 120,
                    rotate: -30,
                    stretch: 10
                },
                autoplay: 5000,
                paginationClickable: true,
                grabCursor: grabTouchMouse,
                direction: sliderDirection,
                effect: slideAnimationEffect,
                simulateTouch: grabTouchMouse,
                slidesPerView: slideItemsPerView,
                centeredSlides: centeredSlidesItems,
                autoplayDisableOnInteraction: false,
                pagination: '#gfort-swiper-pagination-' + index,
                nextButton: '#gfort-swiper-button-next-' + index,
                prevButton: '#gfort-swiper-button-prev-' + index
            });

            /* Hover
            ----------------------------------------------------------------- */
            jQuery('#gfort-swiper-slider-' + index).on({
                mouseenter: function () {
                    jQuery(this)[0].swiper.stopAutoplay();
                },
                mouseleave: function () {
                    jQuery(this)[0].swiper.startAutoplay();
                }
            });

        });
    }

    /* Slider Height Function
    ------------------------------------------------------------------------- */
    function swiperSliderHeightfn() {
        jQuery('.swiper-container-horizontal').each(function () {
            var el = jQuery(this);
            el.css({height: '100%'});
            el.css({height: el.find('.swiper-wrapper').outerHeight(true)});
            if (el.height() === 0 || el.height() < 21) {
                el.css({height: '100%'});
            }
        });
    }

    /* Swipe to Slide Funcrion
    ------------------------------------------------------------------------- */
    function swipToSlidefn() {

        jQuery('> :first-child', '[data-gfort-swiper-slide-to]').on('click', function () {

            var el = jQuery(this),
                elParent = el.parent(),
                swipToSlide = elParent.attr('data-gfort-swiper-slide-to'),
                sliderID = '#' + el.parents('.section-container').find('.gfort-swiper-slider').attr('id');

            if (jQuery(sliderID)[0] !== undefined) {
                el.parents('.section-container').find('.active-swiper-slide').removeClass('active-swiper-slide');
                elParent.addClass('active-swiper-slide');
                jQuery(sliderID)[0].swiper.slideTo(swipToSlide, 500, false);
            }

        });

        if (jQuery('[data-gfort-swiper-slide-to]').length) {
            jQuery('[data-gfort-swiper-slide-to]').parents('.section-container').find('.gfort-swiper-slider').each(function () {

                var el = jQuery(this),
                    sliderID = '#' + el.attr('id'),
                    elParents = jQuery(sliderID).parents('.section-container');

                elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                elParents.find('[data-gfort-swiper-slide-to="1"]').addClass('active-swiper-slide');

                jQuery(sliderID)[0].swiper.on('slideChangeStart', function () {

                    var slideIndex = jQuery(sliderID)[0].swiper.activeIndex,
                        swipToSlideLength = elParents.find('[data-gfort-swiper-slide-to]').length;

                    elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                    elParents.find('[data-gfort-swiper-slide-to="' + slideIndex + '"]').addClass('active-swiper-slide');

                    if (slideIndex > swipToSlideLength) {
                        elParents.find('[data-gfort-swiper-slide-to="1"]').addClass('active-swiper-slide');
                    }
                    if (slideIndex < 1) {
                        elParents.find('[data-gfort-swiper-slide-to="' + swipToSlideLength + '"]').addClass('active-swiper-slide');
                    }

                });

            });
        }

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-swiper-slider').length) {
        jQuery.getScript('css/plugins/swiper/js/swiper.min.js', function () {
            swiperSliderfn();
            swiperSliderHeightfn();
            swipToSlidefn();
        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        if (jQuery('.gfort-swiper-slider').length) {
            jQuery('.gfort-swiper-slider').each(function () {
                jQuery('#' + jQuery(this).attr('id'))[0].swiper.destroy();
            });
            swiperSliderfn();
            swiperSliderHeightfn();
            swipToSlidefn();
        }
    });


    /* =========================================================================
    Dismiss Form Message
    ========================================================================= */
    function dismissFormMessagefn() {
        jQuery('.form-message-block').css({bottom: '-20%'}).fadeOut(300, function () {
            jQuery(this).remove();
        });
    }
    jQuery('body').on('click', '.form-message-block button', function () {
        dismissFormMessagefn();
    });


    /* =========================================================================
    MailChimp Form ( Subscription )
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortmailchimpfn() {
        jQuery('.subscribe-form-block form').each(function (index) {

            /* Form Message
            ----------------------------------------------------------------- */
            function mailchimpMessagefn(responsemsg) {
                if (!jQuery('.form-message-block').length) {
                    jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                }
                jQuery('.form-message-container').html(responsemsg.msg);
                jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});
            }

            /* Callback
            ----------------------------------------------------------------- */
            function mailchimpCallbackfn(response) {
                if (response.result === 'success') {
                    jQuery('#gfort-mailchilmp-' + index).find('.subscribe-email').val('');
                    jQuery('#gfort-mailchilmp-' + index).find('.subscribe-email').removeClass('input-filled');
                    mailchimpMessagefn(response);
                } else {
                    mailchimpMessagefn(response);
                }
            }

            jQuery(this).attr('id', 'gfort-mailchilmp-' + index);

            jQuery('#gfort-mailchilmp-' + index).ajaxChimp({
                url: mailchimpListURL,
                callback: mailchimpCallbackfn
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.subscribe-form-block').length) {
        jQuery.getScript('js/plugins/jquery.ajaxchimp.js', function () {
                gfortmailchimpfn();
        });
    }


    /* =========================================================================
    Contact Form
    ========================================================================= */
    if (jQuery('.contact-form-block').length) {
        jQuery('.contact-form-block form').each(function (index) {

            jQuery(this).attr('id', 'gfort-contact-form-block-' + index);

            jQuery('#gfort-contact-form-block-' + index).submit(function () {

                var el = jQuery(this),
                    formValues = el.serialize(),
                    formActionURL = el.attr('action'),
                    recaptchaID = el.find('.gfort-recaptcha').attr('id');

                el.find('.gfort-new-recaptcha').removeClass('gfort-new-recaptcha');
                el.find('.gfort-recaptcha').parent().addClass('gfort-new-recaptcha');
                el.find('button').addClass('add-spin');

                jQuery.post(formActionURL, formValues, function (response) {

                    /* Form Message
                    --------------------------------------------------------- */
                    if (!jQuery('.form-message-block').length) {
                        jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                    }
                    jQuery('.form-message-container').html(response);
                    jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});

                    /* Handle Errors
                    --------------------------------------------------------- */
                    /* Name
                    ----------------------------------------------------- */
                    if (response.match('error-name') !== null) {
                        el.find('.contact-name').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Phone
                    ----------------------------------------------------- */
                    if (response.match('error-phone') !== null) {
                        el.find('.contact-phone').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Call Back Time
                    ----------------------------------------------------- */
                    if (response.match('error-call-back-time') !== null) {
                        el.find('.contact-call-back-time').addClass('error');
                        el.find('.contact-call-back-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-call-back-time').removeClass('error');
                        el.find('.contact-call-back-time').next().removeClass('error');
                    }

                    /* Email
                    ----------------------------------------------------- */
                    if (response.match('error-email') !== null) {
                        el.find('.contact-email').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Subject
                    ----------------------------------------------------- */
                    if (response.match('error-subject') !== null) {
                        el.find('.contact-subject').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Message
                    ----------------------------------------------------- */
                    if (response.match('error-message') !== null) {
                        el.find('.contact-message').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Choose a car
                    ----------------------------------------------------- */
                    if (response.match('error-choose-car') !== null) {
                        el.find('.contact-choose-car').addClass('error');
                        el.find('.contact-choose-car').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-choose-car').removeClass('error');
                        el.find('.contact-choose-car').next().removeClass('error');
                    }

                    /* Pick-up Location
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-location') !== null) {
                        el.find('.contact-pickup-location').addClass('error');
                        el.find('.contact-pickup-location').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-location').removeClass('error');
                        el.find('.contact-pickup-location').next().removeClass('error');
                    }

                    /* Drop-off Location
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-location') !== null) {
                        el.find('.contact-dropoff-location').addClass('error');
                        el.find('.contact-dropoff-location').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-location').removeClass('error');
                        el.find('.contact-dropoff-location').next().removeClass('error');
                    }

                    /* Pick-up Date
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-date') !== null) {
                        el.find('.contact-pickup-date').addClass('error');
                        el.find('.contact-pickup-date').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-date').removeClass('error');
                        el.find('.contact-pickup-date').next().removeClass('error');
                    }

                    /* Pick-up Time
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-time') !== null) {
                        el.find('.contact-pickup-time').addClass('error');
                        el.find('.contact-pickup-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-time').removeClass('error');
                        el.find('.contact-pickup-time').next().removeClass('error');
                    }

                    /* Drop-off Date
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-date') !== null) {
                        el.find('.contact-dropoff-date').addClass('error');
                        el.find('.contact-dropoff-date').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-date').removeClass('error');
                        el.find('.contact-dropoff-date').next().removeClass('error');
                    }

                    /* Drop-off Time
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-time') !== null) {
                        el.find('.contact-dropoff-time').addClass('error');
                        el.find('.contact-dropoff-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-time').removeClass('error');
                        el.find('.contact-dropoff-time').next().removeClass('error');
                    }

                    /* Terms
                    ----------------------------------------------------- */
                    if (response.match('error-terms') !== null) {
                        el.find('.contact-terms').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Captcha
                    ----------------------------------------------------- */
                    if (response.match('error-captcha') !== null) {
                        el.find('button').removeClass('add-spin');
                    }

                    /* Success
                    --------------------------------------------------------- */
                    if (response.match('success-message') !== null) {

                        el.find('.gfort-recaptcha').remove();
                        el.find('.gfort-new-recaptcha').append('<div class="gfort-recaptcha" id="' + recaptchaID + '"></div>');
                        grecaptcha.render(recaptchaID, {sitekey: gfortRecaptchaSiteKey});

                        el.find('.form-control').val('').removeClass('input-filled');

                        el.find('button').removeClass('add-spin');

                        el.find('.contact-terms').attr('checked', false);
                        el.find('.contact-terms').attr('value', 'accepted');
                        el.find('.contact-terms').next().removeClass('error');
                    }

                });

                return false;

            });

            jQuery(this).find('.form-control').on('focus', function () {
                jQuery(this).next().removeClass('error');
                dismissFormMessagefn();
            });

        });
    }


    /* =========================================================================
    BMI Form
    ========================================================================= */
    if (jQuery('.bmi-form-block').length) {
        jQuery('.bmi-form-block form').each(function (index) {

            jQuery(this).attr('id', 'gfort-bmi-form-block-' + index);

            jQuery('#gfort-bmi-form-block-' + index).submit(function () {

                var el = jQuery(this),
                    formValues = el.serialize(),
                    formActionURL = el.attr('action');

                jQuery.post(formActionURL, formValues, function (response) {

                    /* Form Message
                    --------------------------------------------------------- */
                    if (!jQuery('.form-message-block').length) {
                        jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                    }
                    jQuery('.form-message-container').html(response);
                    jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});

                    /* Handle Errors
                    --------------------------------------------------------- */
                    if (response.match('error-weight') !== null) {
                        el.find('.bim-weight').next().addClass('error');
                    }
                    if (response.match('error-height') !== null) {
                        el.find('.bim-height').next().addClass('error');
                    }

                    /* Success
                    --------------------------------------------------------- */
                    if (response.match('success-message') !== null) {
                        el.find('.bim-weight').next().removeClass('error');
                        el.find('.bim-height').next().removeClass('error');
                        el.find('.bim-weight').val('').removeClass('input-filled');
                        el.find('.bim-height').val('').removeClass('input-filled');
                    }

                });

                return false;

            });

        });
    }


    /* =========================================================================
    Car Reservation Form
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortCar(elAttr, el) {
        jQuery.ajax({
            url: elAttr,
            error: function () {
                el.parents('.section-container').find('.car-block-container').html('Check car file location');
            },
            success: function (response) {

                var carContent = '';

                /* Car Image
                ------------------------------------------------------------- */
                if (response.carImageURL !== '') {
                    carContent += '<div class="image-block"><div class="image-block-container"><img src="' + response.carImageURL + '" alt="Image Block" /></div></div>';
                }

                /* Car Name
                ------------------------------------------------------------- */
                if (response.carName !== '') {
                    carContent += '<h4>' + response.carName + '</h4>';
                }

                /* Car Company
                ------------------------------------------------------------- */
                if (response.carCompany !== '') {
                    carContent += '<h5>' + response.carCompany + '</h5>';
                }

                /* Car Price
                ------------------------------------------------------------- */
                carContent += '<h2>';

                /* Currency
                --------------------------------------------------------- */
                if (response.carPriceCurrency !== '') {
                    carContent += '<span class="currency">' + response.carPriceCurrency + '</span>';
                }

                /* Amount
                --------------------------------------------------------- */
                if (response.carPriceAmount !== '') {
                    carContent += '<span class="amount">' + response.carPriceAmount + '</span>';
                }

                /* Duration
                --------------------------------------------------------- */
                if (response.carPriceDuration !== '') {
                    carContent += '<span class="duration">/' + response.carPriceDuration + '</span>';
                }

                carContent += '</h2>';

                /* Car Description
                ------------------------------------------------------------- */
                if (response.carDescription !== '') {
                    carContent += '<p>' + response.carDescription + '</p>';
                }

                /* Car Features
                ------------------------------------------------------------- */
                carContent += '<ul class="row">';

                /* Doors
                --------------------------------------------------------- */
                if (response.carDoors !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-car"></i>' + response.carDoors + ' Doors</li>';
                }

                /* Passengers
                --------------------------------------------------------- */
                if (response.carPassengers !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-male"></i>' + response.carPassengers + ' Passengers</li>';
                }

                /* Suitcase
                --------------------------------------------------------- */
                if (response.carSuitcase !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-suitcase"></i>' + response.carSuitcase + ' Suitcase(s)</li>';
                }

                /* Bag
                --------------------------------------------------------- */
                if (response.carBag !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-shopping-bag"></i>' + response.carBag + ' Bag(s)</li>';
                }

                /* Transmission
                --------------------------------------------------------- */
                if (response.carTransmission !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-sliders"></i>' + response.carTransmission + ' Transmission</li>';
                }

                /* Air Conditioning
                --------------------------------------------------------- */
                if (response.carAirConditioning !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-asterisk"></i>Air conditioning ' + response.carAirConditioning + '</li>';
                }

                carContent += '</ul>';

                el.parents('.section-container').find('.car-block-container').html(carContent);

            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-car-file]', function () {
        gfortCar(jQuery(this).attr('data-car-file'), jQuery(this));
    });


    /* =========================================================================
    Form Elements
    ========================================================================= */
    /* input
    ========================================================================= */
    jQuery('.form-control').each(function () {
        jQuery(this).on({
            focus: function () {
                jQuery(this).addClass('input-filled');
            },
            focusout: function () {
                if (jQuery(this).val() === '') {
                    jQuery(this).removeClass('input-filled');
                }
            }
        });
    });


    /* Checkbox
    ========================================================================= */
    if (jQuery('input[type="checkbox"]').length) {
        jQuery('input[type="checkbox"]').each(function (index) {
            jQuery(this).attr('id', 'gfort-checkbox-' + index);
            jQuery(this).next('label').attr('for', 'gfort-checkbox-' + index);
        });
    }


    /* Recaptcha
    ========================================================================= */
    if (jQuery('.gfort-recaptcha').length) {
        jQuery.getScript('https://www.google.com/recaptcha/api.js', function () {
            gfortRecaptchaSiteKey = recaptchaSiteKey;
        });
    }


    /* Select
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortSelectfn() {
        jQuery('select').each(function (index) {
            jQuery(this).attr('id', 'gfort-select-' + index);
            jQuery('#gfort-select-' + index).gfortSelect();

            /* Price
            ----------------------------------------------------------------- */
            if (jQuery('[selected][data-price-amount]').length) {
                jQuery('[selected][data-price-amount]').each(function () {
                    jQuery(this).parents('.pricing-block-price').find('.amount').html(jQuery(this).parent().find('.selected').attr('data-price-amount'));
                });
            }

            /* Car
            ----------------------------------------------------------------- */
            if (jQuery('[selected][data-car-file]').length) {
                jQuery('[selected][data-car-file]').each(function () {
                    gfortCar(jQuery(this).attr('data-car-file'), jQuery(this));
                });
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('select').length) {
        jQuery.getScript('js/plugins/gfortSelect.js', function () {
           gfortSelectfn(); 
        });
    }


    /* =========================================================================
    Video
    ========================================================================= */
    /* Background Video
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function backgroundVideofn() {
        jQuery('.background-video-block video').each(function () {

            var elWidth = 16,
                elHeight = 9,
                el = jQuery(this),
                elParent = el.parent(),
                parentWidth = elParent.outerWidth(true),
                parentHeight = elParent.outerHeight(true),
                widthRatio = parentWidth / elWidth,
                heightRatio = parentHeight / elHeight,
                ratio = widthRatio > heightRatio
                    ? widthRatio
                    : heightRatio,
                elNewWidth = ratio * elWidth,
                elNewHeight = ratio * elHeight,
                elMarginLeft = (elNewWidth - parentWidth) / -2,
                elMarginTop = (elNewHeight - parentHeight) / -2;

            el.css({
                width: elNewWidth,
                height: elNewHeight,
                marginTop: elMarginTop,
                marginLeft: elMarginLeft
            });

        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        backgroundVideofn();
    });

    /* Buttons
    ------------------------------------------------------------------------- */
    jQuery('.background-video-block').each(function (index) {

        var el = jQuery(this);
        el.find('video').attr('id', 'gfort-bg-video-' + index);

        if (el.find('video[autoplay]').length) {
            el.find('.video-overlayer').remove();
            el.find('button.play-button').html('<i class="fa fa-pause"></i>');
        } else {
            el.find('button.play-button').html('<i class="fa fa-play"></i>');
        }

        if (el.find('video[muted]').length) {
            el.find('button.mute-button').html('<i class="fa fa-volume-off"></i>');
        } else {
            el.find('button.mute-button').html('<i class="fa fa-volume-up"></i>');
        }

    });

    /* Play, Pause and Mute Buttons
    ------------------------------------------------------------------------- */
    jQuery('.background-video-block button').on('click', function () {

        var el = jQuery(this),
            videoOverlayer = el.parents('.background-video-block').find('.video-overlayer'),
            videoID = jQuery('#' + el.parents('.background-video-block').find('video').attr('id'))[0];

        if (el.hasClass('play-button')) {
            if (videoID.paused) {
                videoID.play();
                videoOverlayer.css({display: 'none'});
                el.html('<i class="fa fa-pause"></i>');
            } else {
                videoID.pause();
                el.html('<i class="fa fa-play"></i>');
            }
        }

        if (el.hasClass('mute-button')) {
            if (videoID.muted) {
                videoID.muted = false;
                el.html('<i class="fa fa-volume-up"></i>');
            } else {
                videoID.muted = true;
                el.html('<i class="fa fa-volume-off"></i>');
            }
        }

    });

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.background-video-block').length) {
        backgroundVideofn();
    }


    /* Normal Video
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFitVidfn() {
        jQuery('.video-block').fitVids();
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.video-block').length) {
        jQuery.getScript('js/plugins/fitvids/jquery.fitvids.min.js', function () {
            gfortFitVidfn();
        });
    }


    /* =========================================================================
    Fancybox
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFancyBoxfn() {
        jQuery('.fancybox').fancybox({
            nextEffect: 'none',
            prevEffect: 'none',
            openEffect: 'elastic',
            closeEffect: 'elastic',
            helpers: {
                title: {
                    type: 'inside'
                },
                media: {}
            },
            afterShow: function () {
                jQuery('<a href="javascript:void(0)" title="View Full Size" class="expander"></a>').appendTo(this.inner).on('click', function () {
                    jQuery.fancybox.toggle();
                });
            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.fancybox').length) {
        jQuery.getScript('css/plugins/fancybox/jquery.fancybox.pack.js', function () {
            jQuery.getScript('css/plugins/fancybox/helpers/jquery.fancybox-media.min.js', function () {
                gfortFancyBoxfn();
            });
        });
    }


    /* =========================================================================
    Share Buttons
    ========================================================================= */
    /* Facebook
    ------------------------------------------------------------------------- */
    if (jQuery('.facebook-btn-share').length) {
        jQuery('.facebook-btn-share').each(function () {
            jQuery(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);
        });
    }

    /* Twitter
    ------------------------------------------------------------------------- */
    if (jQuery('.twitter-btn-share').length) {
        jQuery('.twitter-btn-share').each(function () {
            jQuery(this).attr('href', 'https://twitter.com/home?status=' + window.location.href + ' ' + jQuery(document).find('title').text());
        });
    }

    /* Google Plus
    ------------------------------------------------------------------------- */
    if (jQuery('.google-btn-share').length) {
        jQuery('.google-btn-share').each(function () {
            jQuery(this).attr('href', 'https://plus.google.com/share?url=' + window.location.href);
        });
    }

    /* Current Page URL
    ------------------------------------------------------------------------- */
    if (jQuery('.page-link').length) {
        jQuery('.page-link').each(function () {
            jQuery(this).val(window.location.href);
        });
        jQuery('.page-link').on('click', function () {
            jQuery(this).select();
        });
    }


    /* =========================================================================
    Progress Bar
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortProgressfn() {
        jQuery('.progress-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-progress-bar-block-' + index);

            progressBarBlockArray[index] = new Waypoint({
                element: jQuery('#gfort-progress-bar-block-' + index),
                handler: function () {

                    var goalValue,
                        neededValue,
                        skillsValue,
                        currentValue,
                        percentValue,
                        el = jQuery(this.element);

                    /* Value ( Donate Progress Bar )
                    --------------------------------------------------------- */
                    if (el.find('.current-value').length) {

                        goalValue = el.find('.goal-value').text();
                        goalValue = goalValue.match(/(\d+)/g);
                        goalValue = parseInt(goalValue, 10);

                        currentValue = el.find('.current-value').text();
                        currentValue = currentValue.match(/(\d+)/g);
                        currentValue = parseInt(currentValue, 10);

                        percentValue = (currentValue / goalValue) * 100;
                        percentValue = parseInt(percentValue, 10);

                        /* Progress Bar Width
                        ------------------------------------------------- */
                        if (percentValue > 100) {
                            el.find('.progress-bar').css({width: '100%'});
                        } else {
                            el.find('.progress-bar').css({width: percentValue + '%'});
                        }

                        /* Start Value
                        ------------------------------------------------- */
                        el.find('.start-value').html(percentValue + '%');

                        /* Goal Value
                        ------------------------------------------------- */
                        el.find('.donate-value-goal h3').html(goalValue);

                        /* Collected Value
                        ------------------------------------------------- */
                        el.find('.donate-value-current h3').html(currentValue);

                        /* Percent
                        ------------------------------------------------- */
                        el.find('.donate-value-percent h3').html(percentValue + '%');

                        /* Needed Value
                        ------------------------------------------------- */
                        if (currentValue > goalValue) {
                            neededValue = 0;
                        } else {
                            neededValue = goalValue - currentValue;
                        }
                        el.find('.donate-value-needed h3').html(neededValue);

                        /* Donation Symbol Position
                        ------------------------------------------------- */
                        if (donationSymbolPosition === 'right') {
                            el.find('.goal-value').html(goalValue + donationSymbol);
                            el.find('.current-value').html(currentValue + donationSymbol);
                            el.find('.donate-value-goal h3').append(donationSymbol);
                            el.find('.donate-value-current h3').append(donationSymbol);
                            el.find('.donate-value-needed h3').append(donationSymbol);
                        } else {
                            el.find('.goal-value').html(donationSymbol + goalValue);
                            el.find('.current-value').html(donationSymbol + currentValue);
                            el.find('.donate-value-goal h3').prepend(donationSymbol);
                            el.find('.donate-value-current h3').prepend(donationSymbol);
                            el.find('.donate-value-needed h3').prepend(donationSymbol);
                        }

                        /* Goal Value
                        ------------------------------------------------- */
                        el.find('.goal-value').html(
                            el.find('.current-value').html() + ' of ' + el.find('.goal-value').html()
                        );

                    }

                    /* Percent ( Skills Progress Bar )
                    --------------------------------------------------------- */
                    if (el.find('.current-percent').length) {

                        skillsValue = el.find('.current-percent').text();
                        skillsValue = skillsValue.match(/(\d+)/g);
                        skillsValue = parseInt(skillsValue, 10);

                        if (skillsValue > 100) {
                            el.find('.progress-bar').css({width: '100%'});
                        } else {
                            el.find('.progress-bar').css({width: skillsValue + '%'});
                        }

                    }

                    progressBarBlockArray[index].destroy();

                },
                offset: '100%'
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.progress-block').length) {
        jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
            gfortProgressfn();
        });
    }


    /* =========================================================================
    Audio
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortAudiofn() {
        jQuery('audio').mediaelementplayer();
        jQuery('.audio-block').each(function () {

            var el = jQuery(this).find('source');

            if (el.attr('data-song-name')) {
                songDetails = el.attr('data-song-name');
                if (el.attr('data-author-name')) {
                    songDetails += ' By ';
                    songDetails += el.attr('data-author-name');
                }
                el.parents('.mejs-container').find('.mejs-controls').append('<h4>' + songDetails + '</h4>');
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('audio').length) {
        jQuery.getScript('js/plugins/mediaelement/js/mediaelement-and-player.min.js', function () {
            gfortAudiofn();
        });
    }


    /* =========================================================================
    Timer ( CountDown )
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortTimerfn() {
        jQuery('.timer-block').each(function () {

            var el = jQuery(this),
                yearTimer = el.attr('data-timer-year'),
                monthTimer = el.attr('data-timer-month'),
                dayTimer = el.attr('data-timer-day'),
                hourTimer = el.attr('data-timer-hour'),
                minTimer = el.attr('data-timer-min');

            el.downCount({
                date: monthTimer + '/' + dayTimer + '/' + yearTimer + ' ' + hourTimer + ':' + minTimer + ':' + '00',
                offset: localZoneTime
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.timer-block').length) {
        jQuery.getScript('js/plugins/downCount/jquery.downCount.min.js', function () {
            gfortTimerfn();
        });
    }


    /* =========================================================================
    Google Map
    ========================================================================= */
    /* Markers Function
    ------------------------------------------------------------------------- */
    function mapMarkersfn(currentMapIndex) {

        var mapMarkersLocation,
            mapJSONFileLocation = jQuery('#gfort-gmap-block-' + currentMapIndex).attr('data-marker-file-location');

        jQuery.ajax({
            url: mapJSONFileLocation,
            success: function (response) {

                mapMarkersLocation = response.locations;

                var mapMarkers = [],
                    infoWindowBox = [],
                    infoWindowContent,
                    infoWindowOptions,
                    infoWindowContentSwape;

                jQuery.each(mapMarkersLocation, function (index, response) {

                    mapMarkers[index] = new google.maps.Marker({
                        icon: response.markerImage,
                        position: new google.maps.LatLng(response.markerLocation[0], response.markerLocation[1])
                    });
                    mapMarkers[index].setMap(elCurrentMap[currentMapIndex]);

                    infoWindowContent = document.createElement('div');

                    if (response.URL === '') {
                        response.URL = '#';
                    }

                    /* Realestate infoWindow Content
                    --------------------------------------------------------- */
                    if (jQuery('#gfort-gmap-block-' + currentMapIndex).hasClass('realestate-gmap')) {

                        infoWindowContentSwape = '<div class="infoWindow-block-container"><a href="' + response.URL + '" title="' + response.title + '" class="main-link">';

                        if (response.image !== '') {
                            infoWindowContentSwape += '<div class="image-block"><div class="image-block-container"><img src="' + response.image + '" alt="' + response.title + '" /><div class="ribbon-block ribbon-block-style-2"><h4>' + response.status + '</h4></div><div class="ribbon-block ribbon-block-style-1 ribbon-bottom-right"><p>' + response.price + '</p></div></div></div><h4>' + response.title + '</h4><p>' + response.address + '</p></a></div>';
                        } else {
                            infoWindowContentSwape += '<h4>' + response.title + '</h4><p>' + response.address + '</p></a></div>';
                        }

                        infoWindowContent.innerHTML = infoWindowContentSwape;

                    }

                    /* Contact infoWindow Content
                    --------------------------------------------------------- */
                    if (jQuery('#gfort-gmap-block-' + currentMapIndex).hasClass('contact-gmap')) {

                        infoWindowContentSwape = '<div class="infoWindow-block-container"><a href="' + response.URL + '" title="' + response.title + '" class="main-link">';

                        if (response.image !== '') {
                            infoWindowContentSwape += '<div class="image-block"><div class="image-block-container"><img src="' + response.image + '" alt="' + response.title + '" /></div></div><h4>' + response.title + '</h4><p>' + response.description + '</p></a></div>';
                        } else {
                            infoWindowContentSwape += '<h4>' + response.title + '</h4><p>' + response.description + '</p></a></div>';
                        }

                        infoWindowContent.innerHTML = infoWindowContentSwape;

                    }

                    /* infoWindow Options
                    --------------------------------------------------------- */
                    infoWindowOptions = {
                        zIndex: 80,
                        maxWidth: 320,
                        alignBottom: true,
                        closeBoxMargin: '0',
                        disableAutoPan: false,
                        content: infoWindowContent,
                        enableEventPropagation: true,
                        boxClass: 'col-md-12 infoWindow-block',
                        pixelOffset: new google.maps.Size(-100, 0),
                        infoBoxClearance: new google.maps.Size(1, 1),
                        closeBoxURL: "js/plugins/infobox/close.png"
                    };

                    infoWindowBox[index] = new InfoBox(infoWindowOptions);

                    google.maps.event.addListener(mapMarkers[index], 'click', function () {
                        var i;
                        for (i = 0; i < mapMarkers.length; i += 1) {
                            infoWindowBox[i].close();
                        }
                        infoWindowBox[index].open(elCurrentMap[currentMapIndex], this);
                    });

                });

            }
        });

    }

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortGMapfn() {
        jQuery('.gmap-block').each(function (index) {

            var elMapOptions,
                el = jQuery(this),
                elUndefinedMarker,
                elndefinedMarkerimage,
                elJSONLoaction = el.attr('data-marker-file-location'),
                elMapLatLng = new google.maps.LatLng(el.attr('data-lat'), el.attr('data-lng'));

            el.attr('id', 'gfort-gmap-block-' + index);

            elMapOptions = {
                zoom: 16,
                panControl: false,
                scrollwheel: false,
                center: elMapLatLng,
                mapTypeControl: true
            };

            elCurrentMap[index] = new google.maps.Map(document.getElementById('gfort-gmap-block-' + index), elMapOptions);

            if (elJSONLoaction === undefined) {
                elndefinedMarkerimage = 'images/markers/marker-5.png';
                elUndefinedMarker = new google.maps.Marker({
                    position: elMapLatLng,
                    icon: elndefinedMarkerimage
                });
                elUndefinedMarker.setMap(elCurrentMap[index]);
            } else {
                mapMarkersfn(index);
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gmap-block').length) {
        jQuery.getScript('https://maps.google.com/maps/api/js?sensor=true', function () {
            jQuery.getScript('js/plugins/infobox/infobox_packed.js', function () {
                gfortGMapfn();
            });
        });
    }


    /* =========================================================================
    Background Portfolio Grid
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortBackgroundPortfoliofn() {
        jQuery('.background-portfolio-grid-container').each(function () {
            var imageWidthHeight = 800 / 600;
            jQuery(this).gridrotator({
                step: 1,
                rows: 3,
                columns: 4,
                interval: 1000,
                animSpeed: 1000,
                animType: 'fadeInOut',
                imageRatio: imageWidthHeight,
                w1024: {rows: 4, columns: 3},
                w768: {rows: 4, columns: 2},
                w480: {rows: 4, columns: 1},
                w320: {rows: 4, columns: 1},
                w240: {rows: 4, columns: 1}
            });
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.background-portfolio-grid').length) {
        jQuery.getScript('js/plugins/gridrotator/jquery.gridrotator.min.js', function () {
            gfortBackgroundPortfoliofn();
        });
    }


    /* =========================================================================
    Schedule Tabs
    ========================================================================= */
    if (jQuery('.schedule-tab-block').length) {
        jQuery('.schedule-tab-block').each(function () {

            var linkID,
                el = jQuery(this),
                currentDate = new Date(),
                getCurrentDay = scheduleWeekDay[currentDate.getDay()];

            el.find('.nav-tabs a').each(function () {
                jQuery(this).parent().removeClass('active');
                if (jQuery(this).text().toLowerCase() === getCurrentDay.toLowerCase()) {
                    jQuery(this).parent().addClass('active');
                    linkID = jQuery(this).attr('href').replace('#', '');
                }
            });

            el.find('.tab-content .tab-pane').each(function () {
                jQuery(this).removeClass('active');
                if (jQuery(this).attr('id').toLowerCase() === linkID.toLowerCase()) {
                    jQuery(this).addClass('active in');
                }
            });

        });
    }


    /* =========================================================================
    Events Table
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function eventsTablefn(currentEventsTable) {

        clearTimeout(eventsTableTimer);

        var currentTableEL = jQuery('#gfort-events-table-' + currentEventsTable);

        jQuery.ajax({
            url: currentTableEL.attr('data-events-file-location'),
            error: function () {
                currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>Failed to get the events check json file location</span></div>');
            },
            success: function (response) {

                var eventsTableList,
                    allEvents = response.allEvents;

                currentTableEL.find('.events-table-list .row').remove();
                eventsTableList = '<div class="row"><div class="events-table-list-container">';

                /* Get all events from JSON file
                ------------------------------------------------------------- */
                jQuery.each(allEvents, function (index, response) {

                    var eventDay = response.eventDay,
                        eventMonth = response.eventMonth,
                        eventYear = response.eventYear,
                        eventTime = response.eventTime,
                        eventTitle = response.eventTitle,
                        eventURL = response.eventURL;

                    index += 1;

                    eventsTableCurrentYear = parseInt(eventsTableCurrentYear, 10);
                    eventYear = parseInt(eventYear, 10);

                    eventsTableCurrentMonth = parseInt(eventsTableCurrentMonth, 10);
                    eventMonth = parseInt(eventMonth, 10);

                    if (eventsTableCurrentYear === eventYear) {
                        if (eventsTableCurrentMonth === eventMonth) {
                            currentTableEL.find('.ui-datepicker-calendar td a').each(function () {

                                if (jQuery(this).text() === eventDay) {

                                    totalEvents += 1;
                                    jQuery(this).addClass('has-event');

                                    eventsTableList += '<div class="content-block" data-event-day="' + eventDay + '">';

                                    eventsTableList += '<div class="content-block-container"><a href="' + eventURL + '" title="' + eventTitle + '" target="_blank"><h6>' + eventTitle + '</h6><div class="date-block"><div class="date-block-container"><span>' + eventDay + ' / ' + eventMonth + ' / ' + eventYear + '</span><span> - </span><span>' + eventTime + '</span></div></div></a></div>';

                                    eventsTableList += '</div>';

                                }

                            });
                        }
                    }

                });

                eventsTableList += '</div></div>';
                currentTableEL.find('.events-table-list').append(eventsTableList);

                /* Append Month badge
                ------------------------------------------------------------- */
                if (totalEvents === 1) {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>' + totalEvents + ' event</span></div>');
                } else if (totalEvents === 0) {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>No events this month</span></div>');
                } else {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>' + totalEvents + ' events</span></div>');
                }
                totalEvents = 0;

                /* Click on Month badge
                ------------------------------------------------------------- */
                jQuery('.gfort-events-month-badge span').on('click', function () {

                    delayTime = 0;

                    var eventsTableBlock = jQuery(this).parents('.events-table-block');
                    eventsTableBlock.find('.content-block').each(function () {
                        jQuery(this).hide().css({
                            top: '100px',
                            opacity: '0'
                        });
                    });
                    eventsTableBlock.find('.events-table-list').addClass('correct-position');
                    eventsTableBlock.find('.events-table-list-close').addClass('correct-position');
                    eventsTableBlock.find('.highlight-event-day').removeClass('highlight-event-day');

                    eventsTableTimer = setTimeout(function () {
                        eventsTableBlock.find('.content-block').each(function (index) {
                            jQuery(this).show().delay(delayTime).animate({
                                top: '0',
                                opacity: '1'
                            }, 400);
                            delayTime = (index + 1) * 100;
                        });
                    }, 300);

                });

            }
        });

    }

    /* Main Configuration
    ------------------------------------------------------------------------- */
    if (jQuery('.events-table-block').length) {
        eventsTableTimer = setTimeout(function () {
            jQuery('.events-table-block').each(function (index) {

                var el = jQuery(this);
                el.attr('id', 'gfort-events-table-' + index);

                /* Configuration
                ------------------------------------------------------------- */
                jQuery('#gfort-events-table-' + index).datepicker({
                    minDate: 'today',
                    nextText: 'Next',
                    prevText: 'Previous',
                    dateFormat: 'd/m/yy',
                    showOtherMonths: true,
                    hideIfNoPrevNext: true,
                    firstDay: eventsTableStartDay,
                    dayNamesMin: eventsTableWeekDay,
                    onSelect: function (dayDate, instant) {

                        instant.inline = false;

                        dayDate = jQuery(this).datepicker('getDate');
                        var selectedDay = dayDate.getDate();

                        el.find('.highlight-event-day').removeClass('highlight-event-day');
                        if (el.find('a').hasClass('ui-state-hover')) {
                            jQuery('.ui-state-hover').addClass('highlight-event-day');
                        }

                        /* Events
                        ----------------------------------------------------- */
                        el.find('.events-table-list-container .content-block').each(function () {
                            jQuery(this).hide().css({
                                top: '100px',
                                opacity: '0'
                            });
                        });

                        if (el.find('a.has-event').hasClass('highlight-event-day')) {

                            el.find('.events-table-list').addClass('correct-position');
                            el.find('.events-table-list-close').addClass('correct-position');

                            eventsTableTimer = setTimeout(function () {

                                el.find('.content-block[data-event-day="' + selectedDay + '"]').each(function (index) {
                                    jQuery(this).show().delay(delayTime).animate({
                                        top: '0',
                                        opacity: '1'
                                    }, 400);
                                    delayTime = (index + 1) * 100;
                                });

                            }, 300);

                        } else {

                            el.find('.events-table-list').removeClass('correct-position');
                            el.find('.events-table-list-close').removeClass('correct-position');

                        }

                        delayTime = 0;

                    },
                    onChangeMonthYear: function (currentYearDate, currentMonthDate) {

                        el.find('.events-table-list.correct-position').removeClass('correct-position');
                        el.find('.events-table-list-close.correct-position').removeClass('correct-position');
                        eventsTableCurrentYear = currentYearDate;
                        eventsTableCurrentMonth = currentMonthDate;
                        eventsTablefn(index);

                    }
                });

                jQuery('> div.ui-datepicker', el).wrap('<div class="events-table-block-container"></div>');
                jQuery('> div.events-table-block-container', el).append('<div class="events-table-list"></div>');
                jQuery('> div.events-table-block-container', el).append('<div class="events-table-list-close"><i class="fa fa-times"></i></div>');

                eventsTableCurrentMonth = el.datepicker('getDate').getMonth() + 1;
                eventsTableCurrentYear = el.datepicker('getDate').getFullYear();

                eventsTablefn(index);

            });
        }, 300);
    }

    /* Close Events List
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.events-table-list-close', function () {
        jQuery(this).removeClass('correct-position');
        jQuery(this).parent().find('.events-table-list').removeClass('correct-position');
        jQuery(this).parent().find('.highlight-event-day').removeClass('highlight-event-day');
    });


    /* =========================================================================
    Date Picker
    ========================================================================= */
    if (jQuery('.date-picker').length) {
        jQuery('.date-picker').datepicker({
            minDate: 'today',
            nextText: 'Next',
            prevText: 'Previous',
            dateFormat: 'dd/mm/yy',
            showOtherMonths: true,
            hideIfNoPrevNext: true,
            beforeShow: function () {
                jQuery('#ui-datepicker-div').appendTo(jQuery(this).parent());
            },
            onSelect: function () {
                jQuery(this).parent().find('.date-picker').addClass('input-filled');
            }
        });
    }


    /* =========================================================================
    Filter
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortIsotopefn() {
        jQuery('body').on('click', '[data-filter]', function () {

            var el = jQuery(this),
                filterItemsWrapper,
                filterGroupValue = '',
                filterValue = el.attr('data-filter');

            el.parents('.filter-group').attr('data-filter-group', filterValue);
            el.parents('.filter-block').find('.filter-group').each(function () {
                filterGroupValue += jQuery(this).attr('data-filter-group');
            });

            filterItemsWrapper = el.parents('.filter-section').find('.filter-items-wrapper').attr('id');
            jQuery('#' + filterItemsWrapper).isotope({
                filter: filterGroupValue
            });

        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.filter-items-wrapper').length) {
        jQuery.getScript('js/plugins/isotope/isotope.pkgd.min.js', function () {
            gfortIsotopefn();
        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        if (jQuery('.filter-items-wrapper').length) {
            jQuery('.filter-items-wrapper').each(function () {
                jQuery('#' + jQuery(this).attr('id')).isotope('layout');
            });
        }
    });


    /* =========================================================================
    Portfolio PhotoStack
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortPhotoStackfn() {
        jQuery('.photostack-block').each(function (index) {
            jQuery(this).attr('id', 'gfort-photostack-block-' + index);
            var portfolioStack = document.getElementById('gfort-photostack-block-' + index);
            portfolioStack = new Photostack(portfolioStack);
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.photostack-block').length) {
        jQuery.getScript('js/plugins/photostack/classie.min.js', function () {
            jQuery.getScript('js/plugins/photostack/photostack.min.js', function () {
                gfortPhotoStackfn();
            });
        });
    }


    /* =========================================================================
    tooltip
    ========================================================================= */
    jQuery('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });


    /* =========================================================================
    popover
    ========================================================================= */
    /* Team Block
    ------------------------------------------------------------------------- */
    jQuery('a.team-popover').popover({
        html: true,
        container: 'body',
        template: '<div class="popover team-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });

    /* General
    ------------------------------------------------------------------------- */
    jQuery('[data-toggle="popover"]').popover({
        html: true,
        container: 'body'
    });


    /* =========================================================================
    Pricing Table
    ========================================================================= */
    /* Select
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-price-amount]', function () {
        jQuery(this).parents('.pricing-block-price').find('.amount').html(jQuery(this).attr('data-price-amount'));
    });

    /* Wide
    ------------------------------------------------------------------------- */
    if (jQuery('.pricing-block.wide-block').length) {
        jQuery('.pricing-block.wide-block').each(function () {
            jQuery(this).parent('.pricing-tables-wrapper').addClass('correct-border');
        });
    }


    /* =========================================================================
    Instagram
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortInstafn() {
        jQuery('.instagram-feed-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-instagram-feed-block-' + index);

            jQuery('#gfort-instagram-feed-block-' + index).gfortInsta({
                limit: 8,
                userID: instagramUserID,
                accessToken: instagramAccessToken
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.instagram-feed-block').length) {
        jQuery.getScript('js/plugins/gfortInsta/gfortInsta.min.js', function () {
            gfortInstafn();
        });
    }


    /* =========================================================================
    Flickr Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortFlickrfn() {
        jQuery('.flickr-feed-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-flickr-feed-block-' + index);

            jQuery('#gfort-flickr-feed-block-' + index).jflickrfeed({
                limit: 8,
                qstrings: {
                    id: flickrUserID
                },
                itemTemplate: '<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_q}}" alt="{{title}}" /></a>'
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.flickr-feed-block').length) {
        jQuery.getScript('js/plugins/flickr/jflickrfeed.min.js', function () {
            gfortFlickrfn();
        });
    }


    /* =========================================================================
    Twitter Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortTwitterfn() {
        jQuery('.twitter-feed-block').twittie({
            count: 2,
            dateFormat: '%d %b %Y',
            username: 'graphicfort',
            loadingText: 'Loading ...',
            apiPath: 'js/plugins/tweetie/api/tweet.php',
            template: '<div class="twitter-avatar"><a href="https://twitter.com/{{user_name}}" title="{{user_name}}" target="_blank">{{avatar}}</a><span><a href="https://twitter.com/{{user_name}}" title="{{user_name}}" target="_blank">@{{user_name}}</a></span></div><div class="twitter-tweet"><p>{{tweet}}</p></div><div class="twitter-date-buttons"><div class="twitter-date"><a href="{{url}}" target="_blank">{{date}}</a></div><div class="twitter-buttons"><a href="https://twitter.com/intent/tweet?in_reply_to={{tweet_id}}" title="Reply" target="_blank"><i class="fa fa-reply"></i><span>Reply</span></a><a href="https://twitter.com/intent/retweet?tweet_id={{tweet_id}}" title="Retweet" target="_blank"><i class="fa fa-retweet"></i><span>Retweet</span></a><a href="https://twitter.com/intent/favorite?tweet_id={{tweet_id}}" title="Favourite" target="_blank"><i class="fa fa-star"></i><span>Favourite</span></a></div></div><div class="twitter-follow"><a href="https://twitter.com/intent/follow?original_referer=&screen_name=graphicfort" target="_blank" class="btn btn-gfort wave-effect"><i class="fa fa-twitter"></i><span>Follow</span></a></div>'
        }, function () {

            /* Slider
            ----------------------------------------------------------------- */
            if (jQuery('.twitter-feed-block').hasClass('twitter-slider')) {

                jQuery('.twitter-slider').each(function (index) {

                    var el = jQuery(this);
                    el.attr('id', 'gfort-twitter-slider-' + index);

                    /* Replace ul and li with slider divs
                    --------------------------------------------------------- */
                    el.find('ul.gfort-twitter-list').wrap('<div class="swiper-wrapper"/>').contents().unwrap();
                    el.find('li.gfort-twitter-item').each(function () {
                        jQuery(this).wrap('<div class="swiper-slide"><div class="gfort-twitter-item"></div></div>').contents().unwrap();
                    });

                    /* Pagination
                    --------------------------------------------------------- */
                    el.append('<div class="swiper-pagination" id="gfort-twitter-swiper-pagination-' + index + '"></div>');

                    /* Slider Configurations
                    --------------------------------------------------------- */
                    jQuery('#gfort-twitter-slider-' + index).swiper({
                        loop: true,
                        speed: 800,
                        autoplay: 5000,
                        effect: 'slide',
                        slidesPerView: 1,
                        grabCursor: false,
                        simulateTouch: false,
                        centeredSlides: false,
                        direction: 'horizontal',
                        paginationClickable: true,
                        autoplayDisableOnInteraction: false,
                        pagination: '#gfort-twitter-swiper-pagination-' + index
                    });

                    /* Hover
                    ----------------------------------------------------------------- */
                    jQuery('#gfort-twitter-slider-' + index).on({
                        mouseenter: function () {
                            jQuery(this)[0].swiper.stopAutoplay();
                        },
                        mouseleave: function () {
                            jQuery(this)[0].swiper.startAutoplay();
                        }
                    });

                });

            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.twitter-feed-block').length) {
        jQuery.getScript('js/plugins/tweetie/tweetie.js', function () {
            if (jQuery('.twitter-feed-block').hasClass('twitter-slider')) {
                jQuery.getScript('css/plugins/swiper/js/swiper.min.js');
            }
            gfortTwitterfn();
        });
    }


    /* =========================================================================
    Blocks Height
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortMatchHeightfn() {

        jQuery('.content-block:not(.content-block-style-2)').each(function () {
            jQuery(this).parent().find('.content-block-container').matchHeight();
        });

        jQuery('.event-block').each(function () {
            jQuery(this).parent().find('.event-block-container').matchHeight();
        });

        jQuery('.audio-block').each(function () {
            jQuery(this).parent().find('.audio-block-container').matchHeight();
        });

        jQuery('.team-block').each(function () {
            jQuery(this).parent().find('.team-block-container').matchHeight();
        });

        jQuery('.portfolio-block:not(.isotope-item)').each(function () {
            jQuery(this).parent().find('.portfolio-block-container').matchHeight();
        });

        jQuery('.client-block').each(function () {
            jQuery(this).parent().find('.client-block-container').matchHeight();
        });

        jQuery('.testimonials-block').each(function () {
            jQuery(this).parent().find('.testimonials-block-container').matchHeight();
        });

        jQuery('.pricing-block').each(function () {
            jQuery(this).parent().find('.pricing-block-container').matchHeight();
        });

        jQuery('.counter-block').each(function () {
            jQuery(this).parent().find('.counter-block-container').matchHeight();
        });

        jQuery('.faq-block').each(function () {
            jQuery(this).parent().find('.faq-block-container').matchHeight();
        });

        jQuery('.contact-block').each(function () {
            jQuery(this).parent().find('.contact-block-container').matchHeight();
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (blocksAtSameHeight === true) {
        jQuery.getScript('js/plugins/jquery.matchHeight.js', function () {
          gfortMatchHeightfn();      
        });
      
    }


    /* =========================================================================
    Smooth Scroll
    ========================================================================= */
    if (pageSmoothScroll === true) {
        jQuery.getScript('js/plugins/smoothscroll/smoothscroll.min.js');
    }


    /* =========================================================================
    Parallax Effect
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function parallaxEffectfn(parallaxEffect) {
        jQuery('.parallax-effect').each(function () {

            var el = jQuery(this),
                elImage = jQuery('> img', el),
                elHeight = el.outerHeight(true),
                scrollTop = jQuery(window).scrollTop(),
                elOffsetBottom = el.offset().top + elHeight,
                windowHeight = jQuery(window).outerHeight(true),
                parallaxPixel = (el.offset().top - scrollTop) * 0.30,
                differenceHeight = elImage.outerHeight(true) - elHeight;

            if (parallaxEffect !== false) {
                elImage.css({top: -differenceHeight / 2});
            }

            if ((elOffsetBottom > scrollTop) && (el.offset().top < (scrollTop + windowHeight))) {
                elImage.css({transform: 'translate(-50%,' + -parallaxPixel + 'px)'});
            }

        });
    }


    /* =========================================================================
    Check if it's a Mobile Device
    ========================================================================= */
    if (jQuery.browser.mobile) {

        /* Remove Transition From Links
        --------------------------------------------------------------------- */
        jQuery('a').each(function () {
            jQuery(this).addClass('no-transition');
        });

    } else {

        /* Transition Between Pages
        --------------------------------------------------------------------- */
        jQuery('#main-wrapper').css({
            opacity: '1'
        });

        /* Parallax Effect ( Condition )
        --------------------------------------------------------------------- */
        if (parallaxEffect === true) {
            jQuery(window).scroll(function () {
                parallaxEffectfn(false);
            });
            parallaxEffectfn();
        }

    }

});




/* =============================================================================
Window Load Function
============================================================================= */
jQuery(window).load(function () {

    'use strict';

    var filterItemsWrapper;


    /* =========================================================================
    Loader Block
    ========================================================================= */
    jQuery('.loader-block').fadeOut(300);


    /* =========================================================================
    Slider Height
    ========================================================================= */
    jQuery('.swiper-container-horizontal').each(function () {
        var el = jQuery(this);
        el.css({height: '100%'});
        el.css({height: el.find('.swiper-wrapper').outerHeight(true)});
        if (el.height() === 0 || el.height() < 21) {
            el.css({height: '100%'});
        }
    });


    /* =========================================================================
    Recaptcha
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortRecaptcha() {
        jQuery('.gfort-recaptcha').each(function (index) {
            jQuery(this).attr('id', 'g-recaptcha-' + index);
            grecaptcha.render('g-recaptcha-' + index, {sitekey: gfortRecaptchaSiteKey});
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-recaptcha').length) {
        gfortRecaptcha();
    }


    /* =========================================================================
    Filter
    ========================================================================= */
    if (jQuery('.filter-section').length) {
        jQuery.getScript('js/plugins/isotope/isotope.pkgd.min.js', function () {
            jQuery('.filter-section').each(function (index) {

                var filterValue = '',
                    el = jQuery(this);

                el.find('.filter-group').each(function () {
                    filterValue += jQuery(this).attr('data-filter-group');
                });

                el.find('.filter-items-wrapper').attr('id', 'filter-items-wrapper-' + index);
                filterItemsWrapper = jQuery('#filter-items-wrapper-' + index);
                filterItemsWrapper.isotope({
                    filter: filterValue,
                    layoutMode: 'masonry',
                    itemSelector: '.isotope-item'
                });

                el.find('.wide-block').parents('.filter-items-wrapper').addClass('correct-position');

            });
        });
    }


});
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-csstransforms3d-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.backgroundsize=function(){return F("backgroundSize")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);