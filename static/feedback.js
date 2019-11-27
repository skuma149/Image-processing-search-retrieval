$( document ).ready(function() {

    var relevant = [];
    var irrelevant = [];

    $(document).on("click", ".radio_button", function () {
        console.log($(this).attr('tag'), this.name);
        var tag = $(this).attr('tag');
        var name = this.name;
        if(tag == "relevant"){

            if(irrelevant.includes(name)){
                var index = irrelevant.indexOf(name);
                irrelevant.splice(index, index+1);
            }
            relevant.push(name);

        }
        else if(tag == "irrelevant"){

             if(relevant.includes(name)){
                 var index = relevant.indexOf(name);
                 relevant.splice(index, index+1);
            }
            irrelevant.push(name);
        }

   });

    $(document).on("click","#submit_feedback_button",function () {
        console.log("Clicked");
        var formData = new FormData();
        formData.append('relevant[]', JSON.stringify(relevant));
        formData.append('irrelevant[]', JSON.stringify(irrelevant));

        $.ajax({
            type: 'POST',
            url: '/get_feedback',
            data: formData,
            processData: false,
            contentType: false,

            success: function(data){
                var result = $('<div />').append(data).find('#showResults').html();
                $('#showResults').html(result);
                relevant = [];
                irrelevant = [];

            },
            error: function (err_msg) {
                console.log("error ", err_msg)
            }
        });

    });

});