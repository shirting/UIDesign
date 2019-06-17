var name="";
var password="";
var chaptcha;
function MemberLogin(){
    var role="";
    var Roles;
    var isvalid="";
    name=document.getElementById("name").value;
    if(name==""){
        alert("Please input the name");
    }
    password=document.getElementById("password").value;
    if(password==""){
        alert("Please input the password");
    }
    Roles=document.getElementsByName("role");
    for(var i=0;i<Roles.length;i++){
        if(Roles[i].checked){
            role=Roles[i].value;
        }
    }
    //上传至后端查询
   // console.log(name+"//"+password+"//"+role);
    if(name!=""&&password!=""&&role!="") {
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"MemberLoginServlet",
            cache:false,
            data:{"name":name,"password":password},
            success:function(result){
                var jo=eval(result);
                if(jo.Login=="Wrong Password!"){
                    alert("登录密码错误");
                    var url=encodeURI("index.jsp");
                    window.location.href=url;
                }else{
                    if(jo.Login=="The user has cancelled his account."){
                        alert("该用户已经注销");
                        var url=encodeURI("index.jsp");
                        window.location.href=url;
                    }else{
                        if(jo.Login=="The user is not exist"){
                            alert("该用户不存在");
                            var url=encodeURI("index.jsp");
                            window.location.href=url;
                        }else{
                            //跳转至订餐界面
                            var url=encodeURI("Main.jsp?~"+jo.memberId+"~"+jo.memberName+"~"+password);
                            window.location.href=url;
                        }
                    }
                }
            },
            error:function(){
                alert("会员登录异常");
            }

        });
    }
}

function RestaurantLogin(){
    name=document.getElementById("name").value;
    chaptcha=document.getElementById("chaptcha").value;
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"RestaurantLoginServlet",
        data:{"name":name,"chaptcha":chaptcha},
        success:function(result){
            if(result=="Success"){
                var url=encodeURI("Restaurant.jsp?~"+name+"~"+chaptcha);
                window.location.href=url;
            }else{
                if(result=="doing"){
                    alert("该餐厅正在审核中")
                }else{
                    if(result=="fail"){
                        alert("该餐厅注册审核失败，请重新申请")
                    }else{
                        alert(result);
                    }
                }
            }
        },
        error:function(){
            alert("餐厅登录异常");
        }

    });
}

function YummyLogin(){
     name=document.getElementById("yummyname").value;
     password=document.getElementById("yummypassword").value;
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"YummyLoginServlet",
        data:{"name":name,"password":password},
        success:function(result){
            var jo=eval(result);
            if(jo.yummyId==0){
                alert("密码错误");
            }else{
                //跳转至会员的主界面
                var url=encodeURI("Yummy.jsp");
                window.location.href=url;
            }
        },
        error:function(){
            alert("Yummy!经理登录异常");
        }
    });
}

function Member(){
    var Member=document.getElementById("info");
    Member.innerHTML = "      <form action=\"\" class=\"am-form\" data-am-validator>\n" +
        "        <div>&nbsp&nbsp\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Member\" checked=\"checked\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Restaurant\" onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "          <input type=\"radio\" name=\"role\" value=\"YUMMY\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "        </div>\n" +
        "        <br>\n"+
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-name-2\"><i class=\"am-icon-user\"></i></label>\n" +
        "             -->\n" +
        "          <input type=\"text\" id=\"name\" minlength=\"3\" placeholder=\"输入用户名\" required/>\n" +
        "        </div>\n" +
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-email-2\">\n" +
        "                      <i class=\"am-icon-key\"></i>\n" +
        "                     </label>\n" +
        "                     -->\n" +
        "          <input type=\"password\" id=\"password\" placeholder=\"输入密码\" required/>\n" +
        "        </div>\n" +
        "      </form>\n" +
        "      <div class=\"am-form\">\n" +
        "        <button class=\"am-form am-btn am-btn-secondary\"  onclick=\"MemberLogin()\" type=\"submit\">登录</button>\n" +
        "      </div>";
}

function Restaurant(){
    var Restaurant =document.getElementById("info");
    Restaurant.innerHTML ="      <form action=\"\" class=\"am-form\" data-am-validator>\n" +
        "        <div>&nbsp&nbsp\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Member\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Restaurant\" checked=\"checked\"  onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "          <input type=\"radio\" name=\"role\" value=\"YUMMY\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "        </div>\n" +
        "        <br>"+
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-name-2\"><i class=\"am-icon-user\"></i></label>\n" +
        "             -->\n" +
        "          <input type=\"text\" id=\"name\" minlength=\"3\" placeholder=\"输入餐厅名\" required/>\n" +
        "        </div>\n" +
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-email-2\">\n" +
        "                      <i class=\"am-icon-key\"></i>\n" +
        "                     </label>\n" +
        "                     -->\n" +
        "          <input type=\"text\" id=\"chaptcha\" placeholder=\"输入编码\" required/>\n" +
        "        </div>\n" +
        "      </form>\n" +
        "      <div class=\"am-form\">\n" +
        "        <button class=\"am-form am-btn am-btn-secondary\"  onclick=\"RestaurantLogin()\" type=\"submit\">登录</button>\n" +
        "      </div>";
}

function Yummy(){
    var Yummy =document.getElementById("info");
    Yummy.innerHTML =
        "      <form action=\"\" class=\"am-form\" data-am-validator>\n" +
        "        <div>&nbsp&nbsp\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Member\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "          <input type=\"radio\" name=\"role\" value=\"Restaurant\" onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "          <input type=\"radio\" name=\"role\" value=\"YUMMY\" checked=\"checked\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "        </div>\n" +
        "        <br>\n"+
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-name-2\"><i class=\"am-icon-user\"></i></label>\n" +
        "             -->\n" +
        "          <input type=\"text\" id=\"yummyname\" minlength=\"3\" placeholder=\"YUMMY！\" required/>\n" +
        "        </div>\n" +
        "        <div class=\"am-form-group\">\n" +
        "          <!--\n" +
        "             <label for=\"doc-vld-email-2\">\n" +
        "                      <i class=\"am-icon-key\"></i>\n" +
        "                     </label>\n" +
        "                     -->\n" +
        "          <input type=\"password\" id=\"yummypassword\" placeholder=\"输入密码\" required/>\n" +
        "        </div>\n" +
        "      </form>\n" +
        "      <div class=\"am-form\">\n" +
        "        <button class=\"am-form am-btn am-btn-secondary\"  onclick=\"YummyLogin()\" type=\"submit\">登录</button>\n" +
        "      </div>";
}
