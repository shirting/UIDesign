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

<link href="//shadow.elemecdn.com/faas/desktop/vendor.2e9f33.css" rel="stylesheet">

<link href="//shadow.elemecdn.com/faas/desktop/main.30bad1.css" rel="stylesheet">



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
                        <div class="menu-hd MyShangcheng"><a href="#" target="_top" onclick="member()"><i
                                class="am-icon-user am-icon-fw"></i>个人中心</a></div>
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
        <aside class="menu col-md-2">
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


        <div class="main-wrap col-md-10">

            <div class="user-order">

                <!--标题 -->
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">订单管理</strong> /
                        <small>Order</small>
                    </div>
                </div>
                <hr/>

                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>

                    <ul class="am-avg-sm-5 am-tabs-nav am-nav am-nav-tabs">
                        <li><a onclick="GetRestaurant('Fastfood')">快餐便当</a></li>
                        <li><a onclick="GetRestaurant('Characteristic')">特色菜系</a></li>
                        <li><a onclick="GetRestaurant('snacks')">小吃夜宵</a></li>
                        <li><a onclick="GetRestaurant('Exotic')">异国料理</a></li>
                    </ul>


                    <div class="place-rstbox clearfix">
                        <div class="clearfix" id="sellerbox"
                             data="filteredRestaurants = (rstStream.restaurants | filter: rstStream.filter | filter: otherFilter | orderBy: [ '-is_opening', rstStream.orderBy || 'index' ])"
                            >
                        </div>




                    </div>
                </div>
            </div>
            <!--底部-->
        </div>


    </div>
</div>
</body>
</html>
