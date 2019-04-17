<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-02-17
  Time: 14:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="Style/amazeui.css" rel="stylesheet">
    <link href="Style/dlstyle.css" rel="stylesheet" type="text/css">
    <link href="Style/personal.css" rel="stylesheet" type="text/css">
    <link href="Style/addstyle.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="JS/Restaurant.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=0">
    <title>餐厅信息</title>
</head>
<body onload="RestaurantInfo()">
<header>
    <article>
    </article>
</header>
<b class="line"></b>

<div class="center">
    <div class="col-main">
        <div class="main-wrap">

            <div class="user-address">
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">基本信息</strong> / <small>Address&nbsp;list</small>&nbsp<button class="am-btn am-btn-danger" onclick="EditRestaurantInfo()" id="editinfo">编辑</button></div>
                </div>
                <hr>
                <div>
                    <div id="main"></div>
                    <div class="clear"></div>

                </div>

                <script type="text/javascript">
                    $(document).ready(function() {
                        $(".new-option-r").click(function() {
                            $(this).parent('.user-addresslist').addClass("defaultAddr").siblings().removeClass("defaultAddr");
                        });

                        var $ww = $(window).width();
                        if($ww>640) {
                            $("#doc-modal-1").removeClass("am-modal am-modal-no-btn")
                        }

                    })
                </script>

                <div class="clear"></div>

            </div>
            <!--底部-->
        </div>
    </div>

    <aside class="menu">
        <ul>
            <li class="person">
                <a onclick="RestaurantInfo()">餐厅信息</a>
            </li>
            <li class="person">
                <a onclick="Dishes()">菜单</a>
            </li>
            <li class="person">
                <a onclick="Discount()">优惠</a>
            </li>
            <li class="person">
                <a onclick="GetOrders()">历史订单</a>
            </li>
            <li class="person">
                <a onclick="RestaurantLogout()">退出</a>
            </li>
        </ul>

    </aside>
</div>
</body>
</html>
