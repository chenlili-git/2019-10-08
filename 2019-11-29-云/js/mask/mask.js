$masked_box=$('#masked_box');
$mask_close=$masked_box.find('.mask_close');

$mask_close.click(function(){
    $(this).parents('section').css('display','none');
})