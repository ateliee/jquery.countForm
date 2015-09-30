
# jquery count form
![](/doc/images/screenshot.png)

## Description
input str count form show.
bootstrap addon support.
2 byte character count or str length.

## how to use
```
<script type="text/javascript" src="/jquery.countForm/js/jquery.countForm.js"></script>
<script type="text/javascript">
    (function(){
        $('input').countForm({
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
        });
    }($));
</script>
<input maxlength="100">
```
