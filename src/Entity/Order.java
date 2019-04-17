package Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;

public class Order implements Serializable{
    //用户的历史订单：订单号、用户的姓名、送餐地址、订单金额、餐厅、下单时间、订单状态(已接单/正在派送/已经送达：显示送达时间)、享受的优惠
    private int orderID;
    private int MemberID;
    private String memberName;
    private String memberPhone;
    private String RestaurantName;
    private String RestaurantAddress;
    private String RestaurantType;
    private String chaptcha;
    private String orderTime;
    private String orderArrivedTime;
    private double orderPrice;
    private String orderAddress;
    private String orderState;
    private String preferential;
    private String OrderInfo;

    public int getMemberID() {
        return MemberID;
    }

    public String getChaptcha() {
        return chaptcha;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public String getMemberName() {
        return memberName;
    }

    public double getOrderPrice() {
        return orderPrice;
    }

    public String getPreferential() {
        return preferential;
    }

    public int getOrderID() {
        return orderID;
    }

    public String getOrderAddress() {
        return orderAddress;
    }

    public String getOrderArrivedTime() {
        return orderArrivedTime;
    }

    public String getOrderState() {
        return orderState;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public String getRestaurantAddress() {
        return RestaurantAddress;
    }

    public String getRestaurantName() {
        return RestaurantName;
    }

    public String getRestaurantType() {
        return RestaurantType;
    }

    public String getOrderInfo() {
        return OrderInfo;
    }

    public void setChaptcha(String chaptcha) {
        this.chaptcha = chaptcha;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public void setMemberID(int memberID) {
        MemberID = memberID;
    }

    public void setOrderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
    }

    public void setOrderArrivedTime(String orderArrivedTime) {
        this.orderArrivedTime = orderArrivedTime;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public void setOrderPrice(double orderPrice) {
        this.orderPrice = orderPrice;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public void setPreferential(String preferential) {
        this.preferential = preferential;
    }

    public void setRestaurantName(String restaurantName) {
        RestaurantName = restaurantName;
    }

    public void setRestaurantAddress(String restaurantAddress) {
        RestaurantAddress = restaurantAddress;
    }

    public void setRestaurantType(String restaurantType) {
        RestaurantType = restaurantType;
    }

    public void setOrderInfo(String orderInfo) {
        OrderInfo = orderInfo;
    }
}
