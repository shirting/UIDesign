var edit=1;
var name,Name;
var chaptcha;
var phone;
var address;
var type;
var editinfo;
var number=0,number1=1;
var newdiscount;
function GetOrders(){
    var thisURL=decodeURI(window.location.href);
    name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    var url=encodeURI("RestaurantHistoryOrder.jsp?~"+name+"~"+chaptcha);
    window.location.href=url;
}
function RestaurantInfo(){
    var thisURL=decodeURI(window.location.href);
    name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    var main=document.getElementById("main");
    main.innerHTML ="";
    main.innerHTML +=" <div class=\"am-form-group\">\n" +
        "                        <label for=\"chaptcha\" class=\"am-form-label\">编码：</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"chaptcha\" style=\"border:none\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"resname\" class=\"am-form-label\">餐厅名：</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"resname\" style=\"border:none\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"phone\" class=\"am-form-label\">联系方式：</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"phone\" style=\"border:none\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"address\" class=\"am-form-label\">餐厅地址：</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"address\" style=\"border:none\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"type\" class=\"am-form-label\">餐厅类型：</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"type\" style=\"border:none\"/>\n" +
        "                        </div>\n" +
        "                    </div>";
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{"name":name,"chaptcha":chaptcha},
        url:"GetRestaurantInfoServlet",
        success:function(result){
            //得到该餐厅的所有基本信息
            console.log(result);
            Name=document.getElementById("resname");
           // console.log(Name.length);
            chaptcha=document.getElementById("chaptcha");
            phone=document.getElementById("phone");
            address=document.getElementById("address");
            type=document.getElementById("type");
            chaptcha.value=result.chaptcha;
            Name.value=result.resName;
            phone.value=result.phone;
            address.value=result.resAddress;
            type.value=result.restype;
        }
    })
}
function RestaurantLogout(){
    //跳转至登录的主界面
    var url=encodeURI("index.jsp");
    window.location.href=url;
}
function EditRestaurantInfo(){
    chaptcha=document.getElementById("chaptcha");
    Name=document.getElementById("resname");
    phone=document.getElementById("phone");
    address=document.getElementById("address");
    type=document.getElementById("type");
    editinfo=document.getElementById("editinfo");
    //餐厅名、联系方式、餐厅类型、餐厅地址
    if((edit%2)==1){
        //修改
        alert(edit%2);
        Name.removeAttribute("readOnly");
        phone.removeAttribute("readOnly");
        address.removeAttribute("readOnly");
        type.removeAttribute("readOnly");
        Name.setAttribute("style", "border:solid");
        phone.setAttribute("style", "border:solid");
        address.setAttribute("style", "border:solid");
        type.setAttribute("style", "border:solid");
        editinfo.innerText ="提交";
        edit++;
    }else{
        //提交新的信息给经理审核
        $.ajax({
            type:"POST",
            dataType:"json",
            data:{
                "name":Name.value,
                "chaptcha":chaptcha.value,
                "phone":phone.value,
                "address":address.value,
                "type":type.value
            },
            url:"EditRestaurantInfoServlet",
            success:function(result) {
                alert(result);
                var thisURL=decodeURI(window.location.href);
                var name=thisURL.split('~')[1];
                var chaptcha=thisURL.split('~')[2];
                var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
                window.location.href=url;
            }
        })
    }
}
function Dishes(){
    //得到已有的菜品显示
    //添加一个新增菜品的按钮
    //得到已有的套餐并显示
    //添加一个新增套餐的按钮
    var thisURL=decodeURI(window.location.href);
    name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    //得到已有的优惠
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{"chaptcha":chaptcha},
        url:"GetRestaurantDishServlet",
        success:function(result){
            console.log(result)
            var main = document.getElementById("main");
            main.innerHTML="<div id=\"success\">\n" +
                "    已有菜品：\n" +
                "</div>\n" +
                "<a>新增菜品</a>\n" +
                "<div id=\"newdish\">\n" +
                "<div id='"+number1+"'>\n"+
                "    名称：\n" +
                "    <input id=\"DishName\" type=\"text\"/>\n" +
                "    价格：\n" +
                "    <input id=\"DishPrice\" type=\"text\"/>\n" +
                "    数量：\n" +
                "    <input id=\"DishAmount\" type=\"text\"/>\n" +
                "    介绍：\n" +
                "    <input id=\"Dishinfo\" type=\"text\"/>\n" +
                "    开始时间：\n" +
                "    <input id=\"startTime\" type=\"date\" value=\"2019-03-20\"/>\n" +
                "    截止时间：\n" +
                "    <input id=\"endTime\" type=\"date\" value=\"2019-03-20\"/>\n" +
                "<button onclick='DeleteDish("+number1+")'>删除</button>"+
                "</div>\n"+
                "<div id='discount'>\n" +
                "</div>\n"+
                "</div>\n" +
                "<button onclick=\"AddDish()\">添加</button>";
            var success=document.getElementById("success");
            //var doing =document.getElementById("doing");

            for(var i=0;i<result.length;i++){
                console.log(result[i]);
                success.innerHTML +="<div>"+
                    "名称："+
                    result[i].Dishname+
                    "&nbsp&nbsp"+
                    "价格："+
                    result[i].DishPrice+
                    "&nbsp&nbsp"+
                    "数量："+
                    result[i].DishAmount+
                    "&nbsp&nbsp"+
                    "介绍："+
                    result[i].DishInfo+
                    "&nbsp&nbsp"+
                    "开始时间："+
                    result[i].StartTime+
                    "&nbsp&nbsp"+
                    "截止时间："+
                    result[i].EndTime+
                    "&nbsp&nbsp"+
                    "</div>\n";
                    }
            success.innerHTML += "<hr>";
        }
    })
}
function Discount(){
    //显示已有的优惠
    //新增优惠
    var thisURL=decodeURI(window.location.href);
    chaptcha=thisURL.split('~')[2];
    //得到已有的优惠
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{"chaptcha":chaptcha},
        url:"GetRestaurantDiscountServlet",
        success:function(result){
            var main = document.getElementById("main");
            main.innerHTML="<div id=\"success\">\n" +
                "    已有优惠：\n" +
                "</div>\n" +
                "<a>新增优惠</a>\n" +
                "<div id=\"newdiscount\">\n" +
                "<div id='"+number+"'>\n"+
                "    满：\n" +
                "    <input id=\"FullPrice\" type=\"text\"/>\n" +
                "    减：\n" +
                "    <input id=\"MinusPrice\" type=\"text\"/>\n" +
                "<button onclick='DeleteDiscount("+number+")'>删除</button>"+
                "</div>\n"+
                "<div id='discount'>\n" +
                "</div>\n"+
                "</div>\n" +
                "<button onclick=\"AddDiscount()\">添加</button>";
            var success=document.getElementById("success");
            //var doing =document.getElementById("doing");
            for(var i=0;i<result.length;i++){
                console.log(result[i]);
                    success.innerHTML +=
                        "<div>  \n" +
                        " 满：\n" +
                        result[i].Full+
                        "    减：\n" +
                        result[i].Minus+
                        "</div>  \n" +
                        "<button onclick='deleteDiscount("+result[i].Full+","+chaptcha+","+result[i].Minus+")'>删除</button>";
            }
        }
    })
}
/*
function NewDiscount(){
    number++;
    newdiscount=document.getElementById("discount");
    newdiscount.innerHTML +="<div id='"+number+"'>\n"+
        "    满：\n" +
        "    <input id=\"FullPrice\" type=\"text\"/>\n" +
        "    减：\n" +
        "    <input id=\"MinusPrice\" type=\"text\"/>\n" +
        "<button onclick='DeleteDiscount("+number+")'>删除</button>"+
        "</div>\n" ;
}
*/
function DeleteDiscount(Num){
    Num=Num+"";
    var deletediscount=document.getElementById(Num);
    deletediscount.innerHTML ="";
}
function AddDiscount(){
    var thisURL=decodeURI(window.location.href);
    name=thisURL.split('~')[1];
    chaptcha=thisURL.split('~')[2];
    //var FullPrice=new Array();
    //var MinusPrice=new Array();
    var full,minus;
    newdiscount=document.getElementById("newdiscount");
        //alert(newdiscount.childNodes[1].childElementCount);
        if(newdiscount.childNodes[1].childElementCount!=0){
            console.log(newdiscount.childNodes[1].children[0].value);
            full=newdiscount.childNodes[1].children[0].value;
            minus=newdiscount.childNodes[1].children[1].value;
            console.log(full);
            console.log(minus);
            //alert(FullPrice);
            //alert(FullPrice);
            //FullPrice.push(full);
            //MinusPrice.push(minus);
        }

    //alert(FullPrice);
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"AddDiscountServlet",
        traditional: true,
        data:{
            "FullPrice":full,
            "MinusPrice":minus,
            "chaptcha":chaptcha
        },
        success:function(result){
            //alert(result);
            if(result[0]=="fail"){
                var thisURL=decodeURI(window.location.href);
                name=thisURL.split('~')[1];
                chaptcha=thisURL.split('~')[2];
                var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
                window.location.href=url;
            }else{
                if(result[0]=="success"){
                    alert("添加失败");
                }else{
                    alert("已存在满"+result[0]+"的优惠");
                }
            }
            //返回一个String数组：如果已有一样的申请返回该申请的full和minus(String类型);如果成功String[0]=="Success";失败=="Fail";
        }
    });
}
function AddDish(){
    var name=document.getElementById("DishName").value;
    if(name==null||name==""){
        alert("请填写菜名");
    }
    var price=document.getElementById("DishPrice").value;
    if(price==null||price==""){
        alert("请填写菜价");
    }
    var DishAmount=document.getElementById("DishAmount").value;
    if(DishAmount==null||DishAmount==""){
        alert("请填写数量");
    }
    var Dishinfo=document.getElementById("Dishinfo").value;
    if(Dishinfo==null||Dishinfo==""){
        alert("请填写菜品的详细信息");
    }
    var startTime=document.getElementById("startTime").value;
    if(startTime==null||startTime==""){
        alert("请填写开始时间");
    }
    var endTime=document.getElementById("endTime").value;
    if(endTime==null||endTime==""){
        alert("请填写截止时间");
    }
    var thisURL=decodeURI(window.location.href);
    chaptcha=thisURL.split('~')[2];
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"AddDishServlet",
        traditional: true,
        data:{
            "name":name,
            "price":price,
            "DishAmount":DishAmount,
            "Dishinfo":Dishinfo,
            "chaptcha":chaptcha,
            "startTime":startTime,
            "endTime":endTime,
        },
        success:function(result){
            if(!result){
                alert("添加新菜品成功");
                var thisURL=decodeURI(window.location.href);
                name=thisURL.split('~')[1];
                chaptcha=thisURL.split('~')[2];
                var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
                window.location.href=url;
            }else{
                alert("添加新菜品失败");
            }
        }
    })

}

//添加一个删除已有优惠的方法，需要参数
function deleteDiscount(full,chaptcha,minus){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "DeleteDiscountServlet",
        traditional: true,
        data: {
            "full": full,
            "minus": minus,
            "chaptcha": chaptcha
        },
        success: function (result) {
            alert(result);
            if(!result){
                alert("删除成功");
                var thisURL=decodeURI(window.location.href);
                var name=thisURL.split('~')[1];
                var chaptcha=thisURL.split('~')[2];
                var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
                window.location.href=url;
            }else{
                alert("删除失败");
            }
        }
    })
}
