
# jquery count form

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
            addon: true,    // bootstrap addon or element after <div class="count"> 
            before : '',
            separator : ' / ',
            after : '',
            show_max: true,     // show str (before + [count] + separator + [maxlength] + after) or (before + [count] + after)
            maxlength: null     // if not maxlength option then input[maxlength] value get
        });
    }($));
</script>
<input maxlength="100">
```
