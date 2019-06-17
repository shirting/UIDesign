var edit = 0;
var name, Name;
var chaptcha;
var phone;
var address;
var type;
var editinfo;
var number = 0, number1 = 1;
var newdiscount;

function GetOrders() {
    var thisURL = decodeURI(window.location.href);
    name = thisURL.split('~')[1];
    chaptcha = thisURL.split('~')[2];
    var url = encodeURI("RestaurantHistoryOrder.jsp?~" + name + "~" + chaptcha);
    window.location.href = url;
}

function RestaurantInfo() {
    var thisURL = decodeURI(window.location.href);
    name = thisURL.split('~')[1];
    chaptcha = thisURL.split('~')[2];
    var main = document.getElementById("main1");
    var main1 = document.getElementById("main");
    main1.innerHTML = "";
    main.innerHTML = "";
    main.innerHTML += " <div class=\"am-form-group\">\n" +
        "                        <label for=\"chaptcha\" class=\"am-form-label\">编码</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"chaptcha\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"resname\" class=\"am-form-label\">餐厅名</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" id=\"resname\"/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"phone\" class=\"am-form-label\">联系方式</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" id=\"phone\" />\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"address\" class=\"am-form-label\">餐厅地址</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" id=\"address\" style='width:40%'/>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"am-form-group\">\n" +
        "                        <label for=\"type\" class=\"am-form-label\">餐厅类型</label>\n" +
        "                        <div class=\"am-form-content\">\n" +
        "                            <input type=\"text\" readonly=\"readonly\" id=\"type\"/>\n" +
        "                        </div>\n" +
        "                    </div>" +
        "<div class=\"am-form\">\n" +
        "        <button class=\"am-btn am-btn-danger\"  onclick=\"EditRestaurantInfo()\" type=\"submit\" id=\"editinfo\" style='background-position: center;width:15%;margin-left: 20% ' >保存</button>\n" +
        "      </div>";
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"name": name, "chaptcha": chaptcha},
        url: "GetRestaurantInfoServlet",
        success: function (result) {
            //得到该餐厅的所有基本信息
            console.log(result);
            Name = document.getElementById("resname");
            // console.log(Name.length);
            chaptcha = document.getElementById("chaptcha");
            phone = document.getElementById("phone");
            address = document.getElementById("address");
            type = document.getElementById("type");
            chaptcha.value = result.chaptcha;
            Name.value = result.resName;
            phone.value = result.phone;
            address.value = result.resAddress;
            type.value = result.restype;
        }
    })
}

function RestaurantLogout() {
    //跳转至登录的主界面
    var url = encodeURI("index.jsp");
    window.location.href = url;
}

function EditRestaurantInfo() {
    chaptcha = document.getElementById("chaptcha");
    Name = document.getElementById("resname");
    phone = document.getElementById("phone");
    address = document.getElementById("address");
    type = document.getElementById("type");
    editinfo = document.getElementById("editinfo");
    //餐厅名、联系方式、餐厅类型、餐厅地址
    //提交新的信息给经理审核
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            "name": Name.value,
            "chaptcha": chaptcha.value,
            "phone": phone.value,
            "address": address.value,
            "type": type.value
        },
        url: "EditRestaurantInfoServlet",
        success: function (result) {
            alert(result);
            var thisURL = decodeURI(window.location.href);
            var name = thisURL.split('~')[1];
            var chaptcha = thisURL.split('~')[2];
            var url = encodeURI("Restaurant.jsp?~" + name + "~" + chaptcha);
            window.location.href = url;
        }
    })
}

