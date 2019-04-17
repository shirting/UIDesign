var edit=1;
var Name,NameV;
var Id;
var Password,PasswordV;
var Phone,PhoneV;
var Email,EmailV;
var Account,AccountV;
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
var number=1;
function memberinfo(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var PassWord=thisURL.split('~')[3];
    Name=document.getElementById("name");
    Id=document.getElementById("id");
    Password=document.getElementById("password");
    Phone=document.getElementById("phone");
    Email=document.getElementById("email");
    Account=document.getElementById("account");
    Balance=document.getElementById("balance");
    Credit=document.getElementById("credit");
    Level=document.getElementById("level");
    Address=document.getElementById("Naddress");
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{"name":name,"password":PassWord},
        url:"MemberLoginServlet",
        success:function(result){
           // alert("基本信息");
            var jo=eval(result);
            Password.value=jo.password;
            Name.value=jo.memberName;
            Id.value=jo.memberId;
            Phone.value=jo.memberPhone;
            Email.value=jo.memberEmail;
            Account.value=jo.memberAccount;
            Balance.value=jo.memberBalance;
            Credit.value=jo.memberCredit;
            Level.value=jo.memberLevel;
            $.ajax({
                type:"POST",
                dataType:"json",
                data:{"membername":jo.memberName,"memberid":jo.memberId},
                url:"GetMemberAddressServlet",
                success:function(result1){
                    //alert("地址信息");
                    var jo1=eval(result1);
                    address=jo1.MemberAddress;
                    for(var i=0;i<address.length;i++){
                        Address.innerHTML +="<div class=\"new-mu_l2a new-p-re\">\n" +
                            "<p class=\"new-mu_l2cw\"><input  readonly='readOnly' type='text'  value='"+address[i]+"' id='"+address[i]+"' style='border:none;width:250px'/></p></div>"
                    }
                    console.log(address);
                }
            });
        }
    });
}

function Edit() {
    var Addresses=[];
    var addresses=[];
    Name = document.getElementById("name");
    NameV = Name.value;
    Id = document.getElementById("id");
    //console.log(Id);
    Password = document.getElementById("password");
    PasswordV = Password.value;
    Phone = document.getElementById("phone");
    PhoneV = Phone.value;
    Email = document.getElementById("email");
    EmailV = Email.value;
    Account = document.getElementById("account");
    AccountV = Account.value;
    Balance = document.getElementById("balance");
    Credit = document.getElementById("credit");
    Level = document.getElementById("level");
    Address = document.getElementById("Naddress").childNodes;
    Add=document.getElementById("add");
    for (var i = 1; i < Address.length; i++) {
        if(Address[i].childNodes[1].childElementCount>0) {
            addresses.push(Address[i].childNodes[1].childNodes[0].value);
        }
    }
    save = document.getElementById("save");
    //先保存除了地址外的其他信息，然后修改地址的信息；
//将已有的地址与最新得到的地址比较，得出新增的和删除的两个数组
    if (edit % 2 == 1) {
        Add.innerHTML+="<button onclick='addAddress()'>新增地址</button>" ;
        //编辑
        Name.removeAttribute("readOnly");
        Password.removeAttribute("readOnly");
        Phone.removeAttribute("readOnly");
        Email.removeAttribute("readOnly");
        Account.removeAttribute("readOnly");
        Name.setAttribute("style", "border:solid");
        Password.setAttribute("style", "border:solid");
        Phone.setAttribute("style", "border:solid");
        Email.setAttribute("style", "border:solid");
        Account.setAttribute("style", "border:solid");
        Name.setAttribute("style", "width:200px");
        Password.setAttribute("style", "width:200px");
        Phone.setAttribute("style", "width:200px");
        Email.setAttribute("style", "width:200px");
        Account.setAttribute("style", "width:200px");


        for (var i = 1; i < Address.length; i++) {
            Address[i].childNodes[1].childNodes[0].removeAttribute("readOnly");
            Address[i].childNodes[1].childNodes[0].setAttribute("style", "border:solid");
            Address[i].childNodes[1].childNodes[0].setAttribute("style", "width:250px");
        }
        save.innerText = "保存";
    } else {//保存
        Add.innerHTML="";
        NName = Name.value;
        NPassword = Password.value;
        NPhone = Phone.value;
        NEmail = Email.value;
        NAccount = Account.value;

        for (var i = 1; i < Address.length; i++) {
            if (Address[i].childNodes[1].childElementCount>0) {
                Addresses.push(Address[i].childNodes[1].childNodes[0].value);
                Address[i].childNodes[1].childNodes[0].setAttribute("readOnly", "readonly");
                Address[i].childNodes[1].childNodes[0].setAttribute("style", "border:none;width:250px");
            } else {
                Address.removeChild(Address[i]);
                i--;
            }
        }
        $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "EditMemberInfoServlet",
                    data: {
                        "Id": Id.value,
                        "nname": NName,
                        "npassword": NPassword,
                        "nphone": NPhone,
                        "nemail": NEmail,
                        "naccount": NAccount,
                        "naddress": Addresses,
                        "oaddress": addresses
                    },
                    success: function (result) {
                        if (result=="fail") {
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                traditional: true,
                                data: {
                                    "Id": Id.value,
                                    "nname": NName,
                                    "naddress": Addresses,
                                },
                                url: "EditMemberAddressServlet",
                                success: function (result) {
                                    if (result=="fail") {
                                        alert("修改成功");
                                        var url=encodeURI("Member.jsp?~"+Id.value+"~"+NName+"~"+NPassword);
                                        window.location.href=url;
                                    } else {
                                        alert("修改失败");
                                    }
                                }
                            });

                        } else {
                            alert("修改失败");
                        }
                    }
                });
        Name.setAttribute("style", "border:none");
        Password.setAttribute("style", "border:none");
        Phone.setAttribute("style", "border:none");
        Email.setAttribute("style", "border:none");
        Account.setAttribute("style", "border:none");
        Name.setAttribute("readOnly", "readonly");
        Password.setAttribute("readOnly", "readonly");
        Phone.setAttribute("readOnly", "readonly");
        Email.setAttribute("readOnly", "readonly");
        Account.setAttribute("readOnly", "readonly");
        save.innerText = "编辑";
    }
    edit++;
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

function addAddress(){
    msgbox(1);
}
function Cancel(){
    document.getElementById('newaddress').value="";
    msgbox(0);
}
function msgbox(n) {
    document.getElementById('newaddress').style.display = n ? 'block'
        : 'none'; /* 点击按钮打开/关闭 对话框 */
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
function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}

