var Uuid;
var email;
var wait = 0;
// 120 秒发送一次
var limit = 60;
var timer = null;
var Jquery = $;
var uuid;
var aName,password,confirmpassword,phone,account,chaptcha;
function Member(){
    var member=document.getElementById("info");
    var click=document.getElementById("click");
    member.innerHTML ="<div class=\"user-name\">\n" +
        "                            <label for=\"name\"><i class=\"am-icon-user\"></i></label>\n" +
        "                            <input type=\"text\" name=\"\" id=\"name\" placeholder=\"用户名\">\n" +
        "                        </div>\n" +
        "                        <div class=\"user-pass\">\n" +
        "                            <label for=\"password\"><i class=\"am-icon-lock\"></i></label>\n" +
        "                            <input type=\"password\" name=\"\" id=\"password\" placeholder=\"设置密码\">\n" +
        "                        </div>\n" +
        "                        <div class=\"user-pass\">\n" +
        "                            <label for=\"passwordRepeat\"><i class=\"am-icon-lock\"></i></label>\n" +
        "                            <input type=\"password\" name=\"\" id=\"passwordRepeat\" placeholder=\"确认密码\">\n" +
        "                        </div>\n" +
        "                        <div class=\"user-phone\">\n" +
        "                            <label for=\"phone\"><i class=\"am-icon-mobile-phone am-icon-md\"></i></label>\n" +
        "                            <input type=\"tel\" name=\"\" id=\"phone\" placeholder=\"请输入手机号\">\n" +
        "                        </div>\n" +
        "                        <div class=\"user-phone\">\n" +
        "                            <label for=\"account\"><i class=\"am-icon-mobile-phone am-icon-md\"></i></label>\n" +
        "                            <input type=\"tel\" name=\"\" id=\"account\" placeholder=\"请输入账号\">\n" +
        "                        </div>\n" +
        "                        <div class=\"user-email\">\n" +
        "                            <label for=\"email\"><i class=\"am-icon-envelope-o\"></i></label>\n" +
        "                            <input type=\"email\" name=\"\" id=\"email\" placeholder=\"请输入邮箱账号\">\n" +
        "                            <a href=\"javascript:void(0);\">\n" +
        "                            <select class=\"dyMobileButton1\"  id=\"EmailAddress\">\n" +
        "                                <option value=\"@qq.com\">@qq.com</option>\n" +
        "                                <option value=\"@163.com\">@163.com</option>\n" +
        "                            </select>\n" +
        "                            </a>\n" +
        "                        </div>\n" +
        "                        <div class=\"verification\">\n" +
        "                            <label for=\"chaptcha\"><i class=\"am-icon-code-fork\"></i></label>\n" +
        "                            <input type=\"text\"  id=\"chaptcha\"  placeholder=\"请输入验证码\"/>\n" +
        "                            <a class=\"btn\" href=\"javascript:void(0);\" onclick=\"sendemail();\" id=\"get_code\">\n" +
        "                                <span id=\"dyMobileButton\">获取</span></a>\n" +
        "                        </div>\n" ;
    click.innerHTML ="<div class=\"am-cf\">\n" +
        "                        <input type=\"submit\" onclick=\"MemberRegister()\" name=\"\" value=\"注 册\" class=\"am-btn am-btn-primary am-btn-sm\">\n" +
        "                    </div>";
}


