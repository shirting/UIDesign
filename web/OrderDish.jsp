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

<link href="//shadow.elemecdn.com/faas/desktop/vendor.2e9f33.css" rel="stylesheet">

<link href="//shadow.elemecdn.com/faas/desktop/main.30bad1.css" rel="stylesheet">


<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="JS/OrderDish.js"></script>

<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>

<head>
    <title>点餐</title>
    <!--<div>
        <button onclick="Main()">订餐大厅</button>
        <button onclick="member()">个人信息</button>
        <button onclick="MemberNowOrder()">当前订单</button>
        <button onclick="MemberHistoryOrders()">历史订单</button>
        <button onclick="DeleteMember()">注销账号</button>
    </div>-->
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
    <aside class="menu col-md-2" >
        <ul>
            <li class="person">
                <a onclick="member()">个人中心</a>
            </li>
            <li class="person">
                <a onclick="Memberaddress()">地址管理</a>
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


    <div class="col-main-10">
        <div class="main-wrap">

            <div class="user-order">

                <!--标题 -->
                <div class="am-cf am-padding">
                    <div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">店铺信息</strong> /
                        <small>Restaurant</small>
                    </div>
                </div>
                <hr/>


                <div style='padding-left: 2%;padding-right: 2%;' ng-show="!loading" class="shopmenu-main grid"
                     ng-class="{grid: displayType === 'grid', list: displayType === 'list'}" style="margin-top: 0px;">
                    <!-- ngIf: filterData === 'default' && !searchEnv -->
                    <div class="col-2 shopmenu-food-main">
                        <label class="shopmenu-food-name ui-ellipsis ng-binding"><strong>联系电话：</strong></label>
                        <h3 id='resPhone' class="shopmenu-food-name ui-ellipsis ng-binding">
                        </h3>
                        <label class="shopmenu-food-name ui-ellipsis ng-binding"><strong>地址：</strong></label>
                        <h3 id='resLoc' class="shopmenu-food-name ui-ellipsis ng-binding">
                        </h3>
                        <br>
                        <div ng-if="filterData === 'default' &amp;&amp; !searchEnv" class="ng-scope">
                            <!-- ngRepeat: category in categorys -->
                            <div id='orderdish' class="shopmenu-list clearfix ng-scope"
                                 ng-repeat="category in categorys">

                            </div>


                        </div>
                    </div>
                </div>
                <br>
                <hr>

                <div id="cartRQ" class="container" style="padding-left:2%">
                    <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">购物车</button>
                </div>

                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;
                                </button>
                                <h4 class="modal-title" id="myModalLabel">购物车详情</h4>
                            </div>
                            <div class="modal-body">
                                <div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>
                                    <div class="am-tabs-bd">
                                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">

                                            <div class="am-form-group">
                                                <label for="context" class="am-form-label">订单详情：</label>
                                                <div class="am-form-content">
                                                    <input type="text" readonly="readonly" id="context"
                                                           style="border:none"/>
                                                </div>
                                            </div>
                                            <div class="am-form-group">
                                                <label for="All" class="am-form-label">原价：</label>
                                                <div class="am-form-content">
                                                    <input type="text" readonly="readonly" id="All"
                                                           style="border:none"/>
                                                </div>
                                            </div>
                                            <div class="am-form-group">
                                                <label for="dis" class="am-form-label">优惠：</label>
                                                <div class="am-form-content">
                                                    <input type="text" readonly="readonly" id="dis"
                                                           style="border:none"/>
                                                </div>
                                            </div>
                                            <div class="am-form-group">
                                                <label for="newall" class="am-form-label">总价：</label>
                                                <div class="am-form-content">
                                                    <input type="text" readonly="readonly" id="newall"
                                                           style="border:none"/>
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
                                                <label class="am-form-label">预计配送时间：</label>
                                                <h5 id="arrrr"></h5></div>

                                            <br>
                                            <!--<div class="am-form-group">
                                                <div class="am-form-content">
                                                    <button onclick="uploadorder()">提交订单</button>
                                                </div>
                                            </div>-->

                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-success" onclick="uploadorder()">提交订单</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal -->
                </div>


            </div>
        </div>
        <!--底部-->
    </div>



</div>
</body>
<script>
    $(function () {
        $("[data-toggle='popover']").popover({html: true});
    });
</script>

</html>
