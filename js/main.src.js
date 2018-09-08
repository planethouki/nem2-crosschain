(() => {
    // $("input[name=addressFrom]").val("SCBCMLVDJBXARCOI6XSKEU3ER2L6HH7UBEPTENGQ");
    // $("input[name=addressTo]").val("SB2Y5ND4FDLBIO5KHXTKRWODDG2QHIN73DTYT2PC");
})();

// lock
(() => {
    $("#lock").submit((event) => {
        event.preventDefault();
        let addressFrom = $("input[name=addressFrom]").val().split("-").join("");
        let addressTo = $("input[name=addressTo]").val().split("-").join("");
        let pubkeyFrom = $("#pubkeyFrom").text();
        let amountFrom = $("input[name=amountFrom]").val() || 10;
        let amountTo = $("input[name=amountTo]").val() || amountFrom;
        let postData = {
            tx1privRecipient: addressTo,
            tx2pubSigner: pubkeyFrom,
            tx1privMosaic: "nem:xem::" + (amountFrom * 1000000),
            tx2pubMosaic: "nem:xem::" + (amountTo * 1000000)
        };
        if (pubkeyFrom.length !== 64){
            $("#pubkeyFrom").html("<strong>Public key should be found on blockchain. To do it, please announce something transaction.</strong>");
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://atomicswap48gh23s.azurewebsites.net/api/deposit/lock",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            beforeSend: () => {
                $("input[name=lock]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
                $("#progress_lock").removeClass("_is-invisible");
            },
            success: (data, dataType) => {
                console.log(data);
                console.log(dataType);
                $("input[name=tx2pubHash]").val(data["tx2pubHash"]);
                $("#tx2pubPartial").attr("href", "http://catapult-test.44uk.net:3000/account/" + pubkeyFrom + "/transactions/partial");
                $("#tx2pubStatus").attr("href", "http://catapult-test.44uk.net:3000/transaction/" + data["tx2pubHash"] + "/status");
                $("#tx2pubDetail").attr("href", "http://catapult-test.44uk.net:3000/transaction/" + data["tx2pubHash"]);
                $("input[name=tx1privHash]").val(data["tx1privHash"]);
                $("#tx1privStatus").attr("href", "http://catapult48gh23s.xyz:3000/transaction/" + data["tx1privHash"] + "/status");
                $("#tx1privDetail").attr("href", "http://catapult48gh23s.xyz:3000/transaction/" + data["tx1privHash"]);
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
            const networkFrom = $("input[name=networkFrom]").val() || "http://catapult-test.44uk.net:3000";
            $.ajax({
                type: "GET",
                url: networkFrom + "/account/" + address,
                success: (data) => {
                    $("#pubkeyFrom").text(data.account.publicKey);
                },
                error: (error) => {
                    $("#pubkeyFrom").text("can not get publick key from blockchain");
                    console.log(error);
                }
            })
        } else {
            $("#pubkeyFrom").text("please input your address");
        }
    })
})();

// proof
(() => {
    $("#proof").submit((event) => {
        event.preventDefault();
        let secret = $("input[name=secret]").val();
        let postData = {
            secret: secret
        };
        $.ajax({
            type: "POST",
            url: "https://atomicswap48gh23s.azurewebsites.net/api/deposit/proof",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            beforeSend: () => {
                $("input[name=proof]").attr('disabled', true).addClass("_disabled").removeClass("_primary");
                $("#progress_proof").removeClass("_is-invisible");
            },
            success: (data, dataType) => {
                console.log(data);
                console.log(dataType);
                $("#tx3pubStatus").attr("href", "http://catapult-test.44uk.net:3000/transaction/" + data["tx3pubHash"] + "/status");
                $("#tx3pubDetail").attr("href", "http://catapult-test.44uk.net:3000/transaction/" + data["tx3pubHash"]);
                $("#tx4privStatus").attr("href", "http://catapult48gh23s.xyz:3000/transaction/" + data["tx4privHash"] + "/status");
                $("#tx4privDetail").attr("href", "http://catapult48gh23s.xyz:3000/transaction/" + data["tx4privHash"]);
                $("#showproof").text(data["proof"]);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: (XMLHttpRequest, textStatus) => {
                $("input[name=proof]").attr('disabled', false).removeClass("_disabled").addClass("_primary");
                $("#progress_proof").addClass("_is-invisible");
                console.log(XMLHttpRequest);
                console.log(textStatus);
            }
        });
    })
})();