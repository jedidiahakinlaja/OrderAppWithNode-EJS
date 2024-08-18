
$(document).ready(function(){
    $('.select').click(function () {
        id = this.id;
       window.location.href =`/select/?select=${id}`
    
      
    });

});