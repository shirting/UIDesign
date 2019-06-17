function CheckRestaurant(){
    var div1 = document.getElementById("approve");
    div1.style.color = "#4682B4";
    var div1 = document.getElementById("approval");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("resStatistic");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("memStatistic");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("logout");
    div1.style.color = "#DCDCDC";

    var title = document.getElementById("title");
    title.innerHTML = "注册餐厅审批";
    var title2 = document.getElementById("title2");
    title2.innerHTML = "Restaurants";
    var id,name,type,address,phone;
    //alert("ccccc");
    //得到所有需要审核的餐厅
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"GetCheckingRestaurantServlet",
        data:"",
        success:function(result){
            console.log(result);
            var showplace=document.getElementById("showplace");
            showplace.innerHTML="";
            var tt=document.getElementById("tt");
            tt.innerHTML="";
            tt.innerHTML += " <table class=\"am-table am-table-striped am-table-hover\">\n" +
                "                                    <thead>\n" +
                "                                    <tr style=\"font-weight:bold\">\n" +
                "                                        <th>餐厅编号</th>\n" +
                "                                        <th>餐厅名称</th>\n" +
                "                                        <th>餐厅类型</th>\n" +
                "                                        <th>联系方式</th>\n" +
                "                                        <th>餐厅地址</th>\n" +
                "                                        <th>相应操作</th>\n" +
                "                                    </tr>\n" +
                "                                    </thead>\n" +
                "                                    <tbody id=\"tbd\">\n" +
                "                                    </tbody>\n" +
                "                                </table>";
            var tbody = document.getElementById("tbd");

            tbody.innerHTML = "";
            if(result.length>0) {
                showplace.innerHTML = "";
                for(var i=0;i<result.length;i++){
                    id=result[i].chaptcha;
                    name=result[i].resName;
                    phone=result[i].phone;
                    address=result[i].resAddress;
                    type=result[i].restype;
                    tbody.innerHTML +="<td class=\"am-text-middle\">"+id+"</td>\n" +
                        "            <td class=\"am-text-middle\">"+name+"</td>\n" +
                        "            <td class=\"am-text-middle\">"+type+"</td>\n" +
                        "            <td class=\"am-text-middle\">"+phone+"</td>\n" +
                        "            <td class=\"am-text-middle\" >"+address+"</td>\n" +
                        "            <td>\n" +
                        "                <button class=\"am-btn am-btn-success am-btn-xs\" onclick=ResSuccess('"+name+"','"+phone+"','"+type+"','"+address+"')>\n" +
                        "                <i class=\"am-icon-check\"></i>\n" +
                        "                通过\n" +
                        "                </button>\n" +
                        "                <button class=\"am-btn am-btn-danger am-btn-xs\" onclick=ResFail(('"+name+"','"+phone+"','"+type+"','"+address+"')>\n" +
                        "                 <i class=\"am-icon-close\"></i>\n" +
                        "                 拒绝\n" +
                        "                </button>\n" +
                        "            </td>\n";
                }
                /*for (var i = 0; i < result.length; i++) {
                    name=result[i].resName;
                    phone=result[i].phone;
                    address=result[i].resAddress;
                    type=result[i].restype;
                    showplace.innerHTML +="<div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+name+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+phone+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+type+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+address+"</td>\n" +
                        "                                </div>";
                    showplace.innerHTML +="<br><br><br>";
                    showplace.innerHTML +="&nbsp&nbsp&nbsp&nbsp<button class=\"am-btn am-btn-danger\" onclick=ResSuccess('"+name+"','"+phone+"','"+type+"','"+address+"')>通过</button>\n"+
                        "        <button class=\"am-btn am-btn-danger\" onclick=ResFail(('"+name+"','"+phone+"','"+type+"','"+address+"')>拒绝</button>\n";
                    showplace.innerHTML +="<br><br><br><br>"
                }*/
            }else{
                showplace.innerHTML += " <strong style='color: rosybrown'>暂无需要审核的信息</strong>";
            }
        }
    });
}

