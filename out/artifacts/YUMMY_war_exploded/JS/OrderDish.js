var thisURL = decodeURI(window.location.href);
var chaptcha = thisURL.split('~')[1];
var memberid = thisURL.split('~')[2];
var membername = thisURL.split('~')[3];
var memberpassword = thisURL.split('~')[4];
var reslocation = thisURL.split('~')[5];
var resphone = thisURL.split('~')[6];
var Dishid = [];
var Dishamount = [];

function GetDishInfo() {
    var thisURL = decodeURI(window.location.href);
    var chaptcha = thisURL.split('~')[1];
    console.log(resphone)
    document.getElementById("resPhone").innerText = resphone;
    document.getElementById("resLoc").innerText = reslocation;


    console.log(chaptcha + ":chaptcha");
    Dishid.clear;
    Dishamount.clear;
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"chaptcha": chaptcha},
        url: "GetDishInfoServlet",
        success: function (result) {
            console.log(result);
            var ttime = Math.random() * (50 - 20) + 20;
            ttime = parseFloat(ttime).toFixed(0);
            document.getElementById("arrrr").innerText = ttime + " min";
            var orderdish = document.getElementById("orderdish");
            orderdish.innerHTML = "";
            for (var i = 0; i < result.length; i++) {
                orderdish.innerHTML += "<div class=\"shopmenu-food ng-isolate-scope\" ng-class=\"{noimg: !food.image_path}\"\n" +
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
                    "                                </div>\n" +
                    "                                <span class=\"col-3 shopmenu-food-price color-stress ng-binding\">" + result[i].DishPrice + "<small\n" +
                    "                                        class=\"ng-binding\"></small>\n" +
                    "                                    <!-- ngIf: food.min_purchase && food.min_purchase > 1 --></span> " +
                    "<div class=\"shop-cartctrl ng-scope\" ng-if=\"cartItem.quantity > 0 || cartItem.quantity === ''\"><button class=\"ctrl minus\"  onclick='deletedish(" + result[i].DishesID + "," + result[i].DishAmount + ")'    ng-click=\"cartItem.sub($event)\">-</button><input id='" + result[i].DishesID + "' class=\"ctrl quantity ng-pristine ng-valid\" placeholder=0 min=\"0\" ng-model=\"cartItem.quantity\" ng-change=\"cartItem.update(cartItem.quantity)\"><button class=\"ctrl plus\"   onclick='adddish(" + result[i].DishesID + "," + result[i].DishAmount + ")'   ng-click=\"cartItem.add($event)\">+</button></div>" +
                    "                                    <!-- end ngIf: !cartItem.quantity && menuFood.stock -->\n" +
                    "                                    <!-- ngIf: !menuFood.stock -->\n" +
                    "                                    <!-- ngIf: cartItem.quantity > 0 || cartItem.quantity === '' --></div>\n" +
                    "                                    <!-- end ngIf: !menuFood.hasSpec --><!-- ngIf: menuFood.hasSpec --></div></span>\n" +
                    "                            </div><!-- end ngRepeat: food in category.foods -->";

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
            for (var i = 0; i < result.MemberAddress.length; i++) {
                memberaddress.innerHTML += "<option value='" + result.MemberAddress[i] + "'>" + result.MemberAddress[i] + "</option>";
            }
        }
    })
}

function deletedish(dishid, amount) {
    var orderdish = document.getElementById("orderdish");
    var number = parseInt(document.getElementById(dishid).placeholder);
    var context = document.getElementById("context");
    context.value = "";
    var All = document.getElementById("All");
    var dis = document.getElementById("dis");
    var newall = document.getElementById("newall");
    var candis = false;
    context.value = "";
    var all = 0;
    if (number > 0) {
        number = number - 1;
    }
    if (Dishid.length > 0) {
        for (var j = 0; j < Dishid.length; j++) {
            if (Dishid[j] == dishid) {
                Dishamount[j] = number;
                exist = true;
                break;
            }
        }
        if (!exist) {
            Dishid.push(dishid);
            Dishamount.push(number);
        }
    } else {
        Dishid.push(dishid);
        Dishamount.push(number);
    }
    document.getElementById(dishid).placeholder = number;
    for (var i = 0; i < orderdish.children.length; i++) {
        var dishnumber = parseInt(orderdish.children[i].children[3].children[1].placeholder);
        var price = parseInt(orderdish.children[i].children[2].innerText);
        if (dishnumber > 0) {
            console.log(dishnumber);
            context.value = context.value + orderdish.children[i].children[1].children[0].innerText + ":" + dishnumber + "份";
            all = price * dishnumber + all;
        }
    }
    All.value = all + "元";
    //更新订单详情
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetRestaurantDiscountServlet",
        cache: false,
        data: {"chaptcha": chaptcha},
        success: function (result) {
            console.log(result);
            if (result.length > 1) {
                for (var i = 0; i < result.length - 1; i++) {
                    if (result[i].Full <= all && all < result[i + 1].Full) {
                        all = all - result[i].Minus;
                        dis.value = "满" + result[i].Full + "减" + result[i].Minus + ";";
                        candis = true;
                        break;
                    }
                }
                if (!candis) {
                    if (result[result.length - 1].Full <= all) {
                        all = all - result[i].Minus;
                        dis.value = "满" + result[result.length - 1].Full + "减" + result[result.length - 1].Minus + ";";
                    } else {
                        dis.value = "0元;";
                    }
                }
            } else {
                if (result.length == 1) {
                    if (result[0].Full < all) {
                        all = all - result[0].Minus;
                        dis.value = "满" + result[0].Full + "减" + result[0 + 1].Full + ";";
                    }
                } else {
                    dis.value = "0元;";
                }
            }
        }

    })
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetMemberInfoServlet",
        cache: false,
        data: {"id": memberid},
        success: function (result) {
            console.log(result);
            if (result.memberLevel > 0) {
                all = all * (1 - result.memberLevel * 0.1).toFixed(2);
                dis.value = dis.value + "会员折扣:" + (1 - result.memberLevel * 0.1) + "折";
                newall.value = parseFloat(all).toFixed(2) + "元";
            } else {
                newall.value = parseFloat(all).toFixed(2) + "元";
            }

        }
    })
}

