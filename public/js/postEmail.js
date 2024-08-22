$(document).ready(function(){

    $('#fromCLick').click(function (e) {
         alert('email sent');
      var data = $('#myForm').serialize();
      // debugger;
       console.log(JSON.stringify(data));
      
       e.preventDefault();
        console.log(data);
        
        // debugger;
        $.ajax({
            type: 'POST',
            url: `/sendInfo`,
            method: 'Post',
           data: data,
          success: function (data) {
            alert('email sent');
            window.location.href='/profile'
          },
          error: function () {
            console.log('error');
          }
        });
      });

});
