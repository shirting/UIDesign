function ResGetOrders(){
    var thisURL=decodeURI(window.location.href);
    var name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    var url=encodeURI("RestaurantHistoryOrder.jsp?~"+name+"~"+chaptcha);
    window.location.href=url;
}
function RestaurantInfo(){
    var thisURL=decodeURI(window.location.href);
    var name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
    window.location.href=url;
}
function ResGetOrdersByTime(){
    var thisURL=decodeURI(window.location.href);
    var name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ResgetOrderbyTimeServlet",
        traditional: true,
        data: {
            "ResName": name,
            "Chaptcha": chaptcha,
        },
        success: function (result) {
            console.log(result)
            var Type=document.getElementById("main");
            var tt=document.getElementById("tt");
            Type.innerHTML ="";
            tt.innerHTML ="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">序号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员名</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">收货地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">联系方式</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">下单时间</td>\n" +
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
            if(result.length>7) {
                for (var i = 0; i < 8; i++) {
                    Type.innerHTML +="<div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice +"</td>\n" +
                        "                                </div>";
                    Type.innerHTML += "<br><br><br><br><br>";
                }
                Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
                    for (var i = 0; i < result.length; i++) {
                        Type.innerHTML +="<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberName +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderState + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].preferential + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderPrice +"</td>\n" +
                            "                                </div>";
                        Type.innerHTML += "<br><br><br><br><br>";
                    }
                    Type.innerHTML +="<hr>";
                }
            }
        }
    })
}
function ResGetOrdersByPrice(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ResgetOrderbyPriceServlet",
        traditional: true,
        data: {
            "ResName": name,
            "Chaptcha": chaptcha,
        },
        success: function (result) {
            console.log(result)

            var Type=document.getElementById("main");
            var tt=document.getElementById("tt");
            Type.innerHTML ="";
            tt.innerHTML ="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">序号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员名</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">收货地址</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">联系方式</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">下单时间</td>\n" +
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
            if(result.length>7) {
                for (var i = 0; i < 8; i++) {
                    Type.innerHTML +="<div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberName +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderState + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].preferential + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].orderPrice +"</td>\n" +
                        "                                </div>";
                    Type.innerHTML += "<br><br><br><br><br>";
                }
                Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
                    for (var i = 0; i < result.length; i++) {
                        Type.innerHTML +="<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberName +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderState + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].preferential + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].orderPrice +"</td>\n" +
                            "                                </div>";
                        Type.innerHTML += "<br><br><br><br><br>";
                    }
                    Type.innerHTML +="<hr>";
                }
            }
        }
    })
}
function ResGetOrdersByMember(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ResgetOrderbyfrequencyServlet",
        traditional: true,
        data:{
            "ResName":name,
            "Chaptcha":chaptcha,
        },
        success:function(result){
            console.log(result)
            var Type=document.getElementById("main");
            var tt=document.getElementById("tt");
            Type.innerHTML ="";
            tt.innerHTML ="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">序号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员编号</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员名</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">联系方式</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">点餐次数</td>\n" +
                "                                </div>";
            if(result.length>7) {
                for (var i = 0; i < 8; i++) {
                    Type.innerHTML += "<div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].memberId +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberName + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].MemberCount +"</td>\n" +
                        "                                </div>";
                    Type.innerHTML +="<br><br><br><br>"
                }
                Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
                    for (var i = 0; i < result.length; i++) {
                        Type.innerHTML += "<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberId +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberName + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+ result[i].memberPhone +"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].MemberCount +"</td>\n" +
                            "                                </div>";
                        Type.innerHTML +="<br><br><br><br>"
                    }
                    Type.innerHTML +="<hr>";
                }
            }
        }
    })
}

function RestaurantLogout(){
    //跳转至登录的主界面
    var url=encodeURI("index.jsp");
    window.location.href=url;
}