function MemberRegister(){
    //用户名、用户密码、联系电话、账号、邮箱、验证码
    aName=document.getElementById("name").value;
    if(aName==null||aName==""){
        alert("请填写用户名");
    }
    password=document.getElementById("password").value;
    if(password==null||password==""){
        alert("请输入密码");
    }
    confirmpassword=document.getElementById("confirmpassword").value;
    if(confirmpassword==null||confirmpassword==""){
        alert("请确认密码");
    }else{
        if(!password==confirmpassword){
            alert("请重新确认密码");
        }
    }
    phone=document.getElementById("phone").value;
    if(phone==null||phone==""){
        alert("请输入联系方式");
    }
    account=document.getElementById("account").value;
    if(account==null||account==""){
        alert("请输入账号");
    }
    address=document.getElementById("Naddress").value;
    console.log(address);
    if(address==""||address==null){
        alert("请输入地址");
    }
    chaptcha=document.getElementById("chaptcha").value;
    if(chaptcha==null||chaptcha==""){
        alert("请输入验证码");
    }else {
        if (!chaptcha==uuid) {
            alert("验证码不正确");
        }else{
            //后端传数据
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    "name": aName,
                    "password": password,
                    "phone": phone,
                    "account": account,
                    "address":address,
                    "email":email
                },
                url: "MemberRegisterServlet",
                success: function (result) {
                    if(result=="注册已完成"){
                        alert("注册成功！");
                        var url=encodeURI("index.jsp?");
                        window.location.href=url;
                    }else{
                        if(result=="注册失败"){
                            alert("注册失败！");
                        }else{
                            alert("该邮箱已注册");
                        }
                    }
                }
            })
        }
    }
}
function msgbox(n) {
    document.getElementById('newaddress').style.display = n ? 'block'
        : 'none'; /* 点击按钮打开/关闭 对话框 */
}
function Restaurant(){
    //餐厅名称，店铺类型（快餐便当、特色菜系、异国料理、小吃夜宵）、餐厅电话、餐厅地址
    var restaurant=document.getElementById("info");
    var click=document.getElementById("click");
    console.log(restaurant);
    restaurant.innerHTML ="<div class=\"user-name\">\n" +
    "                            <label for=\"name\"><i class=\"am-icon-user\"></i></label>\n" +
    "                            <input type=\"text\" name=\"\" id=\"name\" placeholder=\"用户名\">\n" +
    "                        </div>\n" +
    "                        <div class=\"user-phone\">\n" +
    "                            <label for=\"phone\"><i class=\"am-icon-mobile-phone am-icon-md\"></i></label>\n" +
    "                            <input type=\"tel\" name=\"\" id=\"phone\" placeholder=\"请输入手机号\">\n" +
    "                        </div>\n" +
        "                  <div>\n" +
        "                    <div style='width: 100%;font-size: 15px' class=\"res-type\" id=\"type\" name=\"type\">类型：<br>"+
        "                    <input style='width: 15%' type=\"radio\" id=\"Fastfood\" value=\"Fastfood\"/>快餐便当\n" +
        "                    <input style='width: 15%' type=\"radio\" id=\"Characteristic\" value=\"Characteristic\"/>特色菜系\n" +
        "                    <input style='width: 15%' type=\"radio\" id=\"snacks\" value=\"snacks\" />小吃夜宵\n" +
        "                    <input style='width: 15%' type=\"radio\" id=\"Exotic\" value=\"Exotic\"/>异国料理\n" +
        "                    </div>\n"+
        "                  </div>\n" ;

    click.innerHTML ="<div class=\"am-cf\">\n" +
        "                        <input type=\"submit\" onclick=\"RestaurantRegister()\" name=\"\" value=\"注 册\" class=\"am-btn am-btn-primary am-btn-sm\">\n" +
        "                    </div>";
}