function adddish(dishid, amount) {

    var orderdish = document.getElementById("orderdish");

    var number = parseInt(document.getElementById(dishid).placeholder);
    var all = 0;
    var context = document.getElementById("context");
    var All = document.getElementById("All");
    var dis = document.getElementById("dis");
    var newall = document.getElementById("newall");
    var candis = false;
    var exist = false;
    context.value = "";
    if (number < amount) {
        number = number + 1;
    }
    document.getElementById(dishid).placeholder = number;
    if (Dishid.length > 0) {
        for (var j = 0; j < Dishid.length; j++) {
            if (Dishid[j] == dishid) {
                Dishamount[j] = number;
                exist = true;
                break;
            }
        }
        if (!exist) {
            Dishid.push(dishid);
            Dishamount.push(number);
        }
    } else {
        Dishid.push(dishid);
        Dishamount.push(number);
    }
    for (var i = 0; i < orderdish.children.length; i++) {
        var dishnumber = parseInt(orderdish.children[i].children[3].children[1].placeholder);
        console.log(dishnumber)
        var price = parseInt(orderdish.children[i].children[2].innerText);
        console.log(price)
        if (dishnumber > 0) {
            context.value = context.value + orderdish.children[i].children[1].children[0].innerText + ":" + dishnumber + "份";
            all = price * dishnumber + all;
        }
    }
    All.value = all + "元";
    //需要添加优惠
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetRestaurantDiscountServlet",
        cache: false,
        data: {"chaptcha": chaptcha},
        success: function (result) {
            console.log(result);
            if (result.length > 1) {
                for (var i = 0; i < result.length - 1; i++) {
                    if (result[i].Full <= all && all < result[i + 1].Full) {
                        all = all - result[i].Minus;
                        dis.value = "满" + result[i].Full + "减" + result[i].Minus + ";";
                        candis = true;
                        break;
                    }
                }
                if (!candis) {
                    if (result[result.length - 1].Full <= all) {
                        all = all - result[i].Minus;
                        dis.value = "满" + result[result.length - 1].Full + "减" + result[result.length - 1].Minus + ";";
                    } else {
                        dis.value = "0元;";
                    }
                }
            } else {
                if (result.length == 1) {
                    if (result[0].Full < all) {
                        all = all - result[0].Minus;
                        dis.value = "满" + result[0].Full + "减" + result[0 + 1].Full + ";";
                    }
                } else {
                    dis.value = "0元;";
                }
            }
        }

    })
    //得到会员的等级优惠
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetMemberInfoServlet",
        cache: false,
        data: {"id": memberid},
        success: function (result) {
            console.log(result);
            if (result.memberLevel > 0) {
                all = all * (1 - result.memberLevel * 0.1).toFixed(2);
                dis.value = dis.value + "会员折扣:" + (1 - result.memberLevel * 0.1) + "折";
                newall.value = parseFloat(all).toFixed(2) + "元";
            } else {
                newall.value = parseFloat(all).toFixed(2) + "元";
            }
        }
    })
}

function uploadorder() {
    //得到订单详情和总价，会员的信息，店铺的信息，当前时间（精确到秒），存入数据库，状态为未支付
    var orderdish = document.getElementById("orderdish").value;
    var Context = document.getElementById("context").value;
    var discount = document.getElementById("dis").value;
    var newall = parseFloat(document.getElementById("newall").value);
    var address = document.getElementById("memberaddress");
    var Address;
    for (var i = 0; i < address.length; i++) {
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
            "Address": Address,
            "price": newall,
            "discount": discount,
            "chaptcha": chaptcha,
            "memberid": memberid,
            "Dishid": Dishid,
            "Dishamount": Dishamount,
        },
        success: function (result) {
            if (result == "success") {
                alert("成功生成该订单");
                //跳转至正在进行的订单界面
                var url = encodeURI("MemberNowOrder.jsp?~" + memberid + "~" + membername + "~" + memberpassword);
                window.location.href = url;
            } else {
                if (result == "fail") {
                    alert("未成功生成该订单");
                } else {
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
function member() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[2];
    var name = thisURL.split('~')[3];
    var password = thisURL.split('~')[4];
    var url = encodeURI("Member.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberNowOrder() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[2];
    var name = thisURL.split('~')[3];
    var password = thisURL.split('~')[4];
    var url = encodeURI("MemberNowOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberHistoryOrders() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[2];
    var name = thisURL.split('~')[3];
    var password = thisURL.split('~')[4];
    var url = encodeURI("MemberHistoryOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function DeleteMember() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"name": name, "id": id},
        url: "DeleteMemberServlet",
        success: function (result) {
            if (result == "fail") {
                alert("注销成功");
                var url = encodeURI("index.jsp");
                window.location.href = url;
            } else {
                alert("注销失败");
            }
        }
    });
}

function Main() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("Main.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function Logout() {
    var url = encodeURI("index.jsp");
    window.location.href = url;
}

