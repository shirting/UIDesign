package DaoImpl;

import Dao.DaoHelper;
import Dao.YummyDao;
import Entity.Restaurant;
import Entity.Yummy;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class YummyDaoImpl implements YummyDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    @Override
    public Yummy isValidLogin(String Yummyname, String password) throws Exception {
        Yummy yummy=new Yummy();
        Boolean exist=false;
        String Login="";
        int Id;
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        try {
            con=daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Yummy");
            result = stmt.executeQuery();
            //if(result.getString("MemberPassword").equals(password)){
            while (result.next()) {
                if(result.getString("YummyName").equals(Yummyname)){
                    exist=true;
                    if(password.equals(result.getString("YummyPassword"))) {
                        Login = "Success";
                        Id=result.getInt("YummyId");
                        yummy.setYummyId(Id);
                        yummy.setYummyname(Yummyname);
                        yummy.setYummypassword(password);
                    }
                }
                else{
                    yummy.setYummyname("");
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
                return yummy;
    }

    @Override
    public ArrayList<Restaurant> CheckRestaurant() throws Exception {
        String phone,name,address,type;
        ArrayList<Restaurant> restaurants=new ArrayList<>();
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        try {
            con=daoHelper.getConnection();
        stmt=con.prepareStatement("select * from Restaurant where CheckBaseInfo = 'doing'");
        result=stmt.executeQuery();
        while(result.next()){
            Restaurant restaurant=new Restaurant();
            phone=result.getString("RestaurantPhone");
            name=result.getString("RestaurantName");
            address=result.getString("RestaurantAddress");
            type=result.getString("RestaurantType");
            //System.out.println(phone+"//"+name+"//"+address+"//"+type);
            restaurant.setPhone(phone);
            restaurant.setResAddress(address);
            restaurant.setResName(name);
            restaurant.setRestype(type);
            /*
            System.out.println(restaurant.getPhone());
            System.out.println(restaurant.getResAddress());
            System.out.println(restaurant.getRestype());
            System.out.println(restaurant.getResName());
            */
            restaurants.add(restaurant);
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
        return restaurants;
    }

    @Override
    public ArrayList<Restaurant> CheckEditBaseInfo() throws Exception {
        String phone,name,address,type;
        ArrayList<Restaurant> restaurants=new ArrayList<>();
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("select * from EditRestaurantInfo where Result = 'doing'");
            result=stmt.executeQuery();
            while(result.next()){
                Restaurant restaurant=new Restaurant();
                restaurant.setResName(result.getString("ResName"));
                restaurant.setPhone(result.getString("ResPhone"));
                restaurant.setResAddress(result.getString("ResAddress"));
                restaurant.setRestype(result.getString("ResType"));
                restaurant.setChaptcha(result.getString("ResChaptcha"));
                restaurant.setEidtid(result.getInt("EditID"));
                restaurants.add(restaurant);
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
        return restaurants;
    }
}
