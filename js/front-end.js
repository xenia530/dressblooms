window.jQuery = window.$ = jQuery;
var Engo_Frontend = {
    start: function() {
        "use strict";
        this.owlCarouselInit();
        this.shortCodeCat();
        this.buttonActions();
        this.scroolToInit.start();
        this.aboutSectionFix();
        this.ecommerce.start();
        // this.fullHeightInit.start();
        this.masonryBlogInit.start();
        this.backToTopButton();

    },
    owlCarouselInit: function() {
        "use strict";
        //SLIDE PRODUCT
        var ts_slide_product    = $('.ts-slide-product'),
            ts_infoproduct      = $('.ts-infoproduct .images'),
            ts_slide_post       = $('.ts-slide-post'),
            ts_slide_features   = $('.ts-slide-features'),
            ts_post_slide       = $('.ts-post-slide');
        if(ts_slide_product.length > 0){
            ts_slide_product.owlCarousel({
                items: 1,
                dots: true,
                nav: false,
                autoplay:true
            });
        }

        //SLIDE IMAGE PRODUCT
        $(".quickview-detail").css({"display":"block"});
        if(ts_infoproduct.length > 0){
            ts_infoproduct.owlCarousel({
                loop:true,
                items: 1,
                dots: true,
                nav: true,
                autoplay:true,
                navText: ['<span class="icon icon-arrows-slim-left"></span>','<span class="icon icon-arrows-slim-right"></span>']
            });
        }
        $(".quickview-detail").css({"display":"none"});

        //SLIDE POST
        if(ts_slide_post.length > 0){
            ts_slide_post.each(function(){
                $(this).owlCarousel({
                    items: 3,
                    dots: true,
                    nav: false,
                    autoplay:true,
                    margin:30,
                    responsive:{
                    0:{
                        items:1,
                    },
                    480:{
                        items:1,
                    },
                    768:{
                        items:2,
                    },
                    991:{
                        items:3,
                    },
                }
                });
            });
        }

        //Slide feature
        ts_slide_features.each(function(){
            $(this).owlCarousel({
                loop:true,
                nav: false,
                dots:true,
                margin: 0,
                autoplay:true,
                responsiveClass: false,
                responsive:{
                    0:{
                        items:1
                    },
                    480:{
                        items:1
                    },
                    768:{
                        items:1
                    },
                    992:{
                        items:1
                    }
                }
            })
        });

        //POST SLIDE
        if(ts_post_slide.length > 0){
            // Remove unwanted html
            $('.noren-remove-inner-content').remove();
            ts_post_slide.owlCarousel({
                loop:true,
                items: 1,
                dots: true,
                nav: true,
                autoplay:true,
                navText: ['<span class="icon icon-arrows-slim-left"></span>','<span class="icon icon-arrows-slim-right"></span>']
            });
        }
    },
    shortCodeCat: function() {
        "use strict";
        //Height Cat title
        var ts_shortcode_cat = $('.ts-shortcode-category');
        ts_shortcode_cat.each(function(){
            var heightItem = $(this).find('.product-column1 .product-item').outerHeight();
            $(this).find('.product-catinfo').css("height",heightItem);
        });
        $(window).on("debouncedresize", function() {
            ts_shortcode_cat.each(function(){
                var heightItem = $(this).find('.product-column1 .product-item').outerHeight();
                $(this).find('.product-catinfo').css("height",heightItem);
            })
        });
    },
    buttonActions: function() {
        "use strict";
        //BUTTON TOGOLE (Login, search, mainmenu, shopping cart)
        $('.button-toggle').on("click",function(e){
            var $this = $(this);
            var toogleId = $this.attr('data-toggle');

            //if ( noren['is_mobile'] != 'false' && toogleId == 'nr-mainmenu' ) {
            //    alert('Touch open main menu');
            //}

            if ( $('#' + toogleId).is(':hidden') ) {
                $('.header .showing').removeClass('showing').addClass('just-hidden');
                $('#' + toogleId).addClass('showing').removeClass('just-hidden').slideDown(300);
                $('.header .just-hidden').fadeOut(300);
                $('.button-toggle').removeClass('active');
                $this.addClass('active');
                if ($this.is('.toggle-searchform')) {
                    $('#' + toogleId).find('.search').focus();
                }
            }
            else{
                $('#' + toogleId).removeClass('showing').addClass('just-hidden').slideUp(300);
                $this.removeClass('active');
            }
            e.preventDefault();
        });

        //TOGOLE LOGIN & REGISTER
        $('.ts-my-account .ts-togoleform').on("click",function(e){
            var formId = $(this).attr('href');
            $(this).closest('.ts-my-account-form').removeClass('show slide');
            $(formId).addClass('show slide');
            e.preventDefault();
        });

    },
    scroolToInit : {
        start: function() {
            var self = this;
            $(window).load(function(){
                $(window).scroll(function(){
                    var scroll = self.getCurrentScroll();
                    if(scroll > 10){
                        if ( !$('.nr-mainmenu').is(':hover') || self.no_is_elem_scroll_bottom($('.nr-mainmenu')) ) {
                            $('.button-toggle').removeClass('active');
                            $('.header .toggle-header > div').fadeOut(300);
                        }
                    }
                });
            });
        },
        no_is_elem_scroll_bottom : function ($elem) {
            //console.log($elem.scrollTop());
            //console.log($elem.innerHeight());
            //console.log($elem[0].scrollHeight);
            if ($elem.scrollTop() + $elem.innerHeight() >= $elem[0].scrollHeight) {
                return true;
            }
            return false;
        },
        getCurrentScroll : function() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }

    },
    aboutSectionFix: function() {
        "use strict";
        //HEIGHT ABOUT SECTION
        var about_section = $('.section-about');
        about_section.each(function(){
            var heightL = $(this).find('.left-section').outerHeight();
            $(this).find('.right-section').css('height',heightL);
        });
        $(window).on("debouncedresize", function() {
            setTimeout(function(){
                about_section.each(function(){
                    var heightL = $(this).find('.left-section').outerHeight();1
                    $(this).find('.right-section').css('height',heightL);
                })
            }, 201);
        });
    },
    ecommerce: {
        start: function() {
            this.widgetPriceFillter();
            this.accordionTab();
        },
        widgetPriceFillter: function() {
            "use strict";
            //SLIDE PRICE WIDGET
            $('.price_slider_wrapper').each(function(){
                var _min = $(this).find('.price_slider_amount input#min_price').data('min');
                var _max = $(this).find('.price_slider_amount input#max_price').data('max');

                $(this).find( ".price_slider" ).slider({
                  range: true,
                  min: _min,
                  max: _max,
                  values: [ 30, 3450 ],
                  slide: function( event, ui ) {
                    $( ".price_label .from" ).text( "$" + ui.values[ 0 ]);
                    $( ".price_label .to" ).text( "$" + ui.values[ 1 ] );
                  }
                });
                $(this).find( ".price_label .from" ).text( "$" + $( ".price_slider" ).slider( "values", 0 ));
                $(this).find( ".price_label .to" ).text( "$" + $( ".price_slider" ).slider( "values", 1 ));
            });
        },
        accordionTab: function() {
            //ACORDION SINGLE PRODUCT
            var accordion_tab = $('.woocommerce-tab-accordion');
            if (accordion_tab.length){
                accordion_tab.each(function(){
                    var $this = $(this);
                    var active_panel = parseInt($this.attr('data-active_panel'));
                    $this.accordion({
                        collapsible: true,
                        header: "h6.tab-title",
                        active:active_panel,
                        heightStyle:"content"
                    });
                });
            }
        }
    },
    // fullHeightInit: {
    //     start: function() {
    //         this.fullHeight();
    //         $(window).on("debouncedresize", function() {
    //             this.fullHeight();
    //         });
    //     },
    //     fullHeight: function() {
    //         var window_h = $(window).height();
    //         var window_w = $(window).width();
    //         var header_h = $('header').outerHeight();
    //         // var wpadminbar_h = 0;
    //         var full_h = window_h - header_h - 60;
    //         var elementToFullH = $('.fullheight');
    //         elementToFullH.css('height', full_h);
    //          if (window_w < 768 ) {
    //             var full_h = window_h - header_h - 40;
    //             elementToFullH.css('height', full_h);
    //         }
    //     }
    // },
    masonryBlogInit: {
        start: function () {
            "use strict";
            this.noren_masonry();
            this.masonryLoadMore();
            // $(window).resize(function(){
            //     this.noren_masonry();
            // });

            // $(window).load(function(){
            //     $('.posts-masonry').removeClass('processing-masonry');
            //     this.noren_masonry();
            // });
        },
        // Init masonry blog
        noren_masonry: function() {
            "use strict";
            $('.posts-masonry').each(function(){
                var masonryGrid = $(this);
                if ( masonryGrid.hasClass('processing-masonry') ) {
                    return false;
                }
                masonryGrid.addClass('processing-masonry');
                masonryGrid.masonry({
                    // options
                    itemSelector: '.type-post',
                }).on('layoutComplete', function(){
                    masonryGrid.removeClass('processing-masonry');
                });
            });
        },
        masonryLoadMore: function() {
            "use strict";
            $('.blog-masonry-loadmore-btn').on('click', function(e){
                var $this = $(this);
                if ($this.hasClass('locked') || $this.hasClass('no-more-post')) {
                    return false;
                }

                var masonryContainer = $this.closest('.masonry-container');
                var masonryGrid = masonryContainer.find('.posts-masonry');
                var except_post_ids = Array();
                masonryGrid.find('.type-post').each(function(){
                    var post_id = $(this).attr('id').replace('post-', '');
                    except_post_ids.push(post_id);
                });
                var sidebar_pos = $this.attr(' data-sidebar-pos');
                $this.addClass('locked').html('Loading...');

                var data = {
                    action: 'noren_loadmore_masonry_via_ajax',
                    except_post_ids: except_post_ids,
                    sidebar_pos: sidebar_pos
                };

                $.post(ajaxurl, data, function(response){
                    var items = [];
                    $.each(response['items'], function( index, item_html ) {
                        var $elem = $(item_html);
                        masonryGrid.append( $elem ).masonry( 'appended', $elem );

                    });
                    // layout Masonry after each image loads
                    masonryGrid.imagesLoaded().progress( function() {
                        masonryGrid.masonry('layout');
                    });
                    $this.removeClass('locked').html(response['load_more_text']);
                    if ( response['nomore_post'] == 'yes' ) {
                        $this.addClass('no-more-post');
                    }
                    //console.log(response);
                });
                e.preventDefault();
            });
        }
    },
    backToTopButton: function() {
        //BACK TO TOP
        $('.backtotop').on('click',function(){
            $('html,body').animate({scrollTop : 0},800);
            return false;
        });
    }

}

jQuery(document).ready(function($){
    Engo_Frontend.start();
});
