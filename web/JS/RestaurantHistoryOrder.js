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

    var sta = document.getElementById("membersByOrderSum");
    sta.style.display = 'none';
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
    var sta = document.getElementById("membersByOrderSum");
    sta.style.display = 'none';

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
    var sta = document.getElementById("membersByOrderSum");
    sta.style.display = 'block';
    var sta = document.getElementById("statistic");
    sta.style.display = 'none';

    var div = document.getElementById("pie");
    var pie = echarts.init(div);

    var orders = document.getElementById("top");
    orders.innerHTML = "";

    var marketname = [];
    var number = [];
    var res = [];
    var markettype = [];
    var marketaddress = [];

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
            console.log(result);
            var len = result.length;
            // alert(len);
            for(var i=0;i<len;i++){
                var datainfo = {};
                //alert(result[i].resName);
                var name = result[i].memberName;
                var num = result[i].MemberCount;
                var id = result[i].memberId;
                var address = result[i].memberPhone;
                marketname[i]=name;
                number[i]=num;
                markettype[i]=id;
                marketaddress[i]=address;
                datainfo.value = num;
                datainfo.name = name;
                res[i]=datainfo;
            }
            console.log(marketname);
            console.log(res);
            option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:marketname
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'center',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'会员点餐次数',
                        type:'pie',
                        radius : ['50%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '30',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:res
                    }
                ]
            };
            pie.setOption(option);

            //将top榜实现
            orders.innerHTML += " <table class=\"am-table am-table-striped am-table-hover\">\n" +
                "                                    <strong style=\"font-weight:bold;font-size: 1.5rem;color:rosybrown\">会员点餐次数TOP5</strong>\n" +
                "                                    <thead>\n" +
                "                                    <tr style=\"font-weight:bold\">\n" +
                "                                        <th>会员编号</th>\n" +
                "                                        <th>会员名称</th>\n" +
                "                                        <th>联系方式</th>\n" +
                "                                        <th>点餐次数</th>\n" +
                "                                    </tr>\n" +
                "                                    </thead>\n" +
                "                                    <tbody id=\"tbd\">\n" +
                "                                    </tbody>\n" +
                "                                </table>";

            var tbody = document.getElementById("tbd");
            tbody.innerHTML = "";
            if(len<5){
                for(var x = 0;x<len;x++){
                    tbody.innerHTML +="<tr>\n" +
                        "                                        <td>"+markettype[x]+"</td>\n" +
                        "                                        <td>"+marketname[x]+"</td>\n" +
                        "                                        <td>"+marketaddress[x]+"</td>\n" +
                        "                                        <td>"+number[x]+"</td>\n" +
                        "               </tr>";
                }
            }
            else{
                for(var y = 0;y<5;y++){
                    tbody.innerHTML +="<tr>\n" +
                        "                                        <td>"+markettype[y]+"</td>\n" +
                        "                                        <td>"+marketname[y]+"</td>\n" +
                        "                                        <td>"+marketaddress[y]+"</td>\n" +
                        "                                        <td>"+number[y]+"</td>\n" +
                        "               </tr>";
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