//餐厅注册
function RestaurantRegister(){
    var Type,type,name,phone,address;
    name=document.getElementById("name").value;
    if(name==""){
        alert("Please Input the name");
    }
    address=document.getElementById("Naddress").value;
    console.log(address);
    if(address==""||address==null){
        alert("请输入地址");
    }
    phone=document.getElementById("phone").value;
    if(phone==""){
        alert("Please Input the phone");
    }
    Type=document.getElementsByName("type");
    for (var i = 0; i < Type[0].children.length; i++){
        if(Type[0].children[i].checked){
            //alert(Type[i].value);
            type=Type[0].children[i].value;
        }
    }
    //1、比较是否已经成功注册 2、是否申请过注册
    if(name!=""&&address!=""&&phone!="") {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                "name": name,
                "address": address,
                "phone": phone,
                "type": type
            },
            url: "RestaurantRegisterServlet",
            success: function (result) {
                if (result == "success") {
                    alert("该餐厅已经注册成功！");
                } else {
                    if (result == "doing") {
                        alert("该餐厅正在审核中！");
                    } else {
                        if (result == "fail") {
                            alert("审核失败！请重新注册！")
                        } else {
                            if(result=="Success") {
                                //将编码存入数据库，修改数据库的审核状态
                                $.ajax({
                                    type:"POST",
                                    dataType:"json",
                                    url:"GetUUIDServlet",
                                    data:"",
                                    success:function(result1){
                                        console.log("result1:"+result1);
                                        result1++;
                                        result1=result1+"";
                                        console.log("UUID:"+result1);
                                        while(result1.length<7){
                                            result1="0"+result1;
                                        }
                                        Uuid=result1;
                                        $.ajax({
                                            type:"POST",
                                            dataType:"json",
                                            url:"WriteUUIDServlet",
                                            data:{"chaptcha":Uuid,"name":name,"phone":phone,"type":type,"address":address},
                                            success:function(result){
                                                if(!result){
                                                    alert("请记住你的编码："+Uuid);
                                                    var url=encodeURI("index.jsp?");
                                                    window.location.href=url;
                                                }else{
                                                    //alert("请重试！")
                                                }
                                            }
                                        })
                                    }
                                })
                                //弹出该店家的编码并写入数据库
                            }else{
                                alert("提交失败！请重新尝试！")
                            }
                        }
                    }
                }
            }
        })
    }
}

function CheckProcess(){
    var Type,type,name,phone,address;
    name=document.getElementById("name").value;
    if(name==""){
        alert("Please Input the name");
    }
    address=document.getElementById("addr-show").value+"";
    if(address==""){
        alert("Please Input the address");
    }
    phone=document.getElementById("phone").value;
    if(phone==""){
        alert("Please Input the phone");
    }
    Type=document.getElementsByName("type").value;
    for (var i = 0; i < Type.length; i++){
        if(Type[i].checked){
            //alert(Type[i].value);
            type=Type[i].value;
        }
    }
    //1、比较是否已经成功注册 2、是否申请过注册
    if(name!=""&&address!=""&&phone!="") {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                "name": name,
                "address": address,
                "phone": phone,
                "type": type
            },
            url: "RestaurantRegisterServlet",
            success: function (result) {
                if(result=="fail"){
                    alert("审核失败！")
                }else{
                    if(result=="success"){
                        alert("审核成功！")
                        //跳转至得到编号的界面
                    }else{
                        alert("审核中....")
                    }
                }
            }
        })
    }
}
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function sendemail() {//#get_code 这个是发送邮件的
    email=document.getElementById("email").value;
    if((email==null||email=="")){
        alert("请输入邮箱");
    }else{
        if(!/^[0-9]+$/.test(email)){
            alert("请输入正确的邮箱格式");
        }else{
            var emails=document.getElementById("EmailAddress");
            //console.log(Emails);
            var index = emails.selectedIndex; // 选中索引
            var value = emails.options[index].value;
            email=email+value;
            uuid=S4()+S4();
            alert("已发送！");
    // 如果不等于0，需要等待时间
    if (wait !== 0) {
        // 不等于0 直接直接就行了
        alert('时间还没到');
        return false;
    }

    // 时间到了，按钮点击之后，直接设置计算时间
    var btn = Jquery(this);
    btn.prop('disabled', true);
    // 表示没 1000毫秒执行一次闭包, setInterval 返回一个定时器的 ID
    timer = setInterval(function () {
        // 每 1000 毫秒执行这个，
        ++ wait;
        // 如果时间等于 0，可以重新发送验证码
        if (wait >= limit) {
            btn.prop('disabled', false);
            btn.val('获取验证码');//按钮的文本内容
            // 这里清除定时器就要用到这个ID
            clearInterval(timer);
            // 然后把 wait 设置为0
            wait = 0;
        }

        btn.val((limit-wait) + '秒后重新发送');
    }, 100);
    Jquery.post("SendEmail.jsp", {Email: email,uuid:uuid},function(res) {
        //其中 ResetPwdSendEmail.jsp 就是刚刚我们建立的那个jsp文件
        //console.log(res);
    });
        }
    }
};



