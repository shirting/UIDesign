<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-02-12
  Time: 17:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>登录界面</title>
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="JS/Login.js"></script>
    <link href="Style/amazeui.css" rel="stylesheet">
    <link href="Style/dlstyle.css" rel="stylesheet" type="text/css">
  </head>
    <%--
    <div>
      <a href="Register.jsp">Register</a>
    </div>
  </head>
  <body>
    <div class="">
      <div class="container home-intro-content">
        <div class="row">
              <div id="info">
                <div>
                  <a>用户名：</a>
                  <input type="text" id="name"/>
                </div>
                <div>
                  <a>用户密码：</a>
                  <input type="password" id="password"/>
                </div>
                <div>
                  <button onclick="MemberLogin()">确认登录</button>
                </div>
              </div>
        </div>
      </div>
    </div>
--%>
    <%--
  1、YUMMY、餐厅、会员登录
  2、跳转至注册界面
  --%>

  <body>
  <div class="footer ">
    <div class="footer-hd ">

    </div>
    <div class="footer-bd ">
      <p>
      </p>
    </div>
  </div>
  <div class="footer ">
    <div class="footer-hd ">

    </div>
    <div class="footer-bd ">
      <p>
      </p>
    </div>
  </div>
  <div class="login-banner">
    <div class="login-main">
      <div class="login-banner-bg"><span></span><img src="image/big.jpg" /></div>
      <div class="login-box">

        <h3 class="title">登录商城</h3>

        <div class="clear"></div>
        <div id="info">
          <div class="login-form">
          <form>
            <div class="user-name">
              <label for="name"><i class="am-icon-user"></i></label>
              <input type="text" name="" id="name" placeholder="用户名">
            </div>
            <div class="user-pass">
              <label for="password"><i class="am-icon-lock"></i></label>
              <input type="password" name="" id="password" placeholder="请输入密码">
            </div>
          </form>
          </div>
          <div>&nbsp&nbsp
            <input type="radio" name="role" value="Member" checked="checked" onclick="Member()">&nbsp&nbsp会员
            <input type="radio" name="role" value="Restaurant" onclick="Restaurant()">&nbsp&nbsp餐厅
            <input type="radio" name="role" value="YUMMY" onclick="Yummy()">&nbsp&nbspYUMMY!经理
          </div>
          <div class="am-cf">
            <input type="submit" onclick="MemberLogin()" name="" value="登 录" class="am-btn am-btn-primary am-btn-sm">
          </div>
        </div>
        <div class="login-links">
          <a href="Register.jsp" class="zcnext am-fr am-btn-default">注册</a>
          <br />
        </div>

      </div>
    </div>
  </div>


  <div class="footer ">
    <div class="footer-hd ">

    </div>
    <div class="footer-bd ">
      <p>
      </p>
    </div>
  </div>
  </body>

</html>
