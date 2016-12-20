$( document ).on('turbolinks:load', function() {

   $(function(){
    if($('body').is('.catching')){
     catchGame();
    }
  });

  $(function(){
    if($('body').is('.jumping')){
     catchGame();
    }
  });

});