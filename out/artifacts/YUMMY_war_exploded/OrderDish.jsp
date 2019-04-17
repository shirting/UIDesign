<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 2019-03-13
  Time: 16:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<link href="Style/amazeui.css" rel="stylesheet">
<link href="Style/personal.css" rel="stylesheet" type="text/css">
<link href="Style/orstyle.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="JS/OrderDish.js"></script>
<head>
    <title>点餐</title>
    <div>
        <button onclick="Main()">订餐大厅</button>
        <button onclick="member()">个人信息</button>
        <button onclick="MemberNowOrder()">当前订单</button>
        <button onclick="MemberHistoryOrders()">历史订单</button>
        <button onclick="DeleteMember()">注销账号</button>
    </div>
</head>
<body onload="GetDishInfo()">
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
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">店铺信息</strong> / <small>Restaurant</small></div>
                </div>
                <hr/>

                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>
                    <div class="am-tabs-bd">
                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                            <div class="order-top">
                                <div class="th th-amount">
                                    <td class="td-inner">菜名</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">介绍</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">价格</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">数量</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">||</td>
                                </div>
                                <div class="th th-amount">
                                    <td class="td-inner">购买数量</td>
                                </div>
                            </div>

                            <div class="order-main">
                                <div class="order-list" id="orderdish">
                                </div>

                            </div>
                            <div class="am-form-group">
                                <label for="context" class="am-form-label">订单详情：</label>
                                <div class="am-form-content">
                                    <input type="text" readonly="readonly" id="context" style="border:none"/>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label for="All" class="am-form-label">原价：</label>
                                <div class="am-form-content">
                                    <input type="text" readonly="readonly" id="All" style="border:none"/>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label for="dis" class="am-form-label">优惠：</label>
                                <div class="am-form-content">
                                    <input type="text" readonly="readonly" id="dis" style="border:none"/>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label for="newall" class="am-form-label">总价：</label>
                                <div class="am-form-content">
                                    <input type="text" readonly="readonly" id="newall" style="border:none"/>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label for="memberaddress" class="am-form-label">选择地址：</label>
                                <div class="am-form-content">
                                    <select id="memberaddress">
                                    </select>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <div class="am-form-content">
                                    <button onclick="uploadorder()">提交订单</button>
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
