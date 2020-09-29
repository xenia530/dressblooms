window.jQuery = window.$ = jQuery;
var Engo_Custom = {
    start: function() {
        "use strict";
        this.init_library();
        this.niceScrollInit();
        this.engoMenus.start();
        this.toggleActions();
        this.gridMasonry();
        this.iconBoxElements.start();
        this.scrollFixed.start();

    },
    init_library: function() {
        "use strict";
        //SELECT CHOSEN
        $("select").chosen();
    },
    niceScrollInit: function() {
        "use strict";
        $('.toggle-header > div.nr-search-head, .toggle-header > div.nr-mainmenu, .toggle-header > div.nr-cart-header').niceScroll({
            cursorborder:"1px solid #6b6b6b",
            cursorcolor:'#6b6b6b',
            horizrailenabled:false
        });
        $('.header-v1 .toggle-header > div.nr-account').niceScroll({
            cursorborder:"",
            cursorcolor:'#cccccc',
            horizrailenabled:false
        });
        $('.header-v2 .toggle-header > div.nr-account').niceScroll({
            cursorborder:"",
            cursorcolor:'#6b6b6b',
            horizrailenabled:false
        });
    },
    engoMenus: {
        start: function() {
            "use strict";
            this.verticalToggleMenu();
        },
        verticalToggleMenu: function() {
            "use strict";
            $('.toggle-dropdown-menu ul li.item-toggle-dropdown').each(function(){
                if ($(this).find('.item-toggle-menu').length > 0) {
                    $(this).append('<i class="toggle-button fa fa-angle-right"></i>');
                }
                $(this).find('.item-toggle-menu').slideUp('fast');
                $(this).children('a').on("click",function(e){
                    e.preventDefault();
                     $(this).parent().find('.item-toggle-menu').toggle('Show');
                     $(this).parent().find('.toggle-button').toggleClass('opened');
                });
            });
        }
    },
    toggleActions: function() {
        "use strict";
        //TOGOLE LOGIN -checkout
        $('.showlogin').on('click',function(){
            $('.login').slideToggle("");
            $(this).toggleClass('active');
        });
        //TOGOLE showcoupon-checkout
        $('.showcoupon').on('click',function(){
            $('.checkout_coupon').slideToggle("");
            $(this).toggleClass('active');
        });
        // DISABLE CLICK CLASS
        $('.disable-click').on('click', function(e){
            e.preventDefault();
            return false;
        });
    },
    gridMasonry: function() {
        $('.grid-masonry').each(function() {
            var $isotopGrid = $(this);
            var layout_mode = $isotopGrid.attr('data-layoutmode');
            // Re-layout after images loaded
            $isotopGrid.isotope({
                resizable: false,
                itemSelector : '.grid',
                layoutMode: layout_mode,
                transitionDuration: '0.6s',
                packery: {
                    gutter: 0
                },
            }).isotope( 'layout' );
        });
    },
    iconBoxElements: {
        start: function() {
            this.style2();
        },
        style2: function() {
            "use strict";
            var ts_icon_box = $('.ts-icon-boxes.iconbox-style2');
            var box_shadow_color = $(this).attr('data-hover-box-shadow-color');
            $(ts_icon_box).on('mouseover',function(){
                $(this).find('.icon').css({
                    'box-shadow' : '0 0 0 8px ' + box_shadow_color
                });
            });
            $(ts_icon_box).on('mouseout', function(){
                $(this).find('.icon').css({
                    'box-shadow' : ''
                });
            });
        }
    },
    scrollFixed: {
        start: function() {
            this.setScroll();
        },
        setScroll: function() {
            "use strict";
            // Fixed header
            var self = this;
            $(window).scroll(function(){ // scroll-down-fixed
                var scroll = self.no_get_current_scroll();
                if (scroll > 100){
                    $('header.scroll-down-fixed').addClass('fixed');
                }
                else{
                    $('header.scroll-down-fixed').removeClass('fixed');
                }
            });
        },
        no_get_current_scroll: function() {
                return window.pageYOffset || document.documentElement.scrollTop;
        }
    }
}
jQuery(document).ready(function($){
    Engo_Custom.start();
});