var thisURL=decodeURI(window.location.href);
var chaptcha=thisURL.split('~')[1];
var memberid=thisURL.split('~')[2];
var membername=thisURL.split('~')[3];
var memberpassword=thisURL.split('~')[4];
var Dishid=[];
var Dishamount=[];
function GetDishInfo(){
    var thisURL=decodeURI(window.location.href);
    var chaptcha=thisURL.split('~')[1];
    console.log(chaptcha+":chaptcha");
    Dishid.clear;
    Dishamount.clear;
    $.ajax({
            type:"POST",
            dataType:"json",
            data:{"chaptcha":chaptcha},
            url:"GetDishInfoServlet",
            success:function(result){
                console.log(result);
                var orderdish=document.getElementById("orderdish");
                for(var i=0;i<result.length;i++) {
                    orderdish.innerHTML += "<div><div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].Dishname + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].DishInfo + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].DishPrice + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">" + result[i].DishAmount + "</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\"> <input type=\"button\" value=\"-\" onclick='deletedish(" + result[i].DishesID + "," + result[i].DishAmount + ")' />\n" +
                        "    <strong id='" + result[i].DishesID + "'>0</strong>\n" +
                        "  \t<input type=\"button\" value=\"+\" onclick='adddish(" + result[i].DishesID + "," + result[i].DishAmount + ")'/>\n" +
                        "</td>\n" +
                        "                                </div><br><br><br><br><br></div> ";
                }
            }
    })
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetMemberAddressServlet",
        cache: false,
        data: {"memberid": memberid, "membername": membername},
        success: function (result) {
            var memberaddress = document.getElementById("memberaddress");
            for(var i=0;i<result.MemberAddress.length;i++) {
                memberaddress.innerHTML += "<option value='"+result.MemberAddress[i]+"'>"+result.MemberAddress[i]+"</option>";
            }
        }
    })
}
function deletedish(dishid,amount){
    var orderdish=document.getElementById("orderdish");
    var number=parseInt(document.getElementById(dishid).innerText);
    var context=document.getElementById("context") ;
    context.value="";
    var All=document.getElementById("All");
    var dis=document.getElementById("dis");
    var newall=document.getElementById("newall");
    var candis=false;
    context.value ="";
    var all=0;
    if(number>0){
        number=number-1;
    }
    if(Dishid.length>0){
        for(var j=0;j<Dishid.length;j++){
            if(Dishid[j]==dishid){
                Dishamount[j]=number;
                exist=true;
                break;
            }
        }
        if(!exist){
            Dishid.push(dishid);
            Dishamount.push(number);
        }
    }else{
        Dishid.push(dishid);
        Dishamount.push(number);
    }
    document.getElementById(dishid).innerText=number;
    for(var i=0;i<orderdish.children.length;i++){
        var dishnumber=parseInt(orderdish.children[i].children[8].innerText);
        var price=parseInt(orderdish.children[i].children[4].innerText);
        if(dishnumber>0){
            console.log(dishnumber);
            context.value =context.value +orderdish.children[i].children[0].innerText+":"+dishnumber+"份";
            all=price*dishnumber+all;
        }
    }
    All.value=all+"元";
    //更新订单详情
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetRestaurantDiscountServlet",
        cache:false,
        data:{"chaptcha":chaptcha},
        success:function(result){
            console.log(result);
            if(result.length>1) {
                for (var i = 0; i < result.length - 1; i++) {
                    if(result[i].Full<=all&&all<result[i+1].Full){
                        all=all-result[i].Minus;
                        dis.value="满"+result[i].Full+"减"+result[i].Minus+";";
                        candis=true;
                        break;
                    }
                }
                if(!candis){
                    if(result[result.length - 1].Full<=all){
                        all=all-result[i].Minus;
                        dis.value="满"+result[result.length - 1].Full+"减"+result[result.length - 1].Minus+";";
                    }else{
                        dis.value="0元;";
                    }
                }
            }else{
                if(result.length==1){
                    if(result[0].Full<all){
                        all=all-result[0].Minus;
                        dis.value="满"+result[0].Full+"减"+result[0+1].Full+";";
                    }
                }else{
                    dis.value="0元;";
                }
            }
        }

    })
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetMemberInfoServlet",
        cache:false,
        data:{"id":memberid},
        success:function(result){
            console.log(result);
            if(result.memberLevel>0){
                all=all*(1-result.memberLevel*0.1).toFixed(2);
                dis.value =dis.value+"会员折扣:"+(1-result.memberLevel*0.1)+"折";
                newall.value=all+"元";
            }else{
                newall.value=all+"元";
            }
        }
    })
}
function adddish(dishid,amount){
    var orderdish=document.getElementById("orderdish");
    var number=parseInt(document.getElementById(dishid).innerText);
    var all=0;
    var context=document.getElementById("context");
    var All=document.getElementById("All");
    var dis=document.getElementById("dis");
    var newall=document.getElementById("newall");
    var candis=false;
    var exist=false;
    context.value ="";
    if(number<amount){
        number=number+1;
    }
    document.getElementById(dishid).innerText=number;
    if(Dishid.length>0){
        for(var j=0;j<Dishid.length;j++){
            if(Dishid[j]==dishid){
                Dishamount[j]=number;
                exist=true;
                break;
            }
        }
        if(!exist){
            Dishid.push(dishid);
            Dishamount.push(number);
        }
    }else{
        Dishid.push(dishid);
        Dishamount.push(number);
    }
    for(var i=0;i<orderdish.children.length;i++){
        var dishnumber=parseInt(orderdish.children[i].children[8].innerText);
        var price=parseInt(orderdish.children[i].children[4].innerText);
        if(dishnumber>0){
            context.value=context.value+orderdish.children[i].children[0].innerText+":"+dishnumber+"份";
            all=price*dishnumber+all;
        }
    }
    All.value=all+"元";
    //需要添加优惠
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetRestaurantDiscountServlet",
        cache:false,
        data:{"chaptcha":chaptcha},
        success:function(result){
            console.log(result);
            if(result.length>1) {
                for (var i = 0; i < result.length - 1; i++) {
                    if(result[i].Full<=all&&all<result[i+1].Full){
                      all=all-result[i].Minus;
                      dis.value="满"+result[i].Full+"减"+result[i].Minus+";";
                      candis=true;
                      break;
                    }
                }
                if(!candis){
                    if(result[result.length - 1].Full<=all){
                        all=all-result[i].Minus;
                        dis.value="满"+result[result.length - 1].Full+"减"+result[result.length - 1].Minus+";";
                    }else{
                        dis.value="0元;";
                    }
                }
            }else{
                if(result.length==1){
                    if(result[0].Full<all){
                        all=all-result[0].Minus;
                        dis.value="满"+result[0].Full+"减"+result[0+1].Full+";";
                    }
                }else{
                    dis.value="0元;";
                }
            }
        }

    })
    //得到会员的等级优惠
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetMemberInfoServlet",
        cache:false,
        data:{"id":memberid},
        success:function(result){
            console.log(result);
            if(result.memberLevel>0){
                all=all*(1-result.memberLevel*0.1).toFixed(2);
                dis.value =dis.value+"会员折扣:"+(1-result.memberLevel*0.1)+"折";
                newall.value=all+"元";
            }else{
                newall.value=all+"元";
            }
        }
    })
}