function ResFail(name,phone,type,address){
    //alert(name+":"+phone+":"+type+":"+address);
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"ResFailServlet",
        data:{"name":name,"phone":phone,"type":type,"address":address},
        success:function(result){
            if(!result){
                alert("拒绝成功！")
                var url=encodeURI("Yummy.jsp?");
                window.location.href=url;
            }else{
                alert("请重试！");
            }
        }
    });
}

function ResSuccess(name,phone,type,address){
    //得到最大的编码
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"ResSuccessServlet",
        data:{"name":name,"phone":phone,"type":type,"address":address},
        success:function(result){
            if(!result){
                var url=encodeURI("Yummy.jsp?");
                window.location.href=url;
            }else{
                alert("请重试！")
            }
        }
    })
}

function CheckInfo(){
    var div1 = document.getElementById("approve");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("approval");
    div1.style.color = "#4682B4";
    var div1 = document.getElementById("resStatistic");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("memStatistic");
    div1.style.color = "#DCDCDC";
    var div1 = document.getElementById("logout");
    div1.style.color = "#DCDCDC";

    var title = document.getElementById("title");
    title.innerHTML = "餐厅信息审批";
    var title2 = document.getElementById("title2");
    title2.innerHTML = "Restaurant Info";
    var id,name,type,address,phone;
//得到审核的餐厅信息
    //alert("ddd");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetEditBaseInfoServlet",
        data: "",
        success: function (result) {
            console.log(result);
            var showplace=document.getElementById("showplace");
            showplace.innerHTML="";
            var tt=document.getElementById("tt");
            tt.innerHTML="";
            tt.innerHTML += " <table class=\"am-table am-table-striped am-table-hover\">\n" +
                "                                    <thead>\n" +
                "                                    <tr style=\"font-weight:bold\">\n" +
                "                                        <th>餐厅编号</th>\n" +
                "                                        <th>餐厅名称</th>\n" +
                "                                        <th>餐厅类型</th>\n" +
                "                                        <th>联系方式</th>\n" +
                "                                        <th>餐厅地址</th>\n" +
                "                                        <th>相应操作</th>\n" +
                "                                    </tr>\n" +
                "                                    </thead>\n" +
                "                                    <tbody id=\"tbd\">\n" +
                "                                    </tbody>\n" +
                "                                </table>";
            var tbody = document.getElementById("tbd");
            tbody.innerHTML = "";

            if(result.length>0){
            showplace.innerHTML = "";
            for(var i=0;i<result.length;i++){
                id=result[i].chaptcha;
                name=result[i].resName;
                phone=result[i].phone;
                address=result[i].resAddress;
                type=result[i].restype;
                tbody.innerHTML +="<td class=\"am-text-middle\">"+id+"</td>\n" +
                    "            <td class=\"am-text-middle\">"+name+"</td>\n" +
                    "            <td class=\"am-text-middle\">"+type+"</td>\n" +
                    "            <td class=\"am-text-middle\">"+phone+"</td>\n" +
                    "            <td class=\"am-text-middle\" >"+address+"</td>\n" +
                    "            <td>\n" +
                    "                <button class=\"am-btn am-btn-success am-btn-xs\" onclick=EditSuccess('"+id+"')>\n" +
                    "                <i class=\"am-icon-check\"></i>\n" +
                    "                通过\n" +
                    "                </button>\n" +
                    "                <button class=\"am-btn am-btn-danger am-btn-xs\" onclick=EditFail('"+id+"')>\n" +
                    "                 <i class=\"am-icon-close\"></i>\n" +
                    "                 拒绝\n" +
                    "                </button>\n" +
                    "            </td>\n";
                /*showplace.innerHTML +="<div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+(i+1)+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+name+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+phone+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+type+"</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">||</td>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"th th-amount\">\n" +
                    "                                    <td class=\"td-inner\">"+address+"</td>\n" +
                    "                                </div>";
                showplace.innerHTML +="<br><br><br>";
                showplace.innerHTML +="&nbsp&nbsp&nbsp&nbsp<button class=\"am-btn am-btn-danger\" onclick=EditSuccess('"+result[i].chaptcha+"')>通过</button>\n"+
                    "        <button class=\"am-btn am-btn-danger\" onclick=EditFail('"+result[i].chaptcha+"')>拒绝</button>\n";
                showplace.innerHTML +="<br><br><br><br>"*/
            }
        }else{
            showplace.innerHTML += " <strong style='color: rosybrown'>暂无需要审核的信息</strong>";
}
        }
    })
}

