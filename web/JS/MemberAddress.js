function Main(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Main.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function member(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("Member.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberNowOrder(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberNowOrder.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function MemberHistoryOrders(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberHistoryOrder.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function Memberaddress(){
    var thisURL=decodeURI(window.location.href);
    var id=thisURL.split('~')[1];
    var name=thisURL.split('~')[2];
    var password=thisURL.split('~')[3];
    var url=encodeURI("MemberAddress.jsp?~"+id+"~"+name+"~"+password);
    window.location.href=url;
}
function Logout(){
    var url=encodeURI("index.jsp");
    window.location.href=url;
}
