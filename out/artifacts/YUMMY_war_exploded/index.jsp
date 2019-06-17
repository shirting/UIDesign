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
    <link href="Style/common.min.css" rel="stylesheet" type="text/css">
    <link href="Style/join.min.css" rel="stylesheet" type="text/css">
    <link href="Style/other.min.css" rel="stylesheet" type="text/css">
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

  <body class="login">
  <div class="topbar">
    <div class="container">
      <div class="am-g">
        <div class="am-u-md-3">
          <div class="topbar-left">
          </div>
        </div>
        <div class="am-u-md-9">
          <div class="topbar-right am-text-right am-fr">
            <a style="font-size:18px;" href="Register.jsp">注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="login-container">
    <div class="login-box"  style="opacity:0.95">
      <div class="logo-img">
        <img src="image/logo2_03.png" alt="" />
      </div>
      <div id="info">
      <form action="" class="am-form" data-am-validator>
        <div>&nbsp&nbsp
          <input type="radio" name="role" value="Member" checked="checked" onclick="Member()">&nbsp&nbsp会员
          <input type="radio" name="role" value="Restaurant" onclick="Restaurant()">&nbsp&nbsp餐厅
          <input type="radio" name="role" value="YUMMY" onclick="Yummy()">&nbsp&nbspYUMMY!经理
        </div>
        <br>
        <div class="am-form-group">
          <!--
             <label for="doc-vld-name-2"><i class="am-icon-user"></i></label>
             -->
          <input type="text" id="name" minlength="3" placeholder="输入用户名" required/>
        </div>
        <div class="am-form-group">
          <!--
             <label for="doc-vld-email-2">
                      <i class="am-icon-key"></i>
                     </label>
                     -->
          <input type="password" id="password" placeholder="输入密码" required/>
        </div>
      </form>
      <div class="am-form">
        <button class="am-form am-btn am-btn-secondary"  onclick="MemberLogin()" type="submit">登录</button>
      </div>
    </div>
    </div>
  </div>
  </body>

</html>
