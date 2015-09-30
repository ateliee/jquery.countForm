/**
 jquery.countForm v1.0.0
 (c) 2015 https://github.com/ateliee/jquery.countForm
 License: MIT
 */
(function($) {
    $.fn.countForm = function(options){
        var $this = $(this);
        var settings = {
            byte : false,
            addon: true,    // bootstrap addon
            before : '',
            separator : ' / ',
            after : '',
            show_max: true,
            maxlength : null,
            debug: false
        };
        settings = $.extend(settings,options);

        if(!settings.maxlength){
            settings.maxlength = $this.attr('maxlength');
        }
        $this.settings = settings;

        $this.log = function(text,style){
            if($self.settings['debug']){
                console.log.apply( console, arguments );
            }
        }
        $this.countStr = function(str){
            if($this.settings.byte == true) {
                var r = 0;
                for (var i = 0; i < str.length; i++) {
                    var c = str.charCodeAt(i);
                    r += $this.countStrCode(c);
                }
                return r;
            }
            return str.length;
        };
        $this.countStrCode = function(c){
            // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
            // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
            if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                return 1;
            }
            return 2;
        }
        $this.subStr = function(str,length){
            var s = '';
            var l = 0;
            for (var i = 0; i < str.length; i++) {
                l += ($this.settings.byte ? $this.countStrCode(str.charCodeAt(i)) : 1);
                if(l > length){
                    break;
                }
                s += str.charAt(i);
            }
            return s;
        };

        $this.bind('keydown keyup keypress change',function(){
            var countMax = $this.settings.maxlength;
            var val = $this.subStr($(this).val(),countMax);
            $(this).val(val);

            var thisValueLength = $this.countStr(val);
            var countDown = (countMax)-(thisValueLength);
            var $count = $(this).next('.count');

            var text = $this.settings.before + countDown;
            if($this.settings.show_max){
                text += $this.settings.separator + countMax;
            }
            text += $this.settings.after;

            $count.html(text);

            if(countDown < 0){
                $count.css({color:'#ff0000',fontWeight:'bold'});
            } else {
                $count.css({color:'#000000',fontWeight:'normal'});
            }
        });

        $this.init = function(){
            if($this.settings.addon){
                if(!$this.hasClass('form-control')){
                    $this.addClass('form-control');
                }
                $this.wrap('<div class="input-group"></div>');
                $this.after('<span class="input-group-addon count"></span>');
            }else{
                $this.after('<div class="count"></div>');
            }
            $this.trigger('change');
        };
        $this.init();
    };
})(jQuery);