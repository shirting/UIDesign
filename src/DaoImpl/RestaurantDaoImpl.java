package DaoImpl;

import Dao.DaoHelper;
import Dao.RestaurantDao;
import Entity.Discount;
import Entity.Dish;
import Entity.Restaurant;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;

public class RestaurantDaoImpl implements RestaurantDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    String reslogin;
    boolean result1;
    String name, chaptcha, phone, address, type;
    int EditID;

    @Override
    public String isValidLogin(String Restaurantname, String chaptcha) throws Exception {
        boolean exist = false;
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Restaurant");
            result = stmt.executeQuery();
            //if(result.getString("MemberPassword").equals(password)){
            while (result.next()) {
                if (result.getString("Chaptcha").equals(chaptcha) && result.getString("RestaurantName").equals(Restaurantname) && result.getString("CheckBaseInfo").equals("success")) {
                    exist = true;
                    reslogin = "Success";
                    break;
                }
                if (result.getString("Chaptcha").equals(chaptcha) && result.getString("RestaurantName").equals(Restaurantname) && result.getString("CheckBaseInfo").equals("doing")) {
                    exist = true;
                    reslogin = "doing";
                    break;
                }
                if (result.getString("Chaptcha").equals(chaptcha) && result.getString("RestaurantName").equals(Restaurantname) && result.getString("CheckBaseInfo").equals("fail")) {
                    exist = true;
                    reslogin = "fail";
                    break;
                }
                if (!result.getString("RestaurantName").equals(Restaurantname) && result.getString("Chaptcha").equals(chaptcha)) {
                    exist = true;
                    reslogin = "Wrong Name or Wrong Chaptcha";
                    break;
                }
                if (!result.getString("Chaptcha").equals(chaptcha) && result.getString("RestaurantName").equals(Restaurantname)) {
                    exist = true;
                    reslogin = "Wrong Name or Wrong Chaptcha";
                    break;
                }
            }
            if (!exist) {
                reslogin = "Don't exist";
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
        return reslogin;
    }

    @Override
    public String Register(String name, String phone, String address, String type) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        String register = "", check;
        int ID;
        boolean exist = false, result1;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Restaurant ");
            result = stmt.executeQuery();
            //System.out.println(name.toString() + "//" + phone + "//" + address + "//" + type);
            while (result.next()) {
                if (result.getString("RestaurantAddress").equals(address)) {
                    check = result.getString("CheckBaseInfo");
                    register = check;
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                stmt = con.prepareStatement("select max(RestaurantID) from Restaurant");
                result = stmt.executeQuery();
                while (result.next()) {
                    ID = result.getInt("max(RestaurantID)");
                    ID++;
                    stmt = con.prepareStatement("insert into Restaurant(RestaurantID,Chaptcha,RestaurantName,RestaurantPhone,RestaurantAddress,RestaurantType,CheckBaseInfo,CheckInfo,CheckDish,EditBaseInfo,RestaurantBalance) values (" + ID + "," + "'','" + name + "','" + phone + "','" + address + "','" + type + "','" + "doing','','','',"+0+")");
                    result1 = stmt.execute();
                    if (!result1) {
                        register = "Success";
                    } else {
                        register = "Fail";
                    }
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
        return register;
    }


    @Override
    public Boolean ResFail(String name, String phone, String address, String type) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean resfail = false;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Restaurant Set Checked='fail' where RestaurantName = '" + name + "' and RestaurantPhone = '" + phone + "' and RestaurantAddress = '" + address + "' and RestaurantType = '" + type + "'");
            resfail = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return resfail;
    }

    @Override
    public int GetUUID() throws Exception {
        ArrayList<Integer> chaptcha = new ArrayList<>();
        int chap = 0;
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Restaurant where CheckBaseInfo = 'success'");
            result = stmt.executeQuery();
            while (result.next()) {
                chap = Integer.parseInt(result.getString("Chaptcha"));
                System.out.println(result.getString("RestaurantName"));
                System.out.print("//chap:" + chap);
                chaptcha.add(chap);
            }
            chap = chaptcha.get(chaptcha.size() - 1);
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return chap;
    }

    @Override
    public Boolean WriteUUID(String chaptcha, String name, String phone, String address, String type) throws Exception {
        boolean WriteUUID = false;
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Restaurant Set " +
                    " Chaptcha='" + chaptcha + "' where RestaurantName = '" + name + "' and RestaurantPhone = '" + phone + "' and RestaurantAddress = '" + address + "' and RestaurantType = '" + type + "'");
            WriteUUID = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return WriteUUID;
    }

    @Override
    public Boolean ResSuccess(String name, String phone, String address, String type) throws Exception {
        boolean ressuccess = false;
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("UPDATE Restaurant Set " +
                    " CheckBaseInfo='success' where RestaurantName = '" + name + "' and RestaurantPhone = '" + phone + "' and RestaurantAddress = '" + address + "' and RestaurantType = '" + type + "'");
            ressuccess = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return ressuccess;
    }

    @Override
    public Restaurant getRestaurantInfo(String name, String chaptcha) throws Exception {
        //得到餐厅的基本信息
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        Restaurant restaurant = new Restaurant();
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Restaurant WHERE Chaptcha = '" + chaptcha + "' AND RestaurantName = '" + name + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                phone = result.getString("RestaurantPhone");
                address = result.getString("RestaurantAddress");
                type = result.getString("RestaurantType");
            }
            restaurant.setRestype(type);
            restaurant.setResName(name);
            restaurant.setResAddress(address);
            restaurant.setPhone(phone);
            restaurant.setChaptcha(chaptcha);
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return restaurant;
    }

    @Override
    public String EditRestaurantInfo(String chaptcha, String name, String phone, String type, String address) throws SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean exist = false;
        String edit = "";
        try {
            con = daoHelper.getConnection();
            //判断该餐厅是否有未审核的修改申请
            stmt = con.prepareStatement("select Result from EditRestaurantInfo where ResChaptcha = '" + chaptcha + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                //System.out.println("result:"+result.getString("Result"));
                if (result.getString("Result").equals("doing")) {
                    exist = true;
                    edit = "The restaurant still has unaudited application for information modification";
                    break;
                }
            }
            //如果所有的申请均已审核那么插入新的数据
            if (!exist) {
                //System.out.println("exist:"+exist);
                stmt = con.prepareStatement("select max(EditID) from EditRestaurantInfo");
                result = stmt.executeQuery();
                while (result.next()) {
                    EditID = Integer.parseInt(result.getString("max(EditID)"));
                }
                EditID++;
                stmt = con.prepareStatement("insert into EditRestaurantInfo(EditID,ResName,ResPhone,ResAddress,ResType,ResChaptcha,Result) values (" + EditID + ", '" + name + "','" + phone + "','" + address + "','" + type + "','" + chaptcha + "' , '" + "doing')");
                result1 = stmt.execute();
                if (result1) {
                    //System.out.println("失败:"+result1);
                    edit = "fail";
                } else {
                    //System.out.println("成功："+result1);
                    edit = "success";
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
        return edit;
    }

    @Override
    public ArrayList<Restaurant> GetRestaurant(String type) throws SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null,result1=null;
        ArrayList<Restaurant> restaurantArrayList=new ArrayList<>();
        String Address,Name,Type,Chaptcha,phone;
        try {
            con = daoHelper.getConnection();
            //判断该餐厅是否有未审核的修改申请
            stmt = con.prepareStatement("select * from Restaurant where RestaurantType = '" + type + "'");
            result = stmt.executeQuery();
            while(result.next()){
                ArrayList<Discount> discounts=new ArrayList<>();
                Restaurant restaurant=new Restaurant();
                Address=result.getString("RestaurantAddress");
                Name=result.getString("RestaurantName");
                Type=result.getString("RestaurantType");
                Chaptcha=result.getString("Chaptcha");
                phone=result.getString("RestaurantPhone");
                //System.out.println(Address+"::"+Name);

                stmt = con.prepareStatement("select * from Discount where ResChaptcha = '" + Chaptcha + "' and Result='success'");
                result1 = stmt.executeQuery();
                while(result1.next()){
                    Discount discount=new Discount();
                    int Full,Minus;
                    Full=result1.getInt("FullPrice");
                    Minus=result1.getInt("MinusPrice");
                    discount.setFull(Full);
                    discount.setMinus(Minus);
                    discounts.add(discount);
                }
                if(discounts.size()>1) {
                    for (int i = 0; i < discounts.size(); i++) {
                        for (int j = 0; j < discounts.size()-1;j++){
                            if(discounts.get(j).getFull()>discounts.get(j+1).getFull()){
                                int full=discounts.get(j).getFull();
                                int minus=discounts.get(j).getMinus();
                                discounts.get(j).setFull(discounts.get(j+1).getFull());
                                discounts.get(j).setMinus(discounts.get(j+1).getMinus());
                                discounts.get(j+1).setFull(full);
                                discounts.get(j+1).setMinus(minus);
                            }
                        }
                    }
                    for (int i = 0; i < discounts.size(); i++) {
                        System.out.println(discounts.get(i).getFull());
                        System.out.println(discounts.get(i).getMinus());
                    }
                }
                restaurant.setResAddress(Address);
                restaurant.setResName(Name);
                restaurant.setRestype(Type);
                restaurant.setChaptcha(Chaptcha);
                restaurant.setPhone(phone);
                restaurant.setDiscount(discounts);
                //System.out.println(restaurant);
                restaurantArrayList.add(restaurant);
                //System.out.println(restaurantArrayList);
            }
            //得到优惠
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            daoHelper.closeResult(result1);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            daoHelper.closeResult(result1);
            System.out.println(e);
            e.printStackTrace();
        }
            return restaurantArrayList;
    }

    @Override
    public ArrayList<Restaurant> GetEditBaseInfo() throws SQLException {
        return null;
    }

    @Override
    public String EditSuccess(String chaptcha) throws SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean result1=true,result5=true,result3=true,result4=true;
        String result2="";
        String resname="",resphone="",resaddress="",restype="";
        try {
            con = daoHelper.getConnection();
            //直接修改result=fail
            stmt = con.prepareStatement("update EditRestaurantInfo set Result ='success' where ResChaptcha = '"+chaptcha+"'");
            result1 = stmt.execute();
            stmt=con.prepareStatement("select ResName,ResPhone,ResAddress,ResType from EditRestaurantInfo where ResChaptcha='"+chaptcha+"'");
            result=stmt.executeQuery();
            while(result.next()){
                resname=result.getString("ResName");
                resphone=result.getString("ResPhone");
                resaddress=result.getString("ResAddress");
                restype=result.getString("ResType");
            }
            stmt = con.prepareStatement("update Restaurant set RestaurantName ='"+resname+"' where Chaptcha = '"+chaptcha+"'");
            result1 = stmt.execute();
            stmt = con.prepareStatement("update Restaurant set RestaurantPhone ='"+resphone+"' where Chaptcha = '"+chaptcha+"'");
            result3 = stmt.execute();
            stmt = con.prepareStatement("update Restaurant set RestaurantAddress ='"+resaddress+"' where Chaptcha = '"+chaptcha+"'");
            result4 = stmt.execute();
            stmt = con.prepareStatement("update Restaurant set RestaurantType ='"+restype+"' where Chaptcha = '"+chaptcha+"'");
            result5 = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            if(!result1&&!result3&&!result4&&!result5){
                result2="success";
            }else{
                result2="fail";
            }
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            System.out.println(e);
            e.printStackTrace();
        }
        return result2;
    }

    @Override
    public String EditFail(String chaptcha) throws SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean result1=true;
        String result2="";
        try {
            con = daoHelper.getConnection();
            //直接修改result=fail
            stmt = con.prepareStatement("update EditRestaurantInfo set Result ='fail' where ResChaptcha = '"+chaptcha+"'");
            result1 = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            if(!result1){
                result2="success";
            }else{
                result2="fail";
            }
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            System.out.println(e);
            e.printStackTrace();
        }
        return result2;
    }

    @Override
    public ArrayList<Restaurant> GetRestaurantInfo() throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean result1=true;
        String result2="";
        ArrayList<Restaurant> restaurantArrayList=new ArrayList<>();
        try {
            con = daoHelper.getConnection();
            //直接修改result=fail
            stmt = con.prepareStatement("select * from Restaurant order by RestaurantBalance desc;");
            result =stmt.executeQuery();
            while(result.next()){
                Restaurant restaurant=new Restaurant();
                String phone = result.getString("RestaurantPhone");
                String address = result.getString("RestaurantAddress");
                String type = result.getString("RestaurantType");
                String chaptcha = result.getString("Chaptcha");
                String name = result.getString("RestaurantName");
                restaurant.setResAddress(address);
                restaurant.setResName(name);
                restaurant.setRestype(type);
                restaurant.setChaptcha(chaptcha);
                restaurant.setPhone(phone);
                System.out.println(chaptcha);
                restaurantArrayList.add(restaurant);
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
        return restaurantArrayList;
    }
}

