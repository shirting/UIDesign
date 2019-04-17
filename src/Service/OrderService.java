package Service;

import Entity.Member;
import Entity.Order;
import Entity.Restaurant;

import java.util.ArrayList;

public interface OrderService {
    //会员按照时间排序：会员的ID
    public ArrayList<Order> MembergetOrderbyTime(String MemberName, int MemberID)throws Exception;
    //会员按照金额排序：会员的ID
    public ArrayList<Order> MembergetOrderbyPrice(String MemberName,int MemberID)throws Exception;
    //会员按照店铺的次数排序：会员的ID
    public ArrayList<Restaurant> MembergetOrderbyfrequency(String MemberName, int MemberID)throws Exception;
    //会员按照最喜欢的菜品种类排序：会员的ID
    public ArrayList<Order> MembergetOrderbyRestype(String MemberName,int MemberID,String Type)throws Exception;
    //餐厅按照订单的金额大小排序
    public ArrayList<Order> ResgetOrderbyPrice(String ResName,String Chaptcha)throws Exception;
    //餐厅按照订单的时间前后排序
    public ArrayList<Order> ResgetOrderbyTime(String ResName,String Chaptcha)throws Exception;
    //餐厅按照订单的点餐次数排序
    public ArrayList<Member> ResgetOrderbyfrequency(String ResName, String Chaptcha)throws Exception;
    //新的订单
    public String NewOrder(String context, String address, float price, String discount, String chaptcha, int memberid,String[] dishId,String[] dishamount)throws Exception;
    //得到当前未完成订单
    public ArrayList<Order> GetNowOrders(int memberid)throws Exception;
    //支付订单
    public String PayNowOrders(int memberid,int orderid,double orderprice)throws Exception;
    //支付前取消订单
    public String Cancelorderbeforepay(int orderid)throws Exception;
    //收货成功
    public String OrderArrived(int orderid)throws Exception;
    //支付后取消订单
    public String Cancelorderafterpay(int orderid)throws Exception;
}
