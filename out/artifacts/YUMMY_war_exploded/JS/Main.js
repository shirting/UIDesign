var thisURL=decodeURI(window.location.href);
var id=thisURL.split('~')[1];
var name=thisURL.split('~')[2];
var password=thisURL.split('~')[3];
function GetRestaurant(type){
    var dish = document.getElementById("dish");
    dish.innerHTML="";
    //alert(type);
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetRestaurantServlet",
        cache:false,
        data:{"type":type},
        success:function(result){
            //得到餐厅信息
            var chaptcha;
            for(var i=0;i<result.length;i++){
                chaptcha=parseInt(result[i].chaptcha);
                dish.innerHTML +="<div class=\"th th-amount\">\n" +
                    "                                    <a class=\"td-inner\" onclick='GetDish("+ chaptcha+")'>"+result[i].resName+"</a>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+result[i].resAddress+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+result[i].phone+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" ;
                for(var n=0;n<result[i].discount.length;n++) {
                    dish.innerHTML +="                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+"</a>满"+result[i].discount[n].Full+"减"+result[i].discount[n].Minus+"&nbsp</a>"+"</td>\n" +
                    "                                </div>\n"
                }
                dish.innerHTML +=" <br><br><br><br>";
            }
        }
    })
}

function GetDish(Chaptcha){
    console.log(Chaptcha);
    while(Chaptcha.toString().length<7){
        Chaptcha="0"+Chaptcha.toString();
    }
    console.log("chaptcha:"+Chaptcha);
    var url=encodeURI("OrderDish.jsp?~"+Chaptcha+"~"+id+"~"+name+"~"+password);
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

function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}

