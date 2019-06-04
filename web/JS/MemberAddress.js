var edit = 1;
var Name, NameV;
var Id;
var Password, PasswordV;
var Phone, PhoneV;
var Email, EmailV;
var Account, AccountV;
var Balance;
var Credit;
var Level;
var Address;
var save;
var address;
var NName;
var NPassword;
var NPhone;
var NEmail;
var NAccount;
var Add;
var number = 1;

function memberaddress() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var PassWord = thisURL.split('~')[3];
    Address = document.getElementById("Naddress");
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {"membername": name, "memberid": id},
        url: "GetMemberAddressServlet",
        success: function (result1) {
            //alert("地址信息");
            var jo1 = eval(result1);
            address = jo1.MemberAddress;
            for (var i = 0; i < address.length; i++) {
                console.log(address[i]);
                var prov=address[i].split("-")[0];
                var city=address[i].split("-")[1];
                var dist=address[i].split("-")[2];
                var street=address[i].split("-")[3];
                console.log(prov);
                Address.innerHTML += " <div value='"+address[i]+"' id='"+address[i]+"'><li class=\"user-addresslist defaultAddr\">\n" +
                    "                                <span class=\"new-option-r\"></span>\n" +
                    "                                <p class=\"new-tit new-p-re\">\n" +
                    "                                    <span></span>\n" +
                    "                                    <span></span>\n" +
                    "                                </p>\n" +
                    "                                <div class=\"new-mu_l2a new-p-re\">\n" +
                    "                                    <p class=\"new-mu_l2cw\">\n" +
                    "                                        <span class=\"title\">地址：</span>\n" +
                    "                                        <span class=\"province\">"+prov+"</span>\n" +
                    "                                        <span class=\"city\">"+city+"</span>\n" +
                    "                                        <span class=\"dist\">"+dist+"</span>\n" +
                    "                                        <span class=\"street\">"+street+"</span></p>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"new-addr-btn\">\n" +
                    "                                    <a onclick=\"Deleteaddress('"+address[i]+"')\"><i class=\"am-icon-trash\"></i>删除</a>\n" +
                    "                                </div>\n" +
                    "                            </li>"+
                    "</div>";
            }
            console.log(address);
        }
    });
}
function Deleteaddress(address){
    var Addresses=[];
    Address = document.getElementById("Naddress").childNodes;
    for (var i = 1; i < Address.length; i=i+2) {
        if(Address[i].id!=address){
            console.log(Address[i]);
            Addresses.push(Address[i].id) ;
        }
        // Address[i].childNodes[1].childNodes[0].setAttribute("readOnly", "readonly");
        //Address[i].childNodes[1].childNodes[0].setAttribute("style", "border:none;width:250px");
    }
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var PassWord = thisURL.split('~')[3];
    $.ajax({
        type: "POST",
        dataType: "json",
        traditional: true,
        data: {
            "Id": id,
            "nname": name,
            "naddress": Addresses,
        },
        url: "EditMemberAddressServlet",
        success: function (result) {
            if (result=="fail") {
                //alert("成功");
                var url=encodeURI("MemberAddress.jsp?~"+id+"~"+name+"~"+PassWord);
                window.location.href=url;
            } else {
                alert("删除失败");
            }
        }
    });

}
function showAddr() {
    var a=document.getElementById("Naddress");
    address=document.getElementById("ANewAddress");
    var value=provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country]+'-'+address.value;
    a.innerHTML += " <div value='"+value+"' id='"+value+"'><li class=\"user-addresslist defaultAddr\">\n" +
        "                                <span class=\"new-option-r\"></span>\n" +
        "                                <p class=\"new-tit new-p-re\">\n" +
        "                                    <span></span>\n" +
        "                                    <span></span>\n" +
        "                                </p>\n" +
        "                                <div class=\"new-mu_l2a new-p-re\">\n" +
        "                                    <p class=\"new-mu_l2cw\">\n" +
        "                                        <span class=\"title\">地址：</span>\n" +
        "                                        <span class=\"province\">"+provice[current.prov].name+"</span>\n" +
        "                                        <span class=\"city\">"+provice[current.prov]["city"][current.city].name+"</span>\n" +
        "                                        <span class=\"dist\">"+provice[current.prov]["city"][current.city].districtAndCounty[current.country]+"</span>\n" +
        "                                        <span class=\"street\">"+address.value+"</span></p>\n" +
        "                                </div>\n" +
        "                                <div class=\"new-addr-btn\">\n" +
        "                                    <a onclick=\"Deleteaddress('"+value+"')\"><i class=\"am-icon-trash\"></i>删除</a>\n" +
        "                                </div>\n" +
        "                            </li>"+
        "</div>";
    var Addresses=[];
    Address = document.getElementById("Naddress").childNodes;
    //直接向数据库中添加该地址
    for (var i = 1; i < Address.length; i=i+2) {
            Addresses.push(Address[i].id);
           // Address[i].childNodes[1].childNodes[0].setAttribute("readOnly", "readonly");
            //Address[i].childNodes[1].childNodes[0].setAttribute("style", "border:none;width:250px");
    }
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var PassWord = thisURL.split('~')[3];

    $.ajax({
        type: "POST",
        dataType: "json",
        traditional: true,
        data: {
            "Id": id,
            "nname": name,
            "naddress": Addresses,
        },
        url: "EditMemberAddressServlet",
        success: function (result) {
            if (result=="fail") {
                //alert("修改成功");
                var url=encodeURI("MemberAddress.jsp?~"+id+"~"+name+"~"+PassWord);
                window.location.href=url;
            } else {
                alert("添加失败");
            }
        }
    });
    //四个地址框清空
}

function Main() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("Main.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function member() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("Member.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberNowOrder() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("MemberNowOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function MemberHistoryOrders() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("MemberHistoryOrder.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function Memberaddress() {
    var thisURL = decodeURI(window.location.href);
    var id = thisURL.split('~')[1];
    var name = thisURL.split('~')[2];
    var password = thisURL.split('~')[3];
    var url = encodeURI("MemberAddress.jsp?~" + id + "~" + name + "~" + password);
    window.location.href = url;
}

function Logout() {
    var url = encodeURI("index.jsp");
    window.location.href = url;
}
