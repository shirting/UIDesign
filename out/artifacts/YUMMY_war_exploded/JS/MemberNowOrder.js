var thisURL=decodeURI(window.location.href);
var id=thisURL.split('~')[1];
var memname=thisURL.split('~')[2];
var mempassword=thisURL.split('~')[3];
var pay=[];
var pay1=[];
var pay2=[];
var arrive=[];
var arrive1=[];
var arrive2=[];
//支付成功的订单计算在30分钟内是否已经接受到订单，如果超过三十分钟还没有点击接受自动将钱款转给店家/数用户点击成功接收，据库中状态改为已完成，钱款转入店家
//取消的订单:已经支付还未收单的，钱退回，状态改为已取消
function countDown( maxtime,id,oid,fn ) {
    var timer = setInterval(function() {
        if( !!maxtime ){
            var day = Math.floor(maxtime / 86400),
                hour = Math.floor((maxtime % 86400) / 3600),
                minutes = Math.floor((maxtime % 3600) / 60),
                seconds = Math.floor(maxtime%60),
                msg = "支付（"+minutes+"分"+seconds+"秒）";
                document.getElementById(id).innerText = msg;
            fn( msg );
            --maxtime;
        } else {
            clearInterval( timer );
            //数据库状态改为取消
            fn("时间到了")
            alert("取消");
            var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
            window.location.href=url;
        }
    }, 1000);
}
function countDown1( maxtime,id,oid,fn ) {
    var timer = setInterval(function() {
        if( !!maxtime ){
            var day = Math.floor(maxtime / 86400),
                hour = Math.floor((maxtime % 86400) / 3600),
                minutes = Math.floor((maxtime % 3600) / 60),
                seconds = Math.floor(maxtime%60),
                msg = "订单完成（已派送"+minutes+"分"+seconds+"秒）";
            document.getElementById(id).innerText = msg;
            fn( msg );
            --maxtime;
        } else {
            clearInterval( timer );
            //数据库状态改为取消
            fn("时间到了")
            alert("取消");
            var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
            window.location.href=url;
        }
    }, 1000);
}
function cancelbeforepay(orderid){
    //将订单的状态改为已取消即可
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "CancelOrderBeforePayServlet",
        cache: false,
        data: {
            "orderid": orderid,
        },
        success: function (result) {
            console.log(result);
            if(result=="success"){
                var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                window.location.href=url;
            }else{
                alert("取消失败");
            }
        }
    })
}
function payorder(orderid,orderprice){
    //首先判断会员的余额够不够，不够不改变状态，足够的：会员余额扣钱，钱放在YUMMY中，数据库状态改为派送中,设置paytime
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "PayNowOrdersServlet",
        cache: false,
        data: {
            "id": id,
            "orderid":orderid,
            "orderprice":orderprice
        },
        success: function (result) {
            console.log(result);
            if(result=="Success"){
                alert("支付成功");
                var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                window.location.href=url;
            }else{
                if(result=="Fail"){
                    alert("支付失败");
                }else{
                    alert(result);
                }
            }
        }
    })
}
function OrderArrived(orderid){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "OrderArrivedServlet",
        cache: false,
        data: {
            "orderid":orderid,
        },
        success: function (result) {
            if(result=="success"){
                var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                window.location.href=url;
            }else{
                alert(result)
            }
        }
    })
}
function cancelafterpay(orderid){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "Cancelafterpay",
        cache: false,
        data: {
            "orderid":orderid,
        },
        success: function (result) {
            if(result=="success"){
                var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                window.location.href=url;
            }else{
                alert(result)
            }
        }
    })
}
function GetNowOrders(){
    //得到所有未完成的订单
    //对于未支付的订单进行2分钟倒计时
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetNowOrdersServlet",
        cache: false,
        data: {
            "id":id,
        },
        success: function (result) {
            //console.log(result);
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth()+1;
            //console.log(month);
            var strDate = date.getDate();
            var hour=date.getHours();
            var minute=date.getMinutes();
            var second=date.getSeconds();
            var noworder=document.getElementById("noworder");
            noworder.innerHTML ="";
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minute >= 0 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 0 && second <= 9) {
                second = "0" + second;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + hour + seperator2 + minute
                + seperator2 + second;

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

            for(var i=0;i<result.length;i++){
                var diff;
                console.log(diff);
                if(result[i].orderState=="未支付") {
                    diff=GetDateDiff(result[i].orderTime,currentdate,"second");
                    if(diff<120){
                    //显示该订单并且倒计时
                        str=str+"<tr class='timeline' order-timeline ng-repeat='item in orderList'>"
                            +"<td class='ordertimeline-time'>"
                            +"<p ng-bind='item.formatted_created_at | date:'HH:mm'' class='ng-binding'>"+result[i].orderTime.substr(0,16)+"</p>"
                            +"<i class='ordertimeline-time-icon icon-uniE65E finish ng-scope' ng-if='item.realStatus === 5'></i>"
                            +"</td>"
                            +"<td class='ordertimeline-avatar'>"
                            +"<img src='image/test.jpg'>"
                            +"</td>"
                            +"<td class='ordertimeline-info'>"
                            +"<p>订单餐厅："+result[i].RestaurantName+"</p>"
                            +"<p>"+result[i].OrderInfo +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-amount'>"
                            +"<p>"+result[i].orderPrice +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-status'>"
                            +"<p>"+result[i].orderState +"</p>"
                            +"</td>"
                            +"<td class='ordertimeline-handle'>"
                            +"<div><button id='time"+result[i].orderID+" onclick='payorder("+result[i].orderID+","+result[i].orderPrice+")'></button>"
                            +"<button onclick='cancelbeforepay("+result[i].orderID+")'>取消订单</button></div>"

                            +"</td>"
                            +"</tr>";
                        /*noworder.innerHTML +="<div>" +
                            " <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderID +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">" + result[i].RestaurantName + "</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderPrice + "元</td>\n" +
                            "                            </div>" +
                            "<br><br><br><br><br></div>" +
                            "<div><button id='time"+result[i].orderID+"' onclick='payorder("+result[i].orderID+","+result[i].orderPrice+")'></button>"+
                            "<button onclick='cancelbeforepay("+result[i].orderID+")'>取消订单</button></div><br><br>";*/

                        pay.push("time"+result[i].orderID);
                        var count=120-diff;
                        pay1.push(count);
                        pay2.push(result[i].orderID);
                    }else{//直接取消该订单
                        cancelbeforepay(result[i].orderID);
                        var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                        window.location.href=url;
                    }
                }else{
                    diff=GetDateDiff(result[i].orderArrivedTime,currentdate,"second");
                    if(diff>1800){
                        //直接收货
                        OrderArrived(result[i].orderID);//状态改为已收货，钱转给餐厅
                        var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+memname+"~"+mempassword);
                        window.location.href=url;
                    }else{
                        //显示
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
                            +"<div><button id='time"+result[i].orderID+" onclick='payorder("+result[i].orderID+","+result[i].orderPrice+")'></button>"
                            +"<button onclick='cancelafterpay("+result[i].orderID+")'>取消订单</button></div>"
                            +"</td>"
                            +"</tr>";

                        /*noworder.innerHTML +="<div>" +
                            " <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderID +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">" + result[i].RestaurantName + "</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].RestaurantAddress +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].RestaurantType +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderTime +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderAddress +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderState +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].OrderInfo +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].preferential +"</td>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"th th-amount\">\n" +
                            "                            <td class=\"td-inner\">"+ result[i].orderPrice + "元</td>\n" +
                            "                            </div>" +
                            "<br><br><br></div>" +
                            "<div><button id='time"+result[i].orderID+"' onclick='OrderArrived("+result[i].orderID+","+result[i].orderPrice+")'></button>"+
                        "<button onclick='cancelafterpay("+result[i].orderID+")'>取消订单</button></div><br><br>";*/

                        arrive.push(1800-diff);
                        arrive1.push("time"+result[i].orderID);
                        arrive2.push(result[i].orderID);
                    }
                }
            }



            for(var j=0;j<pay1.length;j++){
                countDown( pay1[j],pay[j],pay2[j],function( msg ) {
                    //alert(msg);
                })
            }
            for(var n=0;n<arrive.length;n++){
                countDown1( arrive[n],arrive1[n],arrive2[n],function( msg ) {
                    //alert(msg);
                })
            }

            str=str+ "</tbody>"
                +"</table>"
                +"</form>";
            noworder.innerHTML+=str;
        }
    })
}
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime =new Date(startTime); //开始时间
    var eTime =new Date(endTime); //结束时间
    //作为除数的数字
    var timeType =1;
    switch (diffType) {
        case"second":
            timeType =1000;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}
function Main(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Main.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
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

function Main(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Main.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}

function Memberaddress(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberAddress.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}

function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}


