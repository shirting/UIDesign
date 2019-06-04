var thisURL=decodeURI(window.location.href);
var id=thisURL.split('~')[1];
var name=thisURL.split('~')[2];
function GetOrders(){
    var Type=document.getElementById("Type");
    Type.innerHTML ="";
   // GetOrdersByOrderTime();
    //GetOrdersByPrice();
    //GetOrdersByRes();
    GetOrdersByType("FastFood");
    GetOrdersByType("Characteristic");
    GetOrdersByType("snacks");
    GetOrdersByType("Exotic");
}
function GetOrdersByPrice(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "MembergetOrderbyPriceServlet",
        cache: false,
        data: {
            "MemberID": id,
            "MemberName":name,
        },
        success: function (result) {
            console.log(result);
            var tt=document.getElementById("tt");
            tt.innerHTML="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">订单号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅类型</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">下单时间</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">收货地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">交易状态</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">订单详情</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">优惠</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">总价</td>\n" +
                "                                </div>";
            var Price = document.getElementById("Price");
            Price.innerHTML = "";
            if (result.length > 7) {
                for (var i = 0; i < 8; i++) {
                    Price.innerHTML +="<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].RestaurantName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice + "</td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML +="<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            } else {
                for (var i = 0; i < result.length; i++) {
                    Price.innerHTML +="<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].RestaurantName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice + "</td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML +="<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            }
        }
    })
}
function GetOrdersByRes(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "MembergetOrderbyfrequencyServlet",
        cache: false,
        data: {
            "MemberID": id,
            "MemberName":name,
        },
        success: function (result) {
            console.log(result);
            var Price=document.getElementById("Price");
            Price.innerHTML ="";
            var tt=document.getElementById("tt");
            tt.innerHTML="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">订单号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\"></td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\"></td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\"></td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅类型</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\"></td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">点餐次数</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\"></td>\n" +
                "                                </div>";
            if (result.length > 7) {
                for (var i = 0; i < 8; i++) {
                    Price.innerHTML +="<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].resName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].resAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].restype + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].rescount +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML +="<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            } else {
                for (var i = 0; i < result.length; i++) {
                    Price.innerHTML += "<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + (i + 1) + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].resName + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].resAddress + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].restype + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].rescount + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"></td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML += "<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            }
        }
    })
}
function GetOrdersByOrderTime(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "MembergetOrderbyTimeServlet",
        cache: false,
        data: {
            "MemberID": id,
            "MemberName":name,
        },
        success: function (result) {
            console.log(result);
            var Price=document.getElementById("Price");
            Price.innerHTML ="";
            var tt=document.getElementById("tt");
            tt.innerHTML="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">订单号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅类型</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">下单时间</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">收货地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">交易状态</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">订单详情</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">优惠</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">总价</td>\n" +
                "                                </div>";
            if (result.length > 7) {
                for (var i = 0; i < 8; i++) {
                    Price.innerHTML +="<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].RestaurantName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice + "</td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML +="<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            } else {
                for (var i = 0; i < result.length; i++) {
                    Price.innerHTML +="<div width='100%'>" +
                        "                               <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].RestaurantName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice + "</td>\n" +
                        "                                </div>" +
                        "</div>" +
                        "<hr>"
                    Price.innerHTML +="<br><br><br><br><br><br>";
                }
                Price.innerHTML += "<hr>";
            }
        }
    })
}
function GetOrdersByType(type){
    console.log(type);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "MembergetOrderbyRestypeServlet",
        cache: false,
        data: {
            "MemberID": id,
            "MemberName":name,
            "Type":type
        },
        success: function (result) {
            console.log(result);
            var Type=document.getElementById("Price");
            if(result.length>7) {
                for (var i = 0; i < 8; i++) {
                    Type.innerHTML += "<div><a>"+(i+1)+"&nbsp&nbsp&nbsp</a>\n" +
                        "    <a>" + result[i].RestaurantName + "&nbsp</a>\n" +
                        "    <a>" + result[i].RestaurantAddress + "&nbsp</a>\n" +
                        "    <a>" + result[i].RestaurantType + "&nbsp</a>\n" +
                        "    <a>" + result[i].orderTime + "&nbsp</a>\n" +
                        "    <a>" + result[i].orderAddress + "&nbsp</a>\n" +
                        "    <a>" + result[i].orderState + "&nbsp</a>\n" +
                        "    <a>" + result[i].OrderInfo + "&nbsp</a>\n" +
                        "    <a>" + result[i].preferential + "&nbsp</a>\n" +
                        "    <a>" + result[i].orderPrice + "&nbsp</a></div>";
                }
                Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
                    for (var i = 0; i < result.length; i++) {
                        Type.innerHTML += "<div><a>" + (i + 1) + "&nbsp&nbsp&nbsp</a>\n" +
                            "    <a>" + result[i].RestaurantName + "&nbsp</a>\n" +
                            "    <a>" + result[i].RestaurantAddress + "&nbsp</a>\n" +
                            "    <a>" + result[i].RestaurantType + "&nbsp</a>\n" +
                            "    <a>" + result[i].orderTime + "&nbsp</a>\n" +
                            "    <a>" + result[i].orderAddress + "&nbsp</a>\n" +
                            "    <a>" + result[i].orderState + "&nbsp</a>\n" +
                            "    <a>" + result[i].OrderInfo + "&nbsp</a>\n" +
                            "    <a>" + result[i].preferential + "&nbsp</a>\n" +
                            "    <a>" + result[i].orderPrice + "&nbsp</a></div>";
                    }
                    Type.innerHTML +="<hr>";
                }
            }
        }
    })
}

function member(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Member.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberNowOrder(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberHistoryOrders(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberHistoryOrder.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}

function DeleteMember(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{"name":name,"id":id},
        url:"DeleteMemberServlet",
        success:function(result){
            if(result=="fail"){
                alert("注销成功");
                var url=encodeURI("index.jsp");
                window.location.href=url;
            }else{
                alert("注销失败");
            }
        }
    });
}

function Memberaddress(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberAddress.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function Main(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Main.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}

function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}