function Dishes() {
    //得到已有的菜品显示
    //添加一个新增菜品的按钮
    //得到已有的套餐并显示
    //添加一个新增套餐的按钮
    var thisURL = decodeURI(window.location.href);
    name = thisURL.split('~')[1];
    chaptcha = thisURL.split('~')[2];
    var main1 = document.getElementById("main1");
    main1.innerHTML = "";
    //得到已有的优惠
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"chaptcha": chaptcha},
        url: "GetRestaurantDishServlet",
        success: function (result) {
            console.log(result)
            var main = document.getElementById("main1");
            main.innerHTML = "<div id=\"success\">\n" +
                "</div>\n" +
                "<a>新增菜品</a>\n" +
                "<div id=\"newdish\">\n" +
                "<div  id='" + number1 + "'>\n" +
                "    名称：\n" +
                "    <input id=\"DishName\" type=\"text\"/>\n" +
                " <br><br>   价格：\n" +
                "    <input id=\"DishPrice\" type=\"text\"/>\n" +
                "<br><br>    数量：\n" +
                "    <input id=\"DishAmount\" type=\"text\"/>\n" +
                "  <br><br>  介绍：\n" +
                "    <input id=\"Dishinfo\" type=\"text\"/>\n" +
                "  <br><br>  开始时间：\n" +
                "    <input id=\"startTime\" type=\"date\" value=\"2019-03-20\"/>\n" +
                " <br><br>   截止时间：\n" +
                "    <input id=\"endTime\" type=\"date\" value=\"2019-03-20\"/>\n" +
                "<br><br>" +
                "</div>\n" +
                "<div id='discount'>\n" +
                "</div>\n" +
                "</div>\n" +
                "<button  class=\"btn btn-danger btn-sm\" onclick='DeleteDish(" + number1 + ")'>删除</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-success btn-sm\" onclick=\"AddDish()\">添加</button>";
            var success = document.getElementById("success");
            //var doing =document.getElementById("doing");

            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                success.innerHTML += "<div class=\"shopmenu-food ng-isolate-scope\" ng-class=\"{noimg: !food.image_path}\"\n" +
                    "                                 id=\"1721446724\" ng-repeat=\"food in category.foods\" shop-menu-item=\"\" food=\"food\"\n" +
                    "                                 shop=\"shopCache\"><!-- ngIf: food.image_path --><span class=\"col-1 ng-scope\"\n" +
                    "                                                                                      ng-if=\"food.image_path\"><a\n" +
                    "                                    href=\"javascript:\" ng-click=\"showInfo(food)\"><img\n" +
                    "                                    ng-src=\"//fuss10.elemecdn.com/6/f8/b5a4ac071e1a27e5cc5fbe5c7b517jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85\"\n" +
                    "                                    alt=\"单人套餐的图片\"\n" +
                    "                                    src=\"//fuss10.elemecdn.com/6/f8/b5a4ac071e1a27e5cc5fbe5c7b517jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85\"></a></span>\n" +
                    "                                <!-- end ngIf: food.image_path -->\n" +
                    "                                <div class=\"col-2 shopmenu-food-main\"><h3\n" +
                    "                                        class=\"shopmenu-food-name ui-ellipsis ng-binding\">" + result[i].Dishname + "</h3>\n" +
                    "                                    <p class=\"color-mute ui-ellipsis ng-binding\" tooltip='" + result[i].DishInfo + "'" +
                    "                                    <p>\n" +
                    "                                    <span class=\"color-mute ng-binding\">还剩" + result[i].DishAmount + "份</span></p>\n" +
                    "                                    <p>\n" +
                    "                                    <span class=\"color-mute ng-binding\">" + result[i].DishInfo + "</span></p>\n" +
                    "                                </div>\n" +
                    "                                <span class=\"col-3 shopmenu-food-price color-stress ng-binding\">" + result[i].DishPrice + "<small\n" +
                    "                                        class=\"ng-binding\"></small>\n" +
                    "                                    <!-- ngIf: food.min_purchase && food.min_purchase > 1 --></span> " +
                    "                                    <!-- end ngIf: !cartItem.quantity && menuFood.stock -->\n" +
                    "                                    <!-- ngIf: !menuFood.stock -->\n" +
                    "                                    <!-- ngIf: cartItem.quantity > 0 || cartItem.quantity === '' --></div>\n" +
                    "                                    <!-- end ngIf: !menuFood.hasSpec --><!-- ngIf: menuFood.hasSpec --></div></span>\n" +
                    "                            </div><!-- end ngRepeat: food in category.foods -->";

            }
            success.innerHTML += "<hr>";

        }
    })
}

