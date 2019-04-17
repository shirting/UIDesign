package DaoImpl;

import Dao.DaoHelper;
import Dao.DishDao;
import Entity.Dish;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DishDaoImpl implements DishDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    boolean success = true;
    boolean fail = true;

    @Override
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha) throws Exception {
        //得到当天时间与每个菜品的时间范围作比较
        int y,m,d;
        String date;
        Calendar cal= Calendar.getInstance();
        y=cal.get(Calendar.YEAR);
        m=cal.get(Calendar.MONTH)+1;
        d=cal.get(Calendar.DATE);
        date=""+y+"-"+m+"-"+d;
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        String name, info;
        int amount;
        double price;
        int dishid;
        ArrayList<Dish> dishArrayList = new ArrayList<>();
        try {
            System.out.println(Chaptcha);
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Dish WHERE ResChaptcha = " + Chaptcha + ";");
            result = stmt.executeQuery();
            while (result.next()) {
                java.util.Date starttime=new java.util.Date(result.getTimestamp("StartTime").getTime());
                java.util.Date endtime=new java.util.Date(result.getTimestamp("EndTime").getTime());
                DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
                java.util.Calendar c=java.util.Calendar.getInstance();
                java.text.SimpleDateFormat f=new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                System.out.println(f.format(c.getTime()));
                try{
                    Date current=df.parse(date);
                    System.out.println(current);
                    System.out.println(current.getTime());
                    System.out.println(starttime.getTime());
                    System.out.println(current.getTime()<=endtime.getTime());
                    if(current.getTime()<=endtime.getTime()&&current.getTime()>=starttime.getTime()){
                        Dish dish = new Dish();
                        name = result.getString("DishName");
                        info = result.getString("DishInfo");
                        price = result.getDouble("DishPrice");
                        amount = result.getInt("DishAmount");
                        dishid=result.getInt("DishID");
                        dish.setChaptcha(Chaptcha);
                        dish.setDishAmount(amount);
                        dish.setDishInfo(info);
                        dish.setDishname(name);
                        dish.setDishPrice(price);
                        dish.setDishesID(dishid+"");
                        dish.setEndTime(result.getString("EndTime"));
                        dish.setStartTime(result.getString("StartTime"));
                        dishArrayList.add(dish);
                    }
                }catch (Exception exception) {
                    exception.printStackTrace();
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);

        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            System.out.println(e);
            e.printStackTrace();
        }
        return dishArrayList;
    }

    @Override
    public ArrayList<Dish> CheckDish() throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        String name, info, chaptcha, ID;
        int amount;
        double price;
        Dish dish = new Dish();
        ArrayList<Dish> dishes = new ArrayList<>();
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Dish WHERE Result = 'doing'");
            result = stmt.executeQuery();
            while (result.next()) {
                name = result.getString("DishName");
                info = result.getString("DishInfo");
                chaptcha = result.getString("ResChaptcha");
                amount = result.getInt("DishAmount");
                price = result.getDouble("DishPrice");
                ID = result.getString("DishesID");
                dish.setDishPrice(price);
                dish.setDishInfo(info);
                dish.setDishAmount(amount);
                dish.setDishname(name);
                dish.setChaptcha(chaptcha);
                dish.setDishesID(ID);
                dishes.add(dish);
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
        return dishes;
    }

    @Override
    public boolean SuccessDish(String ID) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("update Dishes SET Result ='success' WHERE DishesID = '" + ID + "'");
            success = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            e.printStackTrace();
        }
        return success;
    }

    @Override
    public boolean FailDish(String ID) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("update Dishes SET Result ='fail' WHERE DishesID = '" + ID + "'");
            fail = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            e.printStackTrace();
        }
        return fail;
    }

    @Override
    public boolean AddDish(String Dishname, String DishInfo, String chaptcha, double DishPrice, int DishAmount,String StartTime,String EndTime) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean add = true;
        int DishID=0;
        //信息重复问题
        try {
            con = daoHelper.getConnection();
            stmt=con.prepareStatement("select max(DishID) from Dish" );
            result=stmt.executeQuery();
            while(result.next()){
                DishID=result.getInt("max(DishID)");
            }
            DishID++;
            stmt=con.prepareStatement("insert into Dish(DishID,ResChaptcha,DishName,DishPrice,DishAmount,Result,DishInfo,Starttime,EndTime) values ("+DishID+",'"+chaptcha+"','"+Dishname+"',"+DishPrice+","+DishAmount+",'success','"+DishInfo+"', '"+StartTime+"','"+EndTime+"')" );
            add=stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return add;
    }

    @Override
    public boolean DeleteDish(String chaptcha,String ID)throws Exception{
        Connection con = null;
        PreparedStatement stmt = null;
        boolean delete=true;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("delete from Dishes WHERE DishesID = '" + ID + "'");
            delete = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            e.printStackTrace();
        }
        return delete;
    }

}
