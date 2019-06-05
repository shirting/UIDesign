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
    <link href="Style/admin.css" rel="stylesheet" type="text/css">
    <link href="Style/amazeui.css" rel="stylesheet" type="text/css">
    <link href="Style/personal.css" rel="stylesheet" type="text/css">
    <link href="Style/infstyle.css" rel="stylesheet" type="text/css">
    <link href="Style/addstyle.css" rel="stylesheet" type="text/css">
    <!--<link href="Style/dlstyle.css" rel="stylesheet" type="text/css">

    <link href="Style/addstyle.css" rel="stylesheet" type="text/css">-->
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="//shadow.elemecdn.com/faas/desktop/vendor.2e9f33.css" rel="stylesheet">

    <link href="//shadow.elemecdn.com/faas/desktop/main.30bad1.css" rel="stylesheet">

    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="JS/Restaurant.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
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
        <aside class="menu col-md-2">
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
        <div class="main-wrap">
            <div class="user-address">
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf">
                        <strong class="am-text-danger am-text-lg">基本信息</strong>
                        &nbsp
                        </div>
                </div>
                <hr/>
                <div id='main1' class="info-main">
                    <button class="am-btn am-btn-danger" onclick="EditRestaurantInfo()" id="editinfo">保存</button>
                </div>
                    <div style='padding-left: 2%;padding-right: 2%;' ng-show="!loading" class="shopmenu-main grid"
                         ng-class="{grid: displayType === 'grid', list: displayType === 'list'}"
                         style="margin-top: 0px;">
                        <!-- ngIf: filterData === 'default' && !searchEnv -->
                        <div class="col-2 shopmenu-food-main">
                            <div ng-if="filterData === 'default' &amp;&amp; !searchEnv" class="ng-scope">
                                <!-- ngRepeat: category in categorys -->
                                <div id='main' class="shopmenu-list clearfix ng-scope"
                                     ng-repeat="category in categorys">

                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="clean"></div>
                <script type="text/javascript">
                    $(document).ready(function () {
                        $(".new-option-r").click(function () {
                            $(this).parent('.user-addresslist').addClass("defaultAddr").siblings().removeClass("defaultAddr");
                        });

                        var $ww = $(window).width();
                        if ($ww > 640) {
                            $("#doc-modal-1").removeClass("am-modal am-modal-no-btn")
                        }

                    })
                </script>

                <div class="clear"></div>

            </div>
            <!--底部-->
        </div>
        </div>

</div>
</body>
</html>
