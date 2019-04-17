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
                            //跳转至会员的主界面
                            var url=encodeURI("Member.jsp?~"+jo.memberId+"~"+jo.memberName+"~"+password);
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
    Member.innerHTML ="<div class=\"login-form\">\n" +
        "          <form>\n" +
        "            <div class=\"user-name\">\n" +
        "              <label for=\"name\"><i class=\"am-icon-user\"></i></label>\n" +
        "              <input type=\"text\" name=\"\" id=\"name\" placeholder=\"用户名\">\n" +
        "            </div>\n" +
        "            <div class=\"user-pass\">\n" +
        "              <label for=\"password\"><i class=\"am-icon-lock\"></i></label>\n" +
        "              <input type=\"password\" name=\"\" id=\"password\" placeholder=\"请输入密码\">\n" +
        "            </div>\n" +
        "          </form>\n" +
        "          </div>\n" +
        "          <div>&nbsp&nbsp\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Member\" checked=\"checked\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Restaurant\" onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "            <input type=\"radio\" name=\"role\" value=\"YUMMY\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "          </div>\n" +
        "          <div class=\"am-cf\">\n" +
        "            <input type=\"submit\" onclick=\"MemberLogin()\" name=\"\" value=\"登 录\" class=\"am-btn am-btn-primary am-btn-sm\">\n" +
        "          </div>";
}

function Restaurant(){
    var Restaurant =document.getElementById("info");
    Restaurant.innerHTML ="<div class=\"login-form\">\n" +
        "          <form>\n" +
        "            <div class=\"user-name\">\n" +
        "              <label for=\"name\"><i class=\"am-icon-user\"></i></label>\n" +
        "              <input type=\"text\" name=\"\" id=\"name\" placeholder=\"餐厅名\">\n" +
        "            </div>\n" +
        "            <div class=\"user-pass\">\n" +
        "              <label for=\"chaptcha\"><i class=\"am-icon-lock\"></i></label>\n" +
        "              <input type=\"text\" name=\"\" id=\"chaptcha\" placeholder=\"请输入编码\">\n" +
        "            </div>\n" +
        "          </form>\n" +
        "          </div>\n" +
        "          <div>&nbsp&nbsp\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Member\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Restaurant\"  checked=\"checked\" onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "            <input type=\"radio\" name=\"role\" value=\"YUMMY\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "          </div>\n" +
        "          <div class=\"am-cf\">\n" +
        "            <input type=\"submit\" onclick=\"RestaurantLogin()\" name=\"\" value=\"登 录\" class=\"am-btn am-btn-primary am-btn-sm\">\n" +
        "          </div>";
}

function Yummy(){
    var Yummy =document.getElementById("info");
    Yummy.innerHTML ="<div class=\"login-form\">\n" +
        "          <form>\n" +
        "            <div class=\"user-name\">\n" +
        "              <label for=\"yummyname\"><i class=\"am-icon-user\"></i></label>\n" +
        "              <input type=\"text\" name=\"\" id=\"yummyname\" placeholder=\"YUMMY！\">\n" +
        "            </div>\n" +
        "            <div class=\"user-pass\">\n" +
        "              <label for=\"yummypassword\"><i class=\"am-icon-lock\"></i></label>\n" +
        "              <input type=\"text\" name=\"\" id=\"yummypassword\" placeholder=\"请输入密码\">\n" +
        "            </div>\n" +
        "          </form>\n" +
        "          </div>\n" +
        "          <div>&nbsp&nbsp\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Member\" onclick=\"Member()\">&nbsp&nbsp会员\n" +
        "            <input type=\"radio\" name=\"role\" value=\"Restaurant\" onclick=\"Restaurant()\">&nbsp&nbsp餐厅\n" +
        "            <input type=\"radio\" name=\"role\" value=\"YUMMY\"  checked=\"checked\" onclick=\"Yummy()\">&nbsp&nbspYUMMY!经理\n" +
        "          </div>\n" +
        "          <div class=\"am-cf\">\n" +
        "            <input type=\"submit\" onclick=\"YummyLogin()\" name=\"\" value=\"登 录\" class=\"am-btn am-btn-primary am-btn-sm\">\n" +
        "          </div>";
}