function Discount() {
    //显示已有的优惠
    //新增优惠
    var thisURL = decodeURI(window.location.href);
    chaptcha = thisURL.split('~')[2];
    var main1 = document.getElementById("main1");
    main1.innerHTML = "";
    //得到已有的优惠
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"chaptcha": chaptcha},
        url: "GetRestaurantDiscountServlet",
        success: function (result) {
            console.log(result);
            var main = document.getElementById("main1");
            main.innerHTML =
                "<div id=\"success\">\n" +
                "    已有优惠：\n" +
                "</div>\n" +
                "<a>新增优惠</a>\n" +
                "<div id=\"newdiscount\">\n" +
                "<div id='" + number + "'>\n" +
                "    满：\n" +
                "    <input id=\"FullPrice\" type=\"text\"/>\n" +
                "    减：\n" +
                "    <input id=\"MinusPrice\" type=\"text\"/>\n" +
                "  <br><br>  开始时间：\n" +
                "    <input id=\"startTime\" type=\"date\" value=\"2019-06-01\"/>\n" +
                " <br><br>   截止时间：\n" +
                "    <input id=\"endTime\" type=\"date\" value=\"2019-06-01\"/>\n" +
                "</div>\n" +
                "<div id='discount'>\n" +
                "</div>\n" +
                "</div>\n" +
                "<button onclick=\"AddDiscount()\">添加</button>" +
                "                    <div class=\"add-dress\">\n" +
                "\n" +
                "                        <!--标题 -->\n" +
                "                        <div class=\"am-cf am-padding\">\n" +
                "                            <div class=\"am-fl am-cf\"><strong class=\"am-text-danger am-text-lg\">新增地址</strong> /\n" +
                "                                <small>Add&nbsp;address</small>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <hr/>\n" +
                "\n" +
                "                        <div class=\"am-u-md-12 am-u-lg-8\" style=\"margin-top: 20px;\">\n" +
                "                            <form class=\"am-form am-form-horizontal\" id=\"newaddress\">\n" +
                "                                <div class=\"am-form-group\">\n" +
                "                                    <div class=\"am-form-content address\">\n" +
                "                                        <select data-am-selected id=\"prov\" onchange=\"showCity(this)\">\n" +
                "                                            <option>=请选择省份=</option>\n" +
                "\n" +
                "                                        </select>\n" +
                "\n" +
                "                                        <!--城市选择-->\n" +
                "                                        <select data-am-selected id=\"city\" onchange=\"showCountry(this)\">\n" +
                "                                            <option>=请选择城市=</option>\n" +
                "                                        </select>\n" +
                "\n" +
                "                                        <!--县区选择-->\n" +
                "                                        <select data-am-selected id=\"country\" onchange=\"selecCountry(this)\">\n" +
                "                                            <option>=请选择县区=</option>\n" +
                "                                        </select>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "\n" +
                "                                <div class=\"am-form-group\">\n" +
                "                                    <label for=\"ANewAddress\" class=\"am-form-label\">详细地址</label>\n" +
                "                                    <div class=\"am-form-content\">\n" +
                "                                        <textarea class=\"\" rows=\"3\" id=\"ANewAddress\" placeholder=\"输入详细地址\"></textarea>\n" +
                "                                        <small>100字以内写出你的详细地址...</small>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "\n" +
                "                                <div class=\"am-form-group\">\n" +
                "                                    <div class=\"am-u-sm-9 am-u-sm-push-3\">\n" +
                "                                        <a class=\"am-btn am-btn-danger\" onClick=\"showAddr()\">保存</a>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </form>\n" +
                "                        </div>\n" +
                "\n" +
                "                    </div>\n";
            var success = document.getElementById("success");
            //var doing =document.getElementById("doing");
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                success.innerHTML +=
                    "<div>  \n" +
                    " 满：\n" +
                    result[i].Full +
                    "    减：\n" +
                    result[i].Minus +
                    "<div>  \n" +
                    " 开始时间：\n" +
                    result[i].StartTime.split(" ")[0] +
                    "    截止时间：\n" +
                    result[i].EndTime.split(" ")[0] +
                    "</div>  \n" +
                    "<button onclick='deleteDiscount(" + result[i].Full + "," + chaptcha + "," + result[i].Minus + ")'>删除</button>";
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
function DeleteDiscount(Num) {
    Num = Num + "";
    var deletediscount = document.getElementById(Num);
    deletediscount.innerHTML = "";
}

function AddDiscount() {
    var thisURL = decodeURI(window.location.href);
    name = thisURL.split('~')[1];
    chaptcha = thisURL.split('~')[2];
    //var FullPrice=new Array();
    //var MinusPrice=new Array();
    var full, minus, starttime, endtime;
    newdiscount = document.getElementById("newdiscount");
    //alert(newdiscount.childNodes[1].childElementCount);
    if (newdiscount.childNodes[1].childElementCount != 0) {
        console.log(newdiscount.childNodes[1].children[0].value);
        full = newdiscount.childNodes[1].children[0].value;
        minus = newdiscount.childNodes[1].children[1].value;
        starttime = newdiscount.childNodes[1].children[4].value;
        endtime = newdiscount.childNodes[1].children[7].value;
        console.log(starttime);
        console.log(endtime);
        //alert(FullPrice);
        //alert(FullPrice);
        //FullPrice.push(full);
        //MinusPrice.push(minus);
    }

    //alert(FullPrice);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "AddDiscountServlet",
        traditional: true,
        data: {
            "FullPrice": full,
            "MinusPrice": minus,
            "chaptcha": chaptcha,
            "StartTime": starttime,
            "EndTime": endtime
        },
        success: function (result) {
            //alert(result);
            if (result[0] == "fail") {
                var thisURL = decodeURI(window.location.href);
                name = thisURL.split('~')[1];
                chaptcha = thisURL.split('~')[2];
                var url = encodeURI("Restaurant.jsp?~" + name + "~" + chaptcha);
                window.location.href = url;
            } else {
                if (result[0] == "success") {
                    alert("添加失败");
                } else {
                    alert("已存在满" + result[0] + "的优惠");
                }
            }
            //返回一个String数组：如果已有一样的申请返回该申请的full和minus(String类型);如果成功String[0]=="Success";失败=="Fail";
        }
    });
}

