var thisURL = decodeURI(window.location.href);
var id = thisURL.split('~')[1];
var name = thisURL.split('~')[2];
var password = thisURL.split('~')[3];

function GetRestaurant(type) {
    var dish = document.getElementById("dish");
    var sellerbox = document.getElementById("sellerbox");
    sellerbox.innerHTML = "";
    dish.innerHTML = "";
    //alert(type);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetRestaurantServlet",
        cache: false,
        data: {"type": type},
        success: function (result) {
            //得到餐厅信息
            var chaptcha;
            for (var i = 0; i < result.length; i++) {
                var reslocation = result[i].resAddress;
                var resphone = result[i].phone;
                chaptcha = parseInt(result[i].chaptcha);
                var pinfen = parseInt(Math.random() * (98 - 75) + 77, 10);

                var k = [];
                k['chaptcha'] = chaptcha;
                k['loc'] = reslocation;
                k['phone'] = resphone; //  GetDish('"+chaptcha+"','"+reslocation+"','"+resphone+"')
                sellerbox.innerHTML += "<a onclick=\"GetDish('" + chaptcha + "','" + reslocation + "','" + resphone + "')\" data-bidding='' target=\"_blank\" class=\"rstblock\">\n" +
                    "                                <div class=\"rstblock-logo\"><img\n" +
                    "                                        src=\"//fuss10.elemecdn.com/1/8d/14ed2b26709cb076c0038e955e420jpeg.jpeg?imageMogr2/thumbnail/70x70/format/webp/quality/85\"\n" +
                    "                                        width=\"70\" height=\"70\" alt= " + result[i].resName + " \n" +
                    "                                        class=\"rstblock-logo-icon\"></div>\n" +
                    "                                <div class=\"rstblock-content\">\n" +
                    "                                    <div class=\"rstblock-title\">" + result[i].resName + " </div>\n" +
                    "                                    <div class=\"starrating icon-star\"><span class=\"icon-star\" style=\"width:" + pinfen + "%;\"></span>\n" +
                    " <div class=\"rstblock-cost\">满" + result[i].discount[0].Full + "减" + result[i].discount[0].Minus + "</div>\n" +
                    "                                    </div></div></a>";

            }
        }
    })
}

function GetDish(Chaptcha, location, phone) {
    console.log(Chaptcha);
    while (Chaptcha.toString().length < 7) {
        Chaptcha = "0" + Chaptcha.toString();
    }
    console.log("chaptcha:" + Chaptcha);
    var url = encodeURI("OrderDish.jsp?~" + Chaptcha + "~" + id + "~" + name + "~" + password + "~" + location + "~" + phone);
    window.location.href = url;
}

function member() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("Member.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberNowOrder() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("MemberNowOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberHistoryOrders() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("MemberHistoryOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function DeleteMember() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"name": name, "id": id},
        url: "DeleteMemberServlet",
        success: function (result) {
            if (result == "fail") {
                alert("注销成功");
                var url = encodeURI("index.jsp");
                window.location.href = url;
            } else {
                alert("注销失败");
            }
        }
    });
}

function Main() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("Main.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function Logout() {
    var url = encodeURI("index.jsp");
    window.location.href = url;
}

