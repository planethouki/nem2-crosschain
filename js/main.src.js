(() => {
    $("#debug").text("loading!");
    $("input[name=addressFrom]").val("SCBCMLVDJBXARCOI6XSKEU3ER2L6HH7UBEPTENGQ");
    $("input[name=addressTo]").val("SB2Y5ND4FDLBIO5KHXTKRWODDG2QHIN73DTYT2PC");
})();

// lock
(() => {
    $("#lock").submit((event) => {
        event.preventDefault();
        $("input[name=lock]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
        $("#progress_lock").removeClass("_is-invisible");
        let addressFrom = $("input[name=addressFrom]").val().split("-").join("");
        let addressTo = $("input[name=addressTo]").val().split("-").join("");
        let pubkeyFrom = $("#pubkeyFrom").text();
        let amount = $("input[name=amount]").val() || 10;
        let postData = {
            send: addressFrom,
            receive: addressTo,
            pubkey: pubkeyFrom,
            amount: amount
        };
        $.ajax({
            type: "POST",
            url: "https://atomicswap48gh23s.azurewebsites.net/api/lock",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            success: (data, dataType) => {
                console.log(data);
                console.log(dataType);
                $("input[name=secret_lock_tx_hash]").val(data["tx1pubHash"]);
                $("input[name=secret]").val(data["secret"]);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: (XMLHttpRequest, textStatus) => {
                $("input[name=lock]").attr('disabled', false).removeClass("_disabled").addClass("_primary");
                $("#progress_lock").addClass("_is-invisible");
                console.log(XMLHttpRequest);
                console.log(textStatus);
            }
        })
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
})();

// cosign
(() => {
    $("#cosign").submit((event) => {
        event.preventDefault();
        $("input[name=cosign]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
        $("#progress_cosign").removeClass("_is-invisible");
        let secretLockTxHash = $("input[name=secret_lock_tx_hash]").val();
        let postData = {
            hash: secretLockTxHash
        };
        $.ajax({
            type: "POST",
            url: "https://atomicswap48gh23s.azurewebsites.net/api/cosign?code=NbwKc5U56d6FbgVJXlOe0jrHaLp13AzIyhokoqP4xSIv8ofj6V5MZQ==",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            success: (data, dataType) => {
                console.log(data);
                console.log(dataType);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: (XMLHttpRequest, textStatus) => {
                $("input[name=cosign]").attr('disabled', false).removeClass("_disabled").addClass("_primary");
                $("#progress_cosign").addClass("_is-invisible");
                console.log(XMLHttpRequest);
                console.log(textStatus);
            }
        })
    });
})();

// proof
(() => {
    $("#proof").submit((event) => {
        event.preventDefault();
        $("input[name=proof]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
        $("#progress_proof").removeClass("_is-invisible");
        let secret = $("input[name=secret]").val();
        let postData = {
            secret: secret
        };
        $.ajax({
            type: "POST",
            url: "https://atomicswap48gh23s.azurewebsites.net/api/proof",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            success: (data, dataType) => {
                console.log(data);
                console.log(dataType);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: (XMLHttpRequest, textStatus) => {
                $("input[name=proof]").attr('disabled', false).removeClass("_disabled").addClass("_primary");
                $("#progress_cosign").addClass("_is-invisible");
                console.log(XMLHttpRequest);
                console.log(textStatus);
            }
        });
    })
})();