function AddDish() {
    var name = document.getElementById("DishName").value;
    if (name == null || name == "") {
        alert("请填写菜名");
    }
    var price = document.getElementById("DishPrice").value;
    if (price == null || price == "") {
        alert("请填写菜价");
    }
    var DishAmount = document.getElementById("DishAmount").value;
    if (DishAmount == null || DishAmount == "") {
        alert("请填写数量");
    }
    var Dishinfo = document.getElementById("Dishinfo").value;
    if (Dishinfo == null || Dishinfo == "") {
        alert("请填写菜品的详细信息");
    }
    var startTime = document.getElementById("startTime").value;
    if (startTime == null || startTime == "") {
        alert("请填写开始时间");
    }
    var endTime = document.getElementById("endTime").value;
    if (endTime == null || endTime == "") {
        alert("请填写截止时间");
    }
    var thisURL = decodeURI(window.location.href);
    chaptcha = thisURL.split('~')[2];
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "AddDishServlet",
        traditional: true,
        data: {
            "name": name,
            "price": price,
            "DishAmount": DishAmount,
            "Dishinfo": Dishinfo,
            "chaptcha": chaptcha,
            "startTime": startTime,
            "endTime": endTime,
        },
        success: function (result) {
            if (!result) {
                alert("添加新菜品成功");
                var thisURL = decodeURI(window.location.href);
                name = thisURL.split('~')[1];
                chaptcha = thisURL.split('~')[2];
                var url = encodeURI("Restaurant.jsp?~" + name + "~" + chaptcha);
                window.location.href = url;
            } else {
                alert("添加新菜品失败");
            }
        }
    })

}

//添加一个删除已有优惠的方法，需要参数
function deleteDiscount(full, chaptcha, minus) {
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
            //alert(result);
            if (!result) {
                alert("删除成功");
                var thisURL = decodeURI(window.location.href);
                var name = thisURL.split('~')[1];
                var chaptcha = thisURL.split('~')[2];
                var url = encodeURI("Restaurant.jsp?~" + name + "~" + chaptcha);
                window.location.href = url;
            } else {
                alert("删除失败");
            }
        }
    })
}
