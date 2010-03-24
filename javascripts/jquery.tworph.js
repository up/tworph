/*
 * 	twzoom 0.3 - jQuery plugin
 *  inspired by tiddlywikis incredible tiddler appear effect 
 *  (a combination of morph, zoom and slide)
 * 
 *	http://ulipreuss.eu/jquery-plugin-twzoom/
 *	Copyright (c) 2010 Uli Preuss (http://ulipreuss.eu)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

 (function($) { 
    $.fn.tworph = function(param) {

        var settings = {
            opacity: '0.5',
            scrollbars: {
                hide: true
            },
            duration: 250,
            overlay: {
                opacity: '0.5',
                background: '#666'
            },
            fontsize: {
                start: '0.1em'
            }        
        };

        var d = { r: false, o: null, l: null, t: null };
        settings.overlay.running = false;
        
        $(this)
            .append('<' + 'div class="tworph_header"><span id="tworph_title"></span><' + '/div>')
            .append('<' + 'span class="mc_' + $(this).attr('id') + ' tworph_close" title="close"><' + '/span>')
            .css('fontSize', settings.fontsize.start);

        var _self = $(this);
        
        if(param.title) {
          $('#tworph_title').html(param.title);     
        }

        var width, height;     

        if(param.fullscreen && param.fullscreen === true) {
          width = (parseInt($(window).width(), 10) - 200) + 'px';
          height = (parseInt($(window).height(), 10) - 110) + 'px';     
        }
        else {
          width = param.width;
          height = param.height;          
        }

        $(param.buttons + ', .mc_' + $(this).attr('id')).click(function() {

            twoggle({
                id: _self,
                width: width,
                height: height,
                left: $(this).position().left,
                top: $(this).position().top,
                fontsize: param.fontsize,
                caller: $(this)
            });

        });

        var twoggle = function(param) {

            if (d.r === false) {
                d.t = Math.round(param.top);
                d.l = Math.round(param.left);
                $(param.id).css({
                    top: d.t + 'px',
                    left: d.l + 'px'
                });
                d.r = true;
            }
            else {
                d.r = false;
            }

            if (settings.overlay.running === false) {
                d.o = $("body").css('overflow');
                $("body").append('<div id="tworph_overlay"></div>');
                if (settings.scrollbars.hide === true) {
                    $("body").css({
                        overflow: 'hidden'
                    });
                }
                $("#tworph_overlay").css({
                    width: '100%',
                    height: $(document).height(),
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    background: settings.overlay.background,
                    opacity: settings.overlay.opacity,
                    zIndex: '0'
                });
                $("#tworph_overlay").click(function() {
                    $(param.caller).click();
                });
                settings.overlay.running = true;
            }
            else {
                $("#tworph_overlay").remove();
                if (settings.scrollbars.hide === true) {
                    $("body").css({
                        overflow: d.o
                    });
                }
                settings.overlay.running = false;
            }

            var top = $(window).height();
            top -= parseInt($(param.id).css('paddingTop'),10);
            top -= parseInt($(param.id).css('paddingBottom'),10);
            top -= parseInt(height,10);
            top = top / 2;
            top += $("html").scrollTop();

            var left = $(window).width();
            left -= parseInt($(param.id).css('paddingLeft'),10);
            left -= parseInt($(param.id).css('paddingRight'),10);
            left -= parseInt(width,10);
            left = left / 2;

            $(param.id).animate({
                top: (Math.round(parseInt($(param.id).css('top'),10)) === d.t) ? top + 'px': d.t + 'px',
                left: (Math.round(parseInt($(param.id).css('left'),10)) === d.l) ? left + 'px': d.l + 'px',
                'fontSize': ($(param.id).css('fontSize') === settings.fontsize.start) ? param.fontsize : settings.fontsize.start,
                'width': ($(param.id).css('width') === '0px') ? width: '0px',
                'height': ($(param.id).css('height') === '0px') ? height: '0px',
                opacity: ($(param.id).css('opacity') === settings.opacity) ? '1': settings.opacity
            },
            settings.duration,
            function() {
                // Callback
                $(param.id).css('display', ($(param.id).css('opacity') === settings.opacity) ? 'none': 'block');
            }
            );

        };
        return this;
    };
})(jQuery);