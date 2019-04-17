package DaoImpl;

import Dao.DaoHelper;
import Dao.OrderDao;
import Entity.Member;
import Entity.Order;
import Entity.Restaurant;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class OrderDaoImpl implements OrderDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    private static ArrayList<Order> orderArrayList=new ArrayList<>();
    private static int y,m,d,h,mi,se;
    @Override
    public String NewOrder(String context, String discount, float price, int memberid, String chaptcha, String Memberaddress,String[] dishid,String[] dishamount) throws Exception
    {
        System.out.println("dao:"+dishid);
        System.out.println("dao:"+dishamount);
        //得到当前时间
        String date;
        String membername="";
        String memberphone="";
        String resName="",resphone="",resAddress="",resType="";
        boolean result1,result3=true;
        int orderid=0;
        int orderinfoid=0;
        String neworder="";
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));
        date=df.format(new Date());
        //得到会员的信息
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result2=null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Member where MemberId ="+memberid+";");
            result=stmt.executeQuery();
            while(result.next()){
                membername=result.getString("MemberName");
                memberphone=result.getString("MemberPhone");
            }
            //得到餐厅的信息
            stmt = con.prepareStatement("select * from Restaurant where Chaptcha ="+chaptcha+";");
            result=stmt.executeQuery();
            while(result.next()){
                resAddress=result.getString("RestaurantAddress");
                resName=result.getString("RestaurantName");
                resphone=result.getString("RestaurantPhone");
                resType=result.getString("RestaurantType");
            }
            //得到orderid
            String resa=resAddress.split("-")[0]+resAddress.split("-")[1]+resAddress.split("-")[2];
            String mema=Memberaddress.split("-")[0]+Memberaddress.split("-")[1]+Memberaddress.split("-")[2];
            //System.out.println(resa);
           // System.out.println(mema);
            if(resa.equals(mema)){
                //插入订单
                stmt=con.prepareStatement("select max(OrderID) from Orders;");
                result=stmt.executeQuery();
                while(result.next()){
                    orderid=result.getInt("max(OrderID)");
                }
                orderid++;
                stmt = con.prepareStatement("insert into Orders(OrderID,MemberID,MemberName,MemberPhone,RestaurantName,RestaurantAddress,RestaurantType,Chaptcha,OrderTime,PayTime,OrderPrice,OrderAddress,OrderState,OrderInfo,Preferential) " +
                        " values ("+orderid+","+memberid+",'"+membername+"','"+memberphone+"','"+resName+"','"+resAddress+"','"+resType+"','"+chaptcha+"','"+date+"','"+date+"',"+price+",'"+Memberaddress+"','未支付','"+context+"','"+discount+"')");
                result1=stmt.execute();
                //插入订单详情
                stmt=con.prepareStatement("select max(OrdersInfoID) from OrdersInfo;");
                result2=stmt.executeQuery();
                while(result2.next()){
                    orderinfoid=result2.getInt("max(OrdersInfoID)");
                }
                for(int i=0;i<dishid.length;i++){
                    System.out.println(dishid[i]);
                    orderinfoid++;
                    stmt=con.prepareStatement("insert into OrdersInfo(OrdersInfoID,OrderID,DishID,DishAmount) values ("+orderinfoid+","+orderid+","+Integer.parseInt(dishid[i])+","+Integer.parseInt(dishamount[i])+")");
                    result3=stmt.execute();
                }
                if(!result1&&!result3){
                    neworder="success";
                }else{
                    neworder="fail";
                }
            }else{
                neworder="超出配送范围，无法生成该订单！";
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);

        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return neworder;
    }

    @Override
    public ArrayList<Order> GetNowOrders(int memberid) {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        ArrayList<Order> orderArrayList=new ArrayList<>();
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Orders where MemberID ="+memberid+";");
            result=stmt.executeQuery();
            while(result.next()){
                Order order=new Order();
                String OrderState=result.getString("OrderState");
                System.out.println("OrderState:"+OrderState);
                if(!OrderState.equals("已收货")&&!OrderState.equals("已取消")) {
                    int OrderID = result.getInt("OrderID");
                    int MemberID = result.getInt("MemberID");
                    String MemberName = result.getString("MemberName");
                    String MemberPhone = result.getString("MemberPhone");
                    String RestaurantName = result.getString("RestaurantName");
                    String ResturantAddress = result.getString("RestaurantAddress");
                    String RestaurantType = result.getString("RestaurantType");
                    String chaptcha = result.getString("chaptcha");
                    double OrderPrice = result.getDouble("OrderPrice");
                    String OrderAddress = result.getString("OrderAddress");
                    String OrderInfo = result.getString("OrderInfo");
                    String Preferential = result.getString("Preferential");
                    String Ordertime =result.getString("OrderTime");
                    String PayTime=result.getString("PayTime");
                    //System.out.println(Ordertime);
                    //System.out.println(result.getString("OrderTime"));
                    //System.out.println(result.getTimestamp("OrderTime"));
                    order.setOrderAddress(OrderAddress);
                    order.setOrderID(OrderID);
                    order.setRestaurantAddress(ResturantAddress);
                    order.setRestaurantName(RestaurantName);
                    order.setChaptcha(chaptcha);
                    order.setMemberName(MemberName);
                    order.setMemberPhone(MemberPhone);
                    order.setMemberID(MemberID);
                    order.setOrderPrice(OrderPrice);
                    order.setOrderState(OrderState);
                    order.setOrderTime(Ordertime);
                    order.setPreferential(Preferential);
                    order.setRestaurantType(RestaurantType);
                    order.setOrderInfo(OrderInfo);
                    order.setOrderArrivedTime(PayTime);
                    orderArrayList.add(order);
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return orderArrayList;
    }

    @Override
    public ArrayList<Order> MembergetOrderbyTime(String MemberName, int MemberID) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result1=null;
        ArrayList<Order> orderArrayList=new ArrayList<>();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT OrderTime,OrderID,MemberID FROM Orders where MemberID="+MemberID+" group by OrderTime,OrderID,MemberID order by OrderTime desc;");
            result=stmt.executeQuery();
            while(result.next()){
                int orderid;
                orderid=result.getInt("OrderID");
                stmt=con.prepareStatement("SELECT * FROM Orders where OrderID="+orderid+";");
                result1=stmt.executeQuery();
                while(result1.next()){
                    Order order=new Order();
                    String RestaurantName,RestaurantAddress,RestaurantType,OrderTime,OrderAddress,OrderInfo,Preferential;
                    double OrderPrice;
                    RestaurantName=result1.getString("RestaurantName");
                    RestaurantAddress=result1.getString("RestaurantAddress");
                    RestaurantType=result1.getString("RestaurantType");
                    OrderTime=result1.getString("OrderTime");
                    OrderAddress=result1.getString("OrderAddress");
                    OrderInfo=result1.getString("OrderInfo");
                    Preferential=result1.getString("Preferential");
                    OrderPrice=result1.getDouble("OrderPrice");
                    String OrderState;
                    OrderState=result1.getString("OrderState");
                    order.setOrderState(OrderState);
                    order.setRestaurantType(RestaurantType);
                    order.setOrderTime(OrderTime);
                    order.setOrderPrice(OrderPrice);
                    order.setRestaurantName(RestaurantName);
                    order.setOrderID(orderid);
                    order.setRestaurantAddress(RestaurantAddress);
                    order.setOrderAddress(OrderAddress);
                    order.setOrderInfo(OrderInfo);
                    order.setPreferential(Preferential);
                    orderArrayList.add(order);
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return orderArrayList;
    }

    @Override
    public ArrayList<Order> MembergetOrderbyPrice(String MemberName, int MemberID) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result1=null;
        ArrayList<Order> orderArrayList=new ArrayList<>();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT OrderPrice,OrderID,MemberID FROM Orders where MemberID="+MemberID+" group by OrderPrice,OrderID,MemberID order by OrderPrice desc;");
            result=stmt.executeQuery();
            while(result.next()){
                int orderid;
                orderid=result.getInt("OrderID");
                stmt=con.prepareStatement("SELECT * FROM Orders where OrderID="+orderid+";");
                result1=stmt.executeQuery();
                while(result1.next()){
                    Order order=new Order();
                    String RestaurantName,RestaurantAddress,RestaurantType,OrderTime,OrderAddress,OrderInfo,Preferential;
                    double OrderPrice;
                    String OrderState;
                    RestaurantName=result1.getString("RestaurantName");
                    RestaurantAddress=result1.getString("RestaurantAddress");
                    RestaurantType=result1.getString("RestaurantType");
                    OrderTime=result1.getString("OrderTime");
                    OrderAddress=result1.getString("OrderAddress");
                    OrderInfo=result1.getString("OrderInfo");
                    Preferential=result1.getString("Preferential");
                    OrderPrice=result1.getDouble("OrderPrice");
                    OrderState=result1.getString("OrderState");
                    order.setOrderState(OrderState);
                    order.setRestaurantType(RestaurantType);
                    order.setOrderTime(OrderTime);
                    order.setOrderPrice(OrderPrice);
                    order.setRestaurantName(RestaurantName);
                    order.setOrderID(orderid);
                    order.setRestaurantAddress(RestaurantAddress);
                    order.setOrderAddress(OrderAddress);
                    order.setOrderInfo(OrderInfo);
                    order.setPreferential(Preferential);
                    orderArrayList.add(order);
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return orderArrayList;
    }

    @Override
    public ArrayList<Restaurant> MembergetOrderbyfrequency(String MemberName, int MemberID) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result1=null;
        ArrayList<Restaurant> restaurantArrayList=new ArrayList<>();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT RestaurantName,RestaurantType,RestaurantAddress,count(*) Rescount FROM Orders where MemberID="+MemberID+" group by RestaurantName,MemberID,RestaurantType,RestaurantAddress order by count(*) desc");
            result=stmt.executeQuery();
            while(result.next()) {
                Restaurant restaurant = new Restaurant();
                String RestaurantName, RestaurantAddress, RestaurantType;
                int Rescount;
                RestaurantName = result.getString("RestaurantName");
                RestaurantAddress = result.getString("RestaurantAddress");
                RestaurantType = result.getString("RestaurantType");
                Rescount=result.getInt("Rescount");
                restaurant.setRestype(RestaurantType);
                restaurant.setResName(RestaurantName);
                restaurant.setResAddress(RestaurantAddress);
                restaurant.setRescount(Rescount);
                restaurantArrayList.add(restaurant);
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return restaurantArrayList;
    }

    @Override
    public ArrayList<Order> MembergetOrderbyRestype(String MemberName, int MemberID,String Type) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        ArrayList<Order> orderArrayList=new ArrayList<>();
        //System.out.println(Type);
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT * From Orders where MemberID="+MemberID+" and RestaurantType='"+Type+"'");
            result=stmt.executeQuery();
            while(result.next()){
                Order order=new Order();
                String RestaurantName,RestaurantAddress,RestaurantType,OrderTime,OrderAddress,OrderInfo,Preferential;
                double OrderPrice;
                String OrderState;
                RestaurantName=result.getString("RestaurantName");
                RestaurantAddress=result.getString("RestaurantAddress");
                RestaurantType=result.getString("RestaurantType");
                OrderTime=result.getString("OrderTime");
                OrderAddress=result.getString("OrderAddress");
                OrderInfo=result.getString("OrderInfo");
                Preferential=result.getString("Preferential");
                OrderPrice=result.getDouble("OrderPrice");
                OrderState=result.getString("OrderState");
                order.setOrderState(OrderState);
                order.setRestaurantType(RestaurantType);
                order.setOrderTime(OrderTime);
                order.setOrderPrice(OrderPrice);
                order.setRestaurantName(RestaurantName);
                order.setRestaurantAddress(RestaurantAddress);
                order.setOrderAddress(OrderAddress);
                order.setOrderInfo(OrderInfo);
                order.setPreferential(Preferential);
                orderArrayList.add(order);
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        System.out.println(orderArrayList);
        return orderArrayList;
    }

    @Override
    public ArrayList<Order> ResgetOrderbyPrice(String ResName, String Chaptcha) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result1=null;
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT OrderPrice,OrderID,MemberID FROM Orders where Chaptcha= '"+Chaptcha+"' group by OrderPrice,OrderID,Chaptcha order by OrderPrice desc");
            result=stmt.executeQuery();
            while(result.next()){
                int orderid;
                orderid=result.getInt("OrderID");
                stmt=con.prepareStatement("SELECT * FROM Orders where OrderID="+orderid+";");
                result1=stmt.executeQuery();
                while(result1.next()) {
                    Order order = new Order();
                    String MemberName, MemberPhone, OrderTime, OrderAddress, OrderInfo, Preferential;
                    double OrderPrice;
                    int MemberID;
                    String OrderState;
                    MemberName = result1.getString("MemberName");
                    MemberID = result1.getInt("MemberID");
                    MemberPhone = result1.getString("MemberPhone");
                    OrderTime = result1.getString("OrderTime");
                    OrderAddress = result1.getString("OrderAddress");
                    OrderInfo = result1.getString("OrderInfo");
                    Preferential = result1.getString("Preferential");
                    OrderPrice = result1.getDouble("OrderPrice");
                    OrderState=result1.getString("OrderState");
                    order.setOrderState(OrderState);
                    order.setOrderTime(OrderTime);
                    order.setOrderPrice(OrderPrice);
                    order.setOrderAddress(OrderAddress);
                    order.setOrderInfo(OrderInfo);
                    order.setPreferential(Preferential);
                    order.setMemberName(MemberName);
                    order.setMemberID(MemberID);
                    order.setMemberPhone(MemberPhone);
                    orderArrayList.add(order);
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return orderArrayList;
    }

    @Override
    public ArrayList<Order> ResgetOrderbyTime(String ResName, String Chaptcha) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result1=null;
        ArrayList<Order> orderArrayList=new ArrayList<>();
        orderArrayList.clear();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT OrderTime,OrderID,MemberID FROM Orders where Chaptcha= '"+Chaptcha+"' group by OrderTime,OrderID,Chaptcha order by OrderTime desc");
            result=stmt.executeQuery();
            while(result.next()){
                int orderid;
                orderid=result.getInt("OrderID");
                stmt=con.prepareStatement("SELECT * FROM Orders where OrderID="+orderid+";");
                result1=stmt.executeQuery();
                while(result1.next()) {
                    Order order = new Order();
                    String MemberName, MemberPhone, OrderTime, OrderAddress, OrderInfo, Preferential;
                    double OrderPrice;
                    int MemberID;
                    String OrderState;
                    MemberName = result1.getString("MemberName");
                    MemberID = result1.getInt("MemberID");
                    MemberPhone = result1.getString("MemberPhone");
                    OrderTime = result1.getString("OrderTime");
                    OrderAddress = result1.getString("OrderAddress");
                    OrderInfo = result1.getString("OrderInfo");
                    Preferential = result1.getString("Preferential");
                    OrderPrice = result1.getDouble("OrderPrice");
                    OrderState=result1.getString("OrderState");
                    order.setOrderState(OrderState);
                    order.setOrderTime(OrderTime);
                    order.setOrderPrice(OrderPrice);
                    order.setOrderAddress(OrderAddress);
                    order.setOrderInfo(OrderInfo);
                    order.setPreferential(Preferential);
                    order.setMemberName(MemberName);
                    order.setMemberID(MemberID);
                    order.setMemberPhone(MemberPhone);
                    orderArrayList.add(order);
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return orderArrayList;
    }

    @Override
    public ArrayList<Member> ResgetOrderbyfrequency(String ResName, String Chaptcha) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        ArrayList<Member> members=new ArrayList<>();
        members.clear();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("SELECT count(*)MemberCount,MemberID,MemberName,MemberPhone FROM Orders where Chaptcha= '"+Chaptcha+"' group by Chaptcha,MemberID,MemberName,MemberPhone order by count(*) desc");
            result=stmt.executeQuery();
            while(result.next()){
                Member member=new Member();
                String MemberName,MemberPhone;
                int MemberID;
                int MemberCount;
                MemberName=result.getString("MemberName");
                MemberID=result.getInt("MemberID");
                MemberPhone=result.getString("MemberPhone");
                MemberCount=result.getInt("MemberCount");
                member.setMemberName(MemberName);
                member.setMemberId(MemberID);
                member.setMemberPhone(MemberPhone);
                member.setMemberCount(MemberCount);
                members.add(member);
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return members;
    }

    @Override
    public String PayNowOrders(int memberid, int orderid,double orderprice) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result4=null;
        String pay="";
        double balance=0;
        boolean result2=true,result3=true;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));
        String date=df.format(new Date());
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select MemberBalance from Member where MemberId ="+memberid+";");
            result=stmt.executeQuery();
            while(result.next()){
                balance =result.getDouble("MemberBalance");
            }
            System.out.println("balance:"+balance);
            System.out.println("orderprice:"+orderprice);
            if(balance<orderprice){
                pay="余额不足，扣款失败";
            }else{
                //更新余额，状态，支付时间
                stmt = con.prepareStatement("UPDATE Orders Set PayTime='"+date+"',OrderState = '派送中' where OrderId="+orderid);
                result2 = stmt.execute();
                if(!result2){
                    balance=balance-orderprice;
                    stmt = con.prepareStatement("UPDATE Member Set MemberBalance="+balance+" where MemberId="+memberid);
                    result3 = stmt.execute();
                    stmt = con.prepareStatement("SELECT DishID , DishAmount from OrdersInfo where OrderID="+orderid);
                    result = stmt.executeQuery();
                    while(result.next()){
                        int dishid;
                        int dishamount;
                        int DishAmount=0;
                        dishid=result.getInt("DishID");
                        dishamount=result.getInt("DishAmount");
                        //修改库存数量
                        stmt = con.prepareStatement("SELECT DishAmount from Dish where DishID="+dishid);
                        result4 = stmt.executeQuery();
                        while(result4.next()){
                            DishAmount=result4.getInt("DishAmount");
                        }
                        DishAmount=DishAmount-dishamount;
                        stmt = con.prepareStatement("UPDATE Dish Set DishAmount="+DishAmount+" where DishID="+dishid);
                        result3 = stmt.execute();
                    }
                }
            }
            if(!result3){
                pay="Success";
            }else{
                pay="Fail";
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return pay;
    }

    @Override
    public String Cancelorderbeforepay(int orderid)throws Exception{
        Connection con=null;
        PreparedStatement stmt=null;
        boolean result=true;
        String cancel="";
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Orders Set OrderState='已取消' where OrderId="+orderid);
            result = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            e.printStackTrace();
        }
        if(result){
            cancel="fail";
        }else{
            cancel="success";
        }
            return cancel;
    }

    @Override
    public String OrderArrived(int orderid) throws Exception {
        //状态改为已收货，钱款打给餐厅
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        boolean result1=true;
        String OrderArrived="";
        double orderprice=0;
        String chaptcha="";
        double resbalance=0;
        int credit=0;
        int MemberID=0;
        int level=0;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Orders Set OrderState='已收货' where OrderId="+orderid);
            result1 = stmt.execute();
            if(!result1){
                stmt = con.prepareStatement("SELECT OrderPrice,MemberID from Orders where OrderId="+orderid);
                result = stmt.executeQuery();
                while(result.next()){
                    orderprice=result.getDouble("OrderPrice");
                    MemberID=result.getInt("MemberID");
                    System.out.println(orderprice);
                }
                stmt = con.prepareStatement("SELECT Chaptcha from Orders where OrderId="+orderid);
                result = stmt.executeQuery();
                while(result.next()){
                    chaptcha=result.getString("Chaptcha");
                    System.out.println(chaptcha);
                }
            }
            stmt = con.prepareStatement("SELECT RestaurantBalance from Restaurant where Chaptcha="+chaptcha);
            result = stmt.executeQuery();
            while(result.next()){
               resbalance= result.getDouble("RestaurantBalance");
            }
            resbalance=resbalance+orderprice;
            stmt = con.prepareStatement("UPDATE Restaurant Set RestaurantBalance="+resbalance+" where Chaptcha="+chaptcha);
            result1 = stmt.execute();
            //更新会员的积分和等级
            stmt = con.prepareStatement("SELECT MemberCredit from Member where MemberId="+MemberID);
            result = stmt.executeQuery();
            while(result.next()) {
                credit = result.getInt("MemberCredit");
                System.out.println(credit);
                credit = credit + (new Double(orderprice)).intValue();
                System.out.println(credit);
                if (credit >= 0 && credit < 200) {
                    level = 0;
                } else {
                    if (credit >= 200 && credit < 400) {
                        level = 1;
                    } else {
                        if (credit >= 400 && credit < 650) {
                            level = 2;
                        } else {
                            if (credit >= 650 && credit < 950) {
                                level = 3;
                            } else {
                                if (credit >= 950 && credit < 1300) {
                                    level = 4;
                                } else {
                                    if (credit >= 1300 && credit < 1700) {
                                        level = 5;
                                    }
                                }
                            }
                        }
                    }
                }
                System.out.println(level);
                //update level credit
                stmt = con.prepareStatement("UPDATE Member Set MemberLevel="+level+" where MemberId="+MemberID);
                result1 = stmt.execute();
                stmt = con.prepareStatement("UPDATE Member Set MemberCredit="+credit+" where MemberId="+MemberID);
                result1 = stmt.execute();
            }
            if(!result1){
                OrderArrived="success";
            }else{
                OrderArrived="fail";
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return OrderArrived;
    }

    @Override
    public String Cancelorderafterpay(int orderid) throws Exception {
        //状态改为已收货，钱款打给会员
        System.out.println("取消");
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null,result4=null;
        boolean result1=true,result3=true;
        String Cancel="success";
        double orderprice=0;
        int MemberID=0;
        double MemberBalance=0;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Orders Set OrderState='已取消' where OrderId="+orderid);
            result1 = stmt.execute();
            if(!result1){
                stmt = con.prepareStatement("SELECT OrderPrice from Orders where OrderId="+orderid);
                result = stmt.executeQuery();
                while(result.next()){
                    orderprice=result.getDouble("OrderPrice");
                    System.out.println(orderprice);
                }
                stmt = con.prepareStatement("SELECT MemberID from Orders where OrderId="+orderid);
                result = stmt.executeQuery();
                while(result.next()){
                    MemberID=result.getInt("MemberID");
                    System.out.println(MemberID);
                    System.out.println(MemberID);
                }
            }
            stmt = con.prepareStatement("SELECT MemberBalance from Member where MemberId="+MemberID);
            result = stmt.executeQuery();
            while(result.next()){
                MemberBalance= result.getDouble("MemberBalance");
            }
            MemberBalance=MemberBalance+orderprice;
            stmt = con.prepareStatement("UPDATE Member Set MemberBalance="+MemberBalance+" where MemberId="+MemberID);
            result1 = stmt.execute();
            stmt = con.prepareStatement("SELECT DishID , DishAmount from OrdersInfo where OrderID="+orderid);
            result = stmt.executeQuery();
            while(result.next()){
                int dishid;
                int dishamount;
                int DishAmount=0;
                dishid=result.getInt("DishID");
                dishamount=result.getInt("DishAmount");
                //修改库存数量
                stmt = con.prepareStatement("SELECT DishAmount from Dish where DishID="+dishid);
                result4 = stmt.executeQuery();
                while(result4.next()){
                    DishAmount=result4.getInt("DishAmount");
                }
                DishAmount=DishAmount+dishamount;
                stmt = con.prepareStatement("UPDATE Dish Set DishAmount="+DishAmount+" where DishID="+dishid);
                result3 = stmt.execute();
            }
            if(!result1){
                Cancel="success";
            }else{
                Cancel="fail";
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return Cancel;
    }
}
