<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-02-12
  Time: 17:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="JS/Register.js"></script>
    <%--
<script src="http://api.map.baidu.com/api?v=2.0&ak=fBF0sDm9woBCGpBqM8ZTAhMkqnR2Wl8u"></script>
--%>
    <link rel="stylesheet" href="Style/style.css">

    <link href="Style/amazeui.css" rel="stylesheet">
    <link href="Style/dlstyle2.css" rel="stylesheet" type="text/css">
    <title>Register</title>
</head>
<%--
餐厅和会员的注册界面

<body>
        <div>
                <input type="radio" name="role" value="Member" checked="checked" onclick="Member()">会员
                <input type="radio" name="role" value="Restaurant" onclick="Restaurant()">餐厅
            </div>
            <div id="info">
                <div>
                    <a id="aName">用户名：</a>
                    <input type="text" id="name"/>
                </div>
                <div>
                    <a>用户密码：</a>
                    <input type="password" id="password"/>
                </div>
                    <a>确认密码：</a>
                    <input type="password" id="confirmpassword"/>
                <div>
                    <a>联系电话：</a>
                    <input type="text" id="phone"/>
                </div>
                <div>
                    <a>账号：</a>
                    <input type="text" id="account"/>
                </div>
                <div>
                    <a>邮箱：</a>
                    <input type="Email" id="email"/>
                    <select id="EmailAddress">
                        <option value="@qq.com">@qq.com</option>
                        <option value="@163.com">@163.com</option>
                    </select>
                </div>
                <div>
                    <input type="text"  id="chaptcha" />
                    <button id="get_code" onclick="sendemail()">获取验证码</button>
                </div>
            </div>
        <div>
            <label>地址：</label>
            <div id="Naddress">
            </div>
        </div>
        <br/>

        <div class="tip am-round" id="newaddress">

            <!--省份选择-->
            <select id="prov" onchange="showCity(this)">
                <option>=请选择省份=</option>

            </select>

            <!--城市选择-->
            <select id="city" onchange="showCountry(this)">
                <option>=请选择城市=</option>
            </select>

            <!--县区选择-->
            <select id="country" onchange="selecCountry(this)">
                <option>=请选择县区=</option>
            </select>
            <input type="text" value="" id="ANewAddress"/>
                        <div>
                            <button type="button" class="btn met1" onClick="showAddr()" id="button-show" >确定</button>
                </div>
        </div>
            <div id="click">
                <div>
                    <button onclick="MemberRegister()">注册</button>
                </div>
            </div>
            <%--
            1、YUMMY、餐厅、会员登录
            2、跳转至注册界面
            --%>
<%--
<script type="text/javascript">
    var map = new BMap.Map("allmap");
    // 创建地图实例
    var point = new BMap.Point(108.188512, 31.23829);
    // 创建点坐标
    map.centerAndZoom(point, 19);
    // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);
    // 滚动缩放
    //          var myStyleJson=[
    //          {
    //              "featureType": "road",
    //              "elementType": "geometry.stroke",
    //              "stylers": {
    //                  "color": "#ff0000"
    //              }
    //          }];
shi    //风格
    map.addEventListener("click", function(e){
        var lat = e.point.lat;
        var lng = e.point.lng;
        console.log('东经'+lng, '北纬'+lat);
    });
</script>
--%>
<%--
</body>
--%>
<body>
<div class="login-banner">
    <div class="login-main">
        <div class="login-banner-bg"><span></span><img src="image/big.jpg" /></div>
        <div class="login-box">

            <h3 class="title">注册</h3>

            <div class="clear"></div>
            <div>
                <div class="login-form">
                    <form>
                        <div id="info">
                        <div class="user-name">
                            <label for="name"><i class="am-icon-user"></i></label>
                            <input type="text" name="" id="name" placeholder="用户名">
                        </div>
                        <div class="user-pass">
                            <label for="password"><i class="am-icon-lock"></i></label>
                            <input type="password" name="" id="password" placeholder="设置密码">
                        </div>
                        <div class="user-pass">
                            <label for="confirmpassword"><i class="am-icon-lock"></i></label>
                            <input type="password" name="" id="confirmpassword" placeholder="确认密码">
                        </div>
                        <div class="user-phone">
                            <label for="phone"><i class="am-icon-mobile-phone am-icon-md"></i></label>
                            <input type="tel" name="" id="phone" placeholder="请输入手机号">
                        </div>
                        <div class="user-phone">
                            <label for="account"><i class="am-icon-mobile-phone am-icon-md"></i></label>
                            <input type="tel" name="" id="account" placeholder="请输入账号">
                        </div>
                        <div class="user-email">
                            <label for="email"><i class="am-icon-envelope-o"></i></label>
                            <input type="email" name="" id="email" placeholder="请输入邮箱账号">
                            <a href="javascript:void(0);">
                            <select class="dyMobileButton1"  id="EmailAddress">
                                <option value="@qq.com">@qq.com</option>
                                <option value="@163.com">@163.com</option>
                            </select>
                            </a>
                        </div>
                        <div class="verification">
                            <label for="chaptcha"><i class="am-icon-code-fork"></i></label>
                            <input type="text"  id="chaptcha"  placeholder="请输入验证码"/>
                            <a class="btn" href="javascript:void(0);" onclick="sendemail();" id="get_code">
                                <span id="dyMobileButton">获取</span></a>
                        </div>
                        </div>
                        <div class="user-name">
                            <label for="Naddress"><i class="am-icon-user"></i></label>
                            <input class="user-address" id="Naddress" placeholder="地址">
                        </div>
                        <div id="newaddress" style="width: 100%;font-size:10px">&nbsp&nbsp&nbsp

                            <!--省份选择-->
                            <select style="width: 30%" id="prov"  onchange="showCity(this)">
                                <option >=请选择省份=</option>

                            </select>

                            <!--城市选择-->
                            <select style="width: 30%"  id="city" onchange="showCountry(this)">
                                <option>=请选择城市=</option>
                            </select>

                            <!--县区选择-->
                            <select style="width: 30%" id="country" onchange="selecCountry(this)">
                                <option>=请选择县区=</option>
                            </select>
                            <input style="border:1em" type="text" value="" id="ANewAddress" placeholder="详细地址"/>
                            <div>
                                <button type="button" class="btn met1" onClick="showAddr()" id="button-show" >确定</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>&nbsp&nbsp
                    <input type="radio" name="role" value="Member" checked="checked" onclick="Member()">会员
                    <input type="radio" name="role" value="Restaurant" onclick="Restaurant()">餐厅
                </div>
                <div id="click">
                    <div class="am-cf">
                        <input type="submit" onclick="MemberRegister()" name="" value="注 册" class="am-btn am-btn-primary am-btn-sm">
                    </div>
                </div>
            </div>
            <div class="login-links">
                <a href="index.jsp" class="zcnext am-fr am-btn-default">登录</a>
                <br />
            </div>

        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="JS/city.js"></script>
<script type="text/javascript" src="JS/method2.js"></script>
</html>
