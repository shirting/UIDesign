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
            /*tt.innerHTML ="<div class=\"th th-amount\">\n" +
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
                "                                </div>";*/
            if(result.length>7) {
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
                        "订单详情" +
                        "</button>"


                        +"</td>"
                        +"</tr>";

                    /*Type.innerHTML +="<div class=\"th th-amount\">\n" +
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
                    Type.innerHTML += "<br><br><br><br><br>";*/
                }
                //Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
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

                            +"<button type='button' class='btn btn-default' title='Popover title'" +
                            "data-container='body' data-toggle='popover' data-placement='left'" +
                            "data-content='左侧的 Popover 中的一些内容'>" +
                            "订单详情" +
                            "</button>"


                            +"</td>"
                            +"</tr>";
                        /*Type.innerHTML +="<div class=\"th th-amount\">\n" +
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
                        Type.innerHTML += "<br><br><br><br><br>";*/
                    }
                    //Type.innerHTML +="<hr>";
                }
            }
            str=str+ "</tbody>"
                +"</table>"
                +"</form>";
            Type.innerHTML+=str;

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


            /*tt.innerHTML ="<div class=\"th th-amount\">\n" +
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
                "                                </div>";*/
            if(result.length>7) {
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
                        "订单详情" +
                        "</button>"


                        +"</td>"
                        +"</tr>";
                    /*Type.innerHTML +="<div class=\"th th-amount\">\n" +
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
                    Type.innerHTML += "<br><br><br><br><br>";*/
                }
                //Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
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

                            +"<button type='button' class='btn btn-default' title='Popover title'" +
                            "data-container='body' data-toggle='popover' data-placement='left'" +
                            "data-content='左侧的 Popover 中的一些内容'>" +
                            "订单详情" +
                            "</button>"


                            +"</td>"
                            +"</tr>";
                        /*Type.innerHTML +="<div class=\"th th-amount\">\n" +
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
                        Type.innerHTML += "<br><br><br><br><br>";*/
                    }
                    //Type.innerHTML +="<hr>";
                }
            }
            str=str+ "</tbody>"
                +"</table>"
                +"</form>";
            Type.innerHTML+=str;
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
            var str="";

            str=str+"<form class='am-form'>"
                +"<table class='order-list ng-scope' ng-show='orderList.length'>"

                +"<thead>"
                +"<tr>"
                +"<th>序号</th>"
                +"<th>会员编号</th>"

                +"<th>会员名</th>"
                +"<th>联系方式</th>"
                +"<th>点餐次数</th>"
                +"</tr>"
                +"</thead>"
                +"<tbody>"
                +"<tr></tr>";
            /*tt.innerHTML ="<div class=\"th th-amount\">\n" +
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
                "                                </div>";*/
            if(result.length>7) {
                for (var i = 0; i < 8; i++) {
                    str=str+"<tr class='timeline' order-timeline ng-repeat='item in orderList'>"
                        +"<td class='ordertimeline-time'>"
                        +"<p>"+i +"</p>"
                        +"</td>"

                        +"<td class='ordertimeline-info'>"
                        +"<p>"+result[i].memberId +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-amount'>"
                        +"<p>"+result[i].memberName +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-status'>"
                        +"<p>"+result[i].memberPhone +"</p>"
                        +"</td>"
                        +"<td class='ordertimeline-handle'>"
                        +"<p>"+result[i].MemberCount +"</p>"


                        +"</td>"
                        +"</tr>";
                    /*Type.innerHTML += "<div class=\"th th-amount\">\n" +
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
                    Type.innerHTML +="<br><br><br><br>"*/
                }
                //Type.innerHTML +="<hr>";
            }else{
                if(result.length!=0) {
                    for (var i = 0; i < result.length; i++) {
                        str=str+"<tr class='timeline' order-timeline ng-repeat='item in orderList'>"
                            +"<td class='ordertimeline-time'>"
                            +"<p>"+i +"</p>"
                            +"</td>"

                            +"<td class='ordertimeline-info'>"
                            +"<p>"+result[i].memberId +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-amount'>"
                            +"<p>"+result[i].memberName +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-status'>"
                            +"<p>"+result[i].memberPhone +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-handle'>"
                            +"<p>"+result[i].MemberCount +"</p>"


                            +"</td>"
                            +"</tr>";
                        /*Type.innerHTML += "<div class=\"th th-amount\">\n" +
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
                        Type.innerHTML +="<br><br><br><br>"*/
                    }
                    //Type.innerHTML +="<hr>";
                }
            }
            str=str+ "</tbody>"
                +"</table>"
                +"</form>";
            Type.innerHTML+=str;
        }
    })
}

function RestaurantLogout(){
    //跳转至登录的主界面
    var url=encodeURI("index.jsp");
    window.location.href=url;
}
