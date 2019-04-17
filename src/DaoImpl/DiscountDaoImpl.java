package DaoImpl;

import Dao.DaoHelper;
import Dao.DiscountDao;
import Entity.Discount;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DiscountDaoImpl implements DiscountDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    private boolean success=true,fail=true;
    @Override
    public ArrayList<Discount> GetRestaurantDiscount(String Chaptcha) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        ArrayList<Discount> discounts= new ArrayList<Discount>();
        ArrayList<Discount> Discounts= new ArrayList<Discount>();
        String Result;
        int FullPrice,MinusPrice;
        try {
            con = daoHelper.getConnection();
            stmt=con.prepareStatement("Select * From Discount Where ResChaptcha = '"+Chaptcha+"';");
            result=stmt.executeQuery();
            while(result.next()){
                Discount discount=new Discount();
                //System.out.println("FullPrice:"+result.getInt("FullPrice"));
                //System.out.println("MinusPrice:"+result.getInt("MinusPrice"));
                //System.out.println("Result:"+result.getString("Result"));
                FullPrice=result.getInt("FullPrice");
                MinusPrice=result.getInt("MinusPrice");
                Result=result.getString("Result");
                discount.setFull(FullPrice);
                discount.setMinus(MinusPrice);
                discount.setResult(Result);
                Discounts.add(discount);
            }
            if(Discounts.size()>1) {
                for (int i = 0; i < Discounts.size(); i++) {
                    for (int j = 0; j < Discounts.size()-1;j++){
                        if(Discounts.get(j).getFull()>Discounts.get(j+1).getFull()){
                            int full=Discounts.get(j).getFull();
                            int minus=Discounts.get(j).getMinus();
                            Discounts.get(j).setFull(Discounts.get(j+1).getFull());
                            Discounts.get(j).setMinus(Discounts.get(j+1).getMinus());
                            Discounts.get(j+1).setFull(full);
                            Discounts.get(j+1).setMinus(minus);
                        }
                    }
                }
                /*
                for (int i = 0; i < Discounts.size(); i++) {
                    System.out.println(Discounts.get(i).getFull());
                    System.out.println(Discounts.get(i).getMinus());
                }
                */
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
        /*
        System.out.println(discounts.get(0).getFull());
        System.out.println(discounts.get(0).getMinus());
        System.out.println(discounts.get(0).getResult());
        System.out.println(discounts.get(1).getFull());
        System.out.println(discounts.get(1).getMinus());
        System.out.println(discounts.get(1).getResult());
        */
        return Discounts;
    }

    @Override
    public ArrayList<String> AddRestaurantDiscount(String FullPrice, String MinusPrice,String chaptcha) throws Exception {
        //检查是否有重复的
        //没有重复的插入，返回
        Connection con = null;
        PreparedStatement stmt = null;
        con = daoHelper.getConnection();
        ResultSet result=null;
        boolean exist=false;
        boolean add=false;
        int DiscountID=0;
       ArrayList<String> Result=new ArrayList<>();
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("select * from Discount where ResChaptcha = '"+chaptcha+"'");
            result=stmt.executeQuery();
            while(result.next()){
                String full=result.getInt("FullPrice")+"";
                System.out.println(full);
                String minus=result.getInt("MinusPrice")+"";
                if(FullPrice.equals(full)){
                    Result.add(FullPrice);
                    exist=true;
                    break;
                }else{
                }
            }
            if(!exist){
                //插入数据
                stmt=con.prepareStatement("select Max(DiscountID) from Discount");
                result=stmt.executeQuery();
                while(result.next()){
                    DiscountID=result.getInt("Max(DiscountID)");
                    DiscountID=DiscountID+1;
                }
                stmt=con.prepareStatement("insert into Discount(DiscountID,ResChaptcha,FullPrice,MinusPrice,Result) VALUES ("+DiscountID+",'"+chaptcha+"',"+Integer.parseInt(FullPrice)+","+Integer.parseInt(MinusPrice)+",'success')");
                add=stmt.execute();
                if(!add){
                    Result.add("fail");
                }else{
                    Result.add("success");
                }
            }
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            e.printStackTrace();
        }
        return Result;
    }

    @Override
    public ArrayList<Discount> CheckDiscount() throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        Discount discount=new Discount();
        ArrayList<Discount> discounts=new ArrayList<>();
        String chaptcha,ID;
        int full,minus;
        try {
            con = daoHelper.getConnection();
            stmt=con.prepareStatement("Select * From Discount Where Result = 'doing'");
            result=stmt.executeQuery();
            while(result.next()) {
                ID=result.getString("DiscountID");
                chaptcha=result.getString("ResChaptcha");
                full=result.getInt("FullPrice");
                minus=result.getInt("MinusPrice");
                discount.setMinus(minus);
                discount.setFull(full);
                discount.setChaptcha(chaptcha);
                discounts.add(discount);
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

                return discounts;
    }

    @Override
    public boolean SuccessDiscount(int fullprice, int minusprice, String chaptcha,int ID) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("update Discount SET Result ='success' WHERE DiscountID = " + ID + ";");
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
    public boolean FailDiscount(int fullprice, int minusprice, String chaptcha,int ID) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("update Discount SET Result ='fail' WHERE DiscountID = " + ID + ";");
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
    public boolean DeleteDiscount(String chaptcha,int full,int minus)throws Exception{
        Connection con = null;
        PreparedStatement stmt = null;
        boolean delete=true;
        System.out.println(chaptcha);
        System.out.println(full);
        System.out.println(minus);
        while(chaptcha.length()<7){
            chaptcha="0"+chaptcha;
        }
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("delete from Discount WHERE ResChaptcha = '" + chaptcha + "' and FullPrice = "+full+" and MinusPrice = "+minus+";");
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
