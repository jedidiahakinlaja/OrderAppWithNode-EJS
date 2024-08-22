$(document).ready(function(){

    $('#fromCLick').on('click', function (e) {

      var data = $('#myForm').serialize();
      // debugger;
       console.log(JSON.stringify(data));
       e.preventDefault();
        console.log(data);
        
        // debugger;
        $.ajax({
          url: `/sendInfo`,
          type: 'PUT',
          data: data,
          success: function (data) {
            console.log('updated successfully');
            window.location.reload()
          },
          error: function () {
            alert('No data');
          }
        });
      });

});