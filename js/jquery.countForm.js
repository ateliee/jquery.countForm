/**
 jquery.countForm v1.0.0
 (c) 2015 https://github.com/ateliee/jquery.countForm
 License: MIT
 */
(function($) {
    $.fn.countForm = function(options){
        var $this = $(this);
        var settings = {
            byte : false,   // 2 byte chanracter count
            byteToValue : 0.5,   // 2 byte chanracter count value
            addon: true,    // bootstrap addon or element after <div class="count">
            before : '',
            separator : ' / ',
            after : '',
            showMax: true,     // show str (before + [count] + separator + [maxlength] + after) or (before + [count] + after)
            maxlength : null,     // if not maxlength option then input[maxlength] value get
            countUp : true,         // if count up or count down
            overClass : '',
            defaultClass : '',
            emptyClass : '',
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
                return $this.settings.byteToValue;
            }
            return ($this.settings.byteToValue * 2);
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
        $this.setClassCount = function(class_name){
            var $count = $(this).next('.count');
            var classes = [];
            if($this.settings.overClass){
                classes.push($this.settings.overClass);
            }
            if($this.settings.defaultClass){
                classes.push($this.settings.defaultClass);
            }
            if($this.settings.emptyClass){
                classes.push($this.settings.emptyClass);
            }
            for(var i in classes){
                if($count.hasClass(classes[i])){
                    $count.removeClass(classes[i]);
                }
            }
            if(class_name){
                $count.addClass(class_name);
            }
        };

        $this.bind('keydown keyup keypress change',function(){
            var countMax = $this.settings.maxlength;
            var v = $(this).val();
            var val = $this.subStr(v,countMax);
            if(v != val){
                $(this).val(val);
            }

            var thisValueLength = $this.countStr(val);
            var countValue = ($this.settings.countUp ? thisValueLength : ((countMax)-(thisValueLength)));
            var $count = $(this).next('.count');

            var text = $this.settings.before + countValue;
            if($this.settings.showMax){
                text += $this.settings.separator + countMax;
            }
            text += $this.settings.after;

            $count.html(text);

            if(thisValueLength >= countMax) {
                $this.setClassCount($this.settings.overClass);
            }else if (thisValueLength <= 0){
                $this.setClassCount($this.settings.emptyClass);
            } else {
                $this.setClassCount($this.settings.defaultClass);
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
            $this.removeAttr('maxlength');
            $this.trigger('change');
        };
        $this.init();
    };
})(jQuery);