function EditSuccess(chaptcha){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "EditSuccessServlet",
        data: {"chaptcha":chaptcha},
        success: function (result) {
            if(result=="success"){
                var url=encodeURI("Yummy.jsp?");
                window.location.href=url;
            }else{
                alert("操作失败");
            }
        }
    })
}

function EditFail(chaptcha){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "EditFailServlet",
        data: {"chaptcha":chaptcha},
        success: function (result) {
            if(result=="success"){
                var url=encodeURI("Yummy.jsp?");
                window.location.href=url;
            }else{
                alert("操作失败");
            }
        }
    })
}

function GetRestaurantInfo() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetEightRestaurantServlet",
        data: "",
        success: function (result) {
            console.log(result)
            var title=document.getElementById("title");
            title.innerText="销售前8的餐厅";
            var title2=document.getElementById("title2");
            title2.innerText="";
            var showplace=document.getElementById("showplace");
            showplace.innerHTML="";
            var tt=document.getElementById("tt");
            tt.innerHTML="";
            tt.innerHTML +="<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅编码</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅名</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">联系方式</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">餐厅类型</td>\n" +
                "                                </div>\n" ;
            if(result.length>0){
                if(result.length>8){
                    for(var i=0;i<8;i++){
                        console.log(result[i].resAddress)
                        showplace.innerHTML +="<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].chaptcha+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].resName+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].phone+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].restype;+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].resAddress+"</td>\n" +
                        "                                </div>";
                        showplace.innerHTML +="<br><br><br>";
                    }
                }else{
                    for(var i=0;i<result.length;i++){
                        console.log(result[i].resAddress)
                        showplace.innerHTML +="<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].chaptcha+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].resName+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].phone+"</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">"+result[i].restype;+"</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">||</td>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"th th-amount\">\n" +
                        "                                    <td class=\"td-inner\">"+result[i].resAddress+"</td>\n" +
                        "                                </div>";
                        showplace.innerHTML +="<br><br><br>";
                    }
                }
            }else{
                showplace.innerHTML += " <div>暂无商家</div>";
            }
        }
    })
}
function GetMemberInfo() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "GetEightMemberServlet",
        data: "",
        success: function (result) {
            var title = document.getElementById("title");
            title.innerText = "花费前8的会员";
            var title2 = document.getElementById("title2");
            title2.innerText = "";
            var showplace = document.getElementById("showplace");
            showplace.innerHTML = "";
            var tt = document.getElementById("tt");
            tt.innerHTML = "";
            tt.innerHTML += "<div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员编码</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员名</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">联系方式</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">||</td>\n" +
                "                                </div>\n" +
                "                                <div class=\"th th-amount\">\n" +
                "                                    <td class=\"td-inner\">会员积分</td>\n" +
                "                                </div>\n";
            if (result.length > 0) {
                if (result.length > 8) {
                    for (var i = 0; i < 8; i++) {
                        console.log(result[i].resAddress)
                        showplace.innerHTML += "<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberId + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberName + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberPhone + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberCredit;
                        +"</td>\n" +
                        "                                </div>\n";
                        showplace.innerHTML += "<br><br><br>";
                    }
                } else {
                    for (var i = 0; i < result.length; i++) {
                        console.log(result[i].resAddress)
                        showplace.innerHTML += "<div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberId + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberName + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberPhone + "</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">||</td>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"th th-amount\">\n" +
                            "                                    <td class=\"td-inner\">" + result[i].memberCredit;
                        +"</td>\n" +
                        "                                </div>\n";
                        showplace.innerHTML += "<br><br><br>";
                    }
                }
            } else {
                showplace.innerHTML += " <div>暂无会员</div>";
            }
        }
    })
}
function RestaurantLogout(){
    var url=encodeURI("index.jsp?");
    window.location.href=url;
}