<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-03-23
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>餐厅历史信息</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=0">
    <link href="Style/amazeui.css" rel="stylesheet">
    <link href="Style/personal.css" rel="stylesheet" type="text/css">
    <link href="Style/orstyle.css" rel="stylesheet" type="text/css">
    <link href="//shadow.elemecdn.com/faas/desktop/vendor.2e9f33.css" rel="stylesheet">
    <link href="//shadow.elemecdn.com/faas/desktop/profile.d24b94.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="JS/echarts.min.js"></script>
    <script type="text/javascript" src="JS/macarons.js"></script>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="JS/RestaurantHistoryOrder.js"></script>

</head>
<body onload="ResGetOrdersByTime()">
<div class="center">
    <aside class="menu  col-main-2">
        <ul>
            <li class="person">
                <a onclick="RestaurantInfo()">餐厅中心</a>
            </li>
            <li class="person">
                <a onclick="RestaurantLogout()">退出</a>
            </li>
        </ul>

    </aside>
    <div class="col-main-10">
        <div class="main-wrap">

            <div class="user-order">

                <!--标题 -->
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">订单管理</strong> / <small>Order</small></div>
                </div>
                <hr/>

                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>

                    <ul class="am-avg-sm-5 am-tabs-nav am-nav am-nav-tabs">
                        <li class=""><a onclick="ResGetOrdersByTime()">按时间排序</a></li>
                        <li class=""><a onclick="ResGetOrdersByPrice()">按金额排序</a></li>
                        <li class=""><a onclick="ResGetOrdersByMember()">按点餐次数排序</a></li>
                    </ul>

                    <div class="am-tabs-bd" id="statistic">
                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                            <!--<div class="order-top" id="tt">
                                <div class="th th-amount">
                                    <td class="td-inner">序号</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">会员名</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">收货地址</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">联系方式</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">下单时间</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">交易状态</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">订单详情</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">优惠</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">总价</td>
                                </div>
                            </div>-->

                            <div class="order-main">
                                <div class="order-list" id="main">
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="membersByOrderSum" style="display:none;position:relative;top: 20px;width:100%;height:450px;background-color: white">
                        <div class="am-g">
                            <div class="am-u-sm-6" id="pie" style="height:430px">

                            </div>
                            <div class="am-u-sm-6" id="top" style="position: relative;top: 30px;height:430px">

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <!--底部-->
    </div>


</div>
</body>
</html>
