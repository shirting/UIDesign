package ServiceImpl;

import Dao.OrderDao;
import DaoImpl.OrderDaoImpl;
import Entity.Member;
import Entity.Order;
import Entity.Restaurant;
import Service.OrderService;

import java.util.ArrayList;

public class OrderServiceImpl implements OrderService {
    OrderDao orderDao=new OrderDaoImpl();
    @Override
    public ArrayList<Order> MembergetOrderbyTime(String MemberName, int MemberID) throws Exception {
        return orderDao.MembergetOrderbyTime(MemberName,MemberID);
    }

    @Override
    public ArrayList<Order> MembergetOrderbyPrice(String MemberName, int MemberID) throws Exception {
        return orderDao.MembergetOrderbyPrice(MemberName,MemberID);
    }

    @Override
    public ArrayList<Restaurant> MembergetOrderbyfrequency(String MemberName, int MemberID) throws Exception {
        return orderDao.MembergetOrderbyfrequency(MemberName,MemberID);
    }

    @Override
    public ArrayList<Order> MembergetOrderbyRestype(String MemberName, int MemberID,String Type) throws Exception {
        return orderDao.MembergetOrderbyRestype(MemberName,MemberID,Type);
    }

    @Override
    public ArrayList<Order> ResgetOrderbyPrice(String ResName, String Chaptcha) throws Exception {
        return orderDao.ResgetOrderbyPrice(ResName,Chaptcha);
    }

    @Override
    public ArrayList<Order> ResgetOrderbyTime(String ResName, String Chaptcha) throws Exception {
        return orderDao.ResgetOrderbyTime(ResName,Chaptcha);
    }

    @Override
    public ArrayList<Member> ResgetOrderbyfrequency(String ResName, String Chaptcha) throws Exception {
        return orderDao.ResgetOrderbyfrequency(ResName,Chaptcha);
    }

    @Override
    public String NewOrder(String context, String address, float price, String discount, String chaptcha, int memberid,String[] dishid,String[] dishamount) throws Exception {
        return orderDao.NewOrder(context,discount,price,memberid,chaptcha,address,dishid,dishamount);
    }

    @Override
    public ArrayList<Order> GetNowOrders(int memberid) throws Exception {
        return orderDao.GetNowOrders(memberid);
    }

    @Override
    public String PayNowOrders(int memberid, int orderid,double orderprice) throws Exception {
        return orderDao.PayNowOrders(memberid,orderid,orderprice);
    }

    @Override
    public String Cancelorderbeforepay(int orderid)throws Exception {
        return orderDao.Cancelorderbeforepay(orderid);
    }

    @Override
    public String OrderArrived(int orderid) throws Exception {
        return orderDao.OrderArrived(orderid);
    }

    @Override
    public String Cancelorderafterpay(int orderid) throws Exception {
        return orderDao.Cancelorderafterpay(orderid);
    }
}
