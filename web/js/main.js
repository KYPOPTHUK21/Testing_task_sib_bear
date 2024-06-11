$('.order').on('click', '.btn-create', function() {
    $.ajax( {
        url: '/map/createmark',
        type: 'GET',
        success: function (res) {
            $('#order .order').html(res);
            //$('#cart').modal('show');
            $('#order').modal('show');
        },
        error: function () {
            alert('error');
        }
    })

});
