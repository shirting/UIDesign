<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-02-19
  Time: 18:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=0">
    <link href="Style/amazeui.css" rel="stylesheet">
    <link href="Style/personal.css" rel="stylesheet" type="text/css">
    <link href="Style/orstyle.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="JS/Yummy.js"></script>
    <title>Yummy!经理</title>
</head>
<body onload="CheckRestaurant()">
<%--
1、审批餐厅的申请注册，审批餐厅的信息修改，审批餐厅的新菜品
2、结算：收取每笔订单的15%~25%为平台服务费
3、统计信息：餐厅、会员、YUMMY财务
--%>
<div class="center">
    <div class="col-main">
        <div class="main-wrap">

            <div class="user-order">

                <!--标题 -->
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg" id="title">餐厅</strong> / <small id="title2">Restaurant</small></div>
                </div>
                <hr/>

                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>
                    <div class="am-tabs-bd">
                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                            <div class="order-top" id="tt">

                            </div>
                            <div class="order-main">
                                <div class="order-list" id="showplace">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!--底部-->
    </div>

    <aside class="menu">
        <ul>
            <li class="person">
                <a onclick="CheckRestaurant()" id="approve" style="color: gray;font-weight: bold">审批餐厅注册</a>
            </li>
            <li class="person">
                <a onclick="CheckInfo()" id="approval" style="color: gray;font-weight: bold">审批餐厅信息修改</a>
            </li>
            <li class="person">
                <a onclick="GetRestaurantInfo()" id="resStatistic" style="color: gray;font-weight: bold">餐厅信息统计</a>
            </li>
            <li class="person">
                <a onclick="GetMemberInfo()" id="memStatistic" style="color: gray;font-weight: bold">会员信息统计</a>
            </li>
            <li class="person">
                <a onclick="RestaurantLogout()" id="logout" style="color: gray;font-weight: bold">退出</a>
            </li>
        </ul>

    </aside>
</div>
</body>
</html>