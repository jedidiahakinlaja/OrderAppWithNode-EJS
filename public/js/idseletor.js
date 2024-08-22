
$(document).ready(function(){
       const  valId= (window.location.href).slice(37).replace(/-/g,'/')

        $("#update_id").attr("value", valId);
       
        $.ajax({
            type: 'GET',
            url: `/getDetails/${valId}`,
            success: function (response) {
              $("#update_id").attr("value", response.response._id);
              $("#update_product").attr("value", response.response.product);
              $("#img").attr("src", response.response.image);
              $("#update_price").attr("value", response.response.price);
              $('#update_title').attr("value",response.response.title);
              $('#update_image').attr("value",response.response.image);
              $("#card-name").append(response.response.title);
              $("#card-price").append(response.response.price);
            },
            error: function () {
              console.log('No data');
            }
          });
        

});

$(document).ready(function(){
  $('#purchase-click').click(function(e) {
    
      var data = $('#purchase-form').serialize();
      console.log(data);
      // debugger;
        e.preventDefault();
  $.ajax({
      type: 'POST',
      url: `/purchase`,
      method: 'Post',
      data: data,
      success: function(data){
          alert('purchased');
          window.location.href='/quickPurchase'
      },
      error: function(){
          console.log('No data');
      }
  });

});	
  
});