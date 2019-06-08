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

            var str="";

            str=str+"<form class='am-form'>"
                +"<table class='order-list ng-scope' ng-show='orderList.length'>"

                +"<thead>"
                +"<tr>"
                +"<th>下单时间</th>"
                +"<th class='order-list-infoth'>订单内容</th>"
                +"<th></th>"
                +"<th>支付金额（元）</th>"
                +"<th>状态</th>"
                +"<th>操作</th>"
                +"</tr>"
                +"</thead>"
                +"<tbody>"
                +"<tr></tr>";

            if (result.length > 7) {
                for (var i = 0; i < 8; i++) {
                    str=str+"<tr class='timeline' order-timeline ng-repeat='item in orderList'>"
                        +"<td class='ordertimeline-time'>"
                        +"<p ng-bind='item.formatted_created_at | date:'HH:mm'' class='ng-binding'>"+result[i].orderTime.substr(0,16)+"</p>"
                        +"<i class='ordertimeline-time-icon icon-uniE65E finish ng-scope' ng-if='item.realStatus === 5'></i>"
                        +"</td>"
                        +"<td class='ordertimeline-avatar'>"
                        +"<img src='image/test.jpg'>"
                        +"</td>"
                        +"<td class='ordertimeline-info'>"
                        +"<p>"+result[i].OrderInfo +"</p>"
                        +"<p>订单号："+result[i].orderID+"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-amount'>"
                        +"<p>"+result[i].orderPrice +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-status'>"
                        +"<p>"+result[i].orderState +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-handle'>"
                        //+"<a class='ordertimeline-handle-detail' onclick='getOrderInfo()'>订单详情</a>"

                        +"<button type='button' class='btn btn-default' title='Popover title'" +
                        "data-container='body' data-toggle='popover' data-placement='left'" +
                        "data-content='左侧的 Popover 中的一些内容'>" +
                        "左侧的 Popover" +
                        "</button>"


                        +"</td>"
                        +"</tr>";
                }
            } else {
                for (var i = 0; i < result.length; i++) {
                    str=str+"<tr class='timeline' order-timeline ng-repeat='item in orderList'>"
                        +"<td class='ordertimeline-time'>"
                        +"<p ng-bind='item.formatted_created_at | date:'HH:mm'' class='ng-binding'>"+result[i].orderTime.substr(0,16)+"</p>"
                        +"<i class='ordertimeline-time-icon icon-uniE65E finish ng-scope' ng-if='item.realStatus === 5'></i>"
                        +"</td>"
                        +"<td class='ordertimeline-avatar'>"
                        +"<img src='image/test.jpg'>"
                        +"</td>"
                        +"<td class='ordertimeline-info'>"
                        +"<p>"+result[i].OrderInfo +"</p>"
                        +"<p>订单号："+result[i].orderID+"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-amount'>"
                        +"<p>"+result[i].orderPrice +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-status'>"
                        +"<p>"+result[i].orderState +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-handle'>"
                        //+"<a class='ordertimeline-handle-detail' onclick='getOrderInfo()'>订单详情</a>"

                        +"	<div>"
                        //+"		<div class='am-btn-group am-btn-group-xs'>"

                        +"<a class='ordertimeline-handle-detail' onclick='getOrderInfo()'>订单详情</a>"
                        //+"			<button "
                        //+"				class='am-btn am-btn-default am-btn-xs am-hide-sm-only' id='"+i+"' onclick='getOrderInfo("+result[i].orderID+")'>"
                        //+"				<span class='am-icon-trash-o'></span> 删除"
                        //+"			</button>"
                        //+"		</div>"
                        +"	</div>"

                        +"</td>"
                        +"</tr>"

                        +"<tr class='detail-view' style='display: none;'>"
                        +"<td colspan='7'>"
                        +"</td>"
                        +"</tr>";

                }

            }
            str=str+ "</tbody>"
                +"</table>"
                +"</form>";
            Price.innerHTML+=str;
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
function getOrderInfo()
{
    //document.getElementById("info").style.display="block";
    //document.getElementById("collapseTwo").collapse('show');
}
$(function () {
    $("[data-toggle='popover']").popover();
});