function uploadorder() {
    //得到订单详情和总价，会员的信息，店铺的信息，当前时间（精确到秒），存入数据库，状态为未支付
    var orderdish=document.getElementById("orderdish").value;
    var Context=document.getElementById("context").value;
    var discount=document.getElementById("dis").value;
    var newall=parseFloat(document.getElementById("newall").value);
    var address=document.getElementById("memberaddress");
    var Address;
    for(var i=0;i<address.length;i++) {
        if (address[i].selected == true) {
            Address = address[i].value;
            break;
        }
    }
    console.log(Dishid);
    console.log(Dishamount);
    //console.log(Address);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "NewOrderServlet",
        traditional: true,
        data: {
            "context": Context,
            "Address":Address,
            "price":newall,
            "discount":discount,
            "chaptcha":chaptcha,
            "memberid":memberid,
            "Dishid":Dishid,
            "Dishamount":Dishamount,
        },
        success: function (result) {
            if(result=="success"){
                alert("成功生成该订单");
                //跳转至正在进行的订单界面
                var url=encodeURI("MemberNowOrder.jsp?~"+memberid+"~"+membername+"~"+memberpassword);
                window.location.href=url;
            }else{
                if(result=="fail"){
                    alert("未成功生成该订单");
                }else{
                    alert(result);
                }
            }
        }
    });
}
/*
function selectaddress(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetMemberAddressServlet",
        cache: false,
        data: {"memberid": memberid, "membername": membername},
        success: function (result) {
            var memberaddress = document.getElementById("memberaddress");
            for(var i=0;i<result.MemberAddress.length;i++) {
                memberaddress.innerHTML += "<option value='"+result.MemberAddress[i]+"'>"+result.MemberAddress[i]+"</option>";
            }
        }
    })
}
*/
function member(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[2];
    var name=thisURL.split('~')[3];
    var password=thisURL.split('~')[4];
    var url=encodeURI("Member.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberNowOrder(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[2];
    var name=thisURL.split('~')[3];
    var password=thisURL.split('~')[4];
    var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberHistoryOrders(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[2];
    var name=thisURL.split('~')[3];
    var password=thisURL.split('~')[4];
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

function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}

