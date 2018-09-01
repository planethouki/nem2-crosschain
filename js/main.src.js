const jQuery = require("jquery");

(function($){
    $("#debug").text("loading!");
    $("#lock").submit((event) => {
        event.preventDefault();
        $("input[name=submit]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
        $("#progress").removeClass("_is-invisible");
    });
    $("input[name=addressFrom]").blur((event) => {
        let address = event.target.value.split("-").join("");
        if (address.length === 40) {
            const networkFrom = $("input[name=networkFrom]").val();
            $.ajax({
                type: "GET",
                url: networkFrom + "/account/" + address,
                success: (data) => {
                    $("#pubkeyFrom").text(data.account.publicKey);
                },
                error: (error) => {
                    $("#pubkeyFrom").empty();
                    console.log(error);
                }
            })
        } else {
            $("#pubkeyFrom").empty();
        }
    })
})(jQuery);