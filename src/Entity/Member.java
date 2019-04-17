package Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import Entity.Order;

public class Member implements Serializable{
    //会员信息：用户ID、用户密码、电话、姓名、送餐地点（可多个）、邮箱、历史订单（list）、当前订单、账号、账号余额、会员级别
    //会员级别：一元/分，{1:200,2:400,3:650,4:950,5:1300,6:1700,7:2150,8:2650,9:3200,10:3800}
    //会员优惠：{0:10,1:9.9, 2：9.8, 3:9.7, 4:9.6, 5:9.5, 6:9.4, 7:9.3, 8:9.2, 9:9.1, 10:9}
    private int memberId;//用户ID
    private String password;//用户密码
    private String memberPhone;//
    private String memberName;//姓名
    private ArrayList<String> MemberAddress;
    private String UsingAddress;
    private String memberEmail;
    private ArrayList<Order> OrderHistory;
    private Order Order;
    private String memberAccount;
    private Double memberBalance;
    private int memberLevel;
    private int memberCredit;
    private String Login;
    private double memberdiscount;
    private int MemberCount;

    public String getLogin() {
        return Login;
    }

    public ArrayList<Entity.Order> getOrderHistory() {
        return OrderHistory;
    }

    public ArrayList<String> getMemberAddress() {
        return MemberAddress;
    }

    public Double getMemberBalance() {
        return memberBalance;
    }

    public Entity.Order getOrder() {
        return Order;
    }

    public String getMemberAccount() {
        return memberAccount;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public int getMemberId() {
        return memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public String getMemberPassword() {
        return password;
    }

    public String getUsingAddress() {
        return UsingAddress;
    }

    public int getMemberLevel() {
        return memberLevel;
    }

    public int getMemberCredit() {
        return memberCredit;
    }

    public double getMemberdiscount(){ return memberdiscount;}

    public void setMemberAccount(String memberAccount) {
        //System.out.println("dddddd"+memberAccount);
        this.memberAccount = memberAccount;

    }

    public void setMemberAddress(ArrayList<String> memberAddress) {
        MemberAddress = memberAddress;
    }

    public void setMemberBalance(Double memberBalance) {
        this.memberBalance = memberBalance;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public void setOrder(Entity.Order order) {
        Order = order;
    }

    public void setOrderHistory(ArrayList<Entity.Order> orderHistory) {
        OrderHistory = orderHistory;
    }

    public void setMemberPassword(String password) {
        this.password = password;
    }

    public void setUsingAddress(String usingAddress) {
        UsingAddress = usingAddress;
    }

    public void setMemberLevel(int memberLevel) {
        this.memberLevel = memberLevel;
    }

    public void setMemberCredit(int memberCredit) {
        this.memberCredit = memberCredit;
    }

    public void setLogin(String login) {
        Login = login;
    }

    public void setMemberdiscount(double memberdiscount) {
        this.memberdiscount = memberdiscount;
    }

    public int getMemberCount() {
        return MemberCount;
    }

    public String getPassword() {
        return password;
    }

    public void setMemberCount(int memberCount) {
        MemberCount = memberCount;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
