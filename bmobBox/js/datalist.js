$(function(){
   // 列表页js
    $("#div_scroll").niceScroll({  
            cursorcolor:"#a0a0a0",  
            cursoropacitymax:1,  
            touchbehavior:false,  
            cursorwidth:"5px",  
            cursorborder:"0",  
            cursorborderradius:"5px"  
            });
    $("#div_scroll").css('height', '500px');
     $('[data-toggle=tooltip]').tooltip();
      // $(".query-btn").click(function() {
      //   $(".query").stop().fadeIn(500);
      // });
      // $(".query .close").click(function() {
      //    $(".query").stop().fadeOut(500);
      // });
      $(".permission-type li").click(function() {
        $(this).addClass('on').siblings().removeClass('on');
      });
})