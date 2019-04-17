<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-02-17
  Time: 14:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<link href="Style/amazeui.css" rel="stylesheet">
<link href="Style/personal.css" rel="stylesheet" type="text/css">
<link href="Style/orstyle.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="JS/Main.js"></script>
<head>
    <title>点餐</title>
</head>
<body onload="GetRestaurant('Fastfood')">
<header>
    <article>
        <div class="mt-logo">
            <!--顶部导航条 -->
            <div class="am-container header">
                <ul class="message-r">
                    <div class="topMessage home">
                        <div class="menu-hd"><a onclick="Main()" target="_top" class="h">订餐大厅</a></div>
                    </div>
                    <div class="topMessage my-shangcheng">
                        <div class="menu-hd MyShangcheng"><a href="#" target="_top" onclick="member()"><i class="am-icon-user am-icon-fw"></i>个人中心</a></div>
                    </div>
                </ul>
            </div>
            <!--悬浮搜索框-->
        </div>
        </div>
    </article>
</header>

<b class="line"></b>

<div class="center">
    <div class="col-main">
        <div class="main-wrap">

            <div class="user-order">

                <!--标题 -->
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">订单管理</strong> / <small>Order</small></div>
                </div>
                <hr/>

                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>

                    <ul class="am-avg-sm-5 am-tabs-nav am-nav am-nav-tabs">
                        <li><a onclick="GetRestaurant('Fastfood')">快餐便当</a></li>
                        <li><a onclick="GetRestaurant('Characteristic')">特色菜系</a></li>
                        <li><a onclick="GetRestaurant('snacks')">小吃夜宵</a></li>
                        <li><a onclick="GetRestaurant('Exotic')">异国料理</a></li>
                    </ul>

                    <div class="am-tabs-bd">
                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                            <div class="order-top">
                                <div class="th th-amount">
                                    <td class="td-inner">店铺名</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">店铺地址</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">联系方式</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">店铺优惠</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner"></td>
                                </div>
                            </div>

                            <div class="order-main">
                                <div class="order-list" id="dish">
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
                <a onclick="member()">个人中心</a>
            </li>
            <li class="person">
                <a onclick="MemberNowOrder()">当前订单</a>
            </li>
            <li class="person">
                <a onclick="MemberHistoryOrders()">历史订单</a>
            </li>
            <li class="person">
                <a onclick="DeleteMember()">注销账号</a>
            </li>
            <li class="person">
                <a onclick="Logout()">退出</a>
            </li>
        </ul>

    </aside>
</div>
</body>
</html>
