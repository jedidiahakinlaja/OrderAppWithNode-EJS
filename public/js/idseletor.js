
$(document).ready(function(){
       const  valId= (window.location.href).slice(37).replace(/-/g,'/')

        $("#update_id").attr("value", valId);
       
        $.ajax({
            type: 'GET',
            url: `/getDetails/${valId}`,
            success: function (response) {
              $("#update_id").attr("value", response.response.id);
              $("#update_product").attr("value", response.response.product);
              $("#img").attr("src", response.response.image);
              $("#update_price").attr("value", response.response.price);
              $("#card-name").append(response.response.title);
              $("#card-price").append(response.response.price);
            },
            error: function () {
              console.log('No data');
            }
          });
        

});