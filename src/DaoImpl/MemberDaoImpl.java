package DaoImpl;

import Dao.DaoHelper;
import Dao.MemberDao;
import Entity.Member;
import Entity.Restaurant;

import java.sql.*;
import java.util.Properties;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class MemberDaoImpl implements MemberDao {
    private static DaoHelper daoHelper = DaoHelperImpl.getBaseDaoInstance();
    boolean success=false,info=false,add=false;
    @Override
    public Member isValidLogin(String membername, String password){
        Member member=new Member();
        Boolean exist=false;
        String Login="";
        String account,email,name,phone,pw;
        int level,id;
        double balance;
        // System.out.println("got context1"+con);
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        try {
            con=daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Member");
            result = stmt.executeQuery();
                    //if(result.getString("MemberPassword").equals(password)){
                while (result.next()){
                    System.out.println(result.getString("MemberName"));
                    if(membername.equals(result.getString("MemberName"))){
                        exist=true;
                        if(password.equals(result.getString("MemberPassword"))){
                            if(result.getInt("MemberUsing")==0) {
                                Login = "Success";
                                account = result.getString("MemberAccount");
                                // System.out.println(account);
                                member.setMemberAccount(account);
                                member.setMemberBalance(result.getDouble("MemberBalance"));
                                member.setMemberEmail(result.getString("MemberEmail"));
                                member.setMemberId(result.getInt("MemberId"));
                                member.setMemberName(result.getString("MemberName"));
                                member.setMemberPhone(result.getString("MemberPhone"));
                                member.setMemberLevel(result.getInt("MemberLevel"));
                                member.setMemberPassword(result.getString("MemberPassword"));
                                member.setMemberCredit(result.getInt("MemberCredit"));
                                member.setLogin(Login);
                            }else{
                                Login="The user has cancelled his account.";
                                member.setLogin(Login);
                            }
                        }else{
                           Login="Wrong Password!";
                            member.setLogin(Login);
                        }
                    }
                }
                if(!exist){
                    Login="The user is not exist";
                    member.setLogin(Login);
                }
                //}else{
                     //  System.out.println("密码错误");
                    //}
            daoHelper.closeConnection(con);
			daoHelper.closePreparedStatement(stmt);
			daoHelper.closeResult(result);

        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        return member;
    }

    @Override
    public Member getMemberAddress(String membername, int memberid) throws Exception {
        //System.out.println(membername+"~"+memberid);
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        ArrayList<String> address=new ArrayList<>();
        Member member=new Member();
        try {
            con=daoHelper.getConnection();
            stmt = con.prepareStatement("select * from MemberAddress where MemberName= '"+membername+"' and MemberId="+memberid);
            result = stmt.executeQuery();
            while(result.next()){
            //System.out.println(result.getString("MemberAddress"));
             //   System.out.println("dao:"+result.getString("MemberAddress"));
              address.add(result.getString("MemberAddress"));
            }
            member.setMemberAddress(address);
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);

        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
            return member;
    }

    @Override
    public String editMemberInfo(int id,String name, String password, String phone, String email, String account) throws Exception {
        //System.out.println(address[0]);
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        String Name="";
        try {
            con=daoHelper.getConnection();
        stmt=con.prepareStatement("select * from Member where MemberId="+id);
        result=stmt.executeQuery();
        //Name=result.getString("MemberName");
        while(result.next()) {
            Name=result.getString("MemberName");
        }

        if(Name!=name){
            stmt = con.prepareStatement("UPDATE MemberAddress Set MemberName='"+name+"' where MemberId="+id);
            info = stmt.execute();
        }
        stmt = con.prepareStatement("UPDATE Member Set MemberName='"+name+"',MemberPassword='"+password+"',MemberPhone='"+phone+"',MemberEmail='"+email+"',MemberAccount='"+account+"' where MemberId="+id);
        info = stmt.execute();
        stmt = con.prepareStatement("UPDATE Orders Set MemberName='"+name+"',MemberPhone='"+phone+"' where MemberId="+id);
        info = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);

        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        if(info){
            return "success";
        }else{
            return "fail";
        }
    }

    @Override
    public String editMemberAddress(int id,String name,String[] Address) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        int addressid=0;
        try {
            con=daoHelper.getConnection();
            stmt=con.prepareStatement("delete from MemberAddress where MemberID="+id);
            add=stmt.execute();
            System.out.println(Address);
            stmt=con.prepareStatement("select max(AddressId) from MemberAddress");
            result=stmt.executeQuery();
            while(result.next()) {
                addressid = result.getInt("max(AddressId)");
            }
            addressid++;
        //setTimeout(function x() {
            for(int i=0;i<Address.length;i++) {
                //setTimeout(x, 300);
                //得到最大的
                System.out.println(Address[i]);
                if (Address[i] != "") {
                stmt = con.prepareStatement("insert into MemberAddress(AddressId,MemberID,MemberName,MemberAddress) values (" + addressid + "," + id + ", '" + name + "','" + Address[i] + "') ");
                add = stmt.execute();
                System.out.println(add);
            }
            if(add){
                success=false;
                break;
            }
                addressid++;
        }
        //}, 300);
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        if(success){
            return "success";
        }else{
            return "fail";
        }
    }

    @Override
    public String DeleteMember(int id, String name) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        try {
            con=daoHelper.getConnection();
        stmt = con.prepareStatement("UPDATE Member Set MemberUsing = "+1+" where MemberId = "+id+" and MemberName ='"+name+"'");
        info = stmt.execute();
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
        } catch (SQLException e) {
            daoHelper.closeConnection(con);
            daoHelper.closePreparedStatement(stmt);
            daoHelper.closeResult(result);
            e.printStackTrace();
        }
        if(info){
            return "success";
        }else{
            return "fail";
        }
    }

    @Override
    public String Register(String name, String phone, String password, String email, String address) throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean exist=false,result2,result3;
        String result1="";
        int id=0,addressid=0;
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Member ");
            result = stmt.executeQuery();
            //System.out.println(name.toString() + "//" + phone + "//" + address + "//" + type);
            while (result.next()) {
                if (result.getString("MemberEmail").equals(email)) {
                    exist = true;
                    break;
                }
            }
            if(exist){
                result1="该用户已存在";
            }else{
                stmt = con.prepareStatement("select max(MemberId) from Member");
                result = stmt.executeQuery();
                while(result.next()){
                  id=result.getInt("max(MemberId)");
                  id=id+1;
                }
                stmt = con.prepareStatement("insert into Member(MemberId,MemberName,MemberEmail,MemberPhone,MemberPassword,MemberBalance,MemberLevel,MemberCredit,MemberUsing,MemberAccount) values (" + id + "," + "'"+name+"','" + email + "','" + phone + "','" + password + "'," + 1000 + "," + 0 +","+0+", '"+0+"',"+phone+")");
                result2 = stmt.execute();
                stmt = con.prepareStatement("select max(AddressId) from MemberAddress");
                result = stmt.executeQuery();
                while(result.next()){
                    addressid=result.getInt("max(AddressId)");
                    addressid=addressid+1;
                }
                stmt = con.prepareStatement("insert into MemberAddress(AddressId,MemberID,MemberName,MemberAddress) values (" + addressid + ","+id+", '" + name + "','" + address + "')");
                result3 = stmt.execute();
                if(!result2&&!result3){
                    result1="注册已完成";
                }else{
                    result1="注册失败";
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
        return result1;
    }

    @Override
    public Member getmemberinfo(int id) throws Exception {
        Connection con=null;
        PreparedStatement stmt=null;
        ResultSet result=null;
        Member member=new Member();
        try {
            con = daoHelper.getConnection();
            stmt = con.prepareStatement("select * from Member where MemberId ="+id+";");
            result=stmt.executeQuery();
            while(result.next()){
                member.setMemberCredit(result.getInt("MemberCredit"));
                member.setMemberLevel(result.getInt("MemberLevel"));
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
        return member;
    }

    @Override
    public ArrayList<Member> GetMemberInfo() throws Exception {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet result = null;
        boolean result1=true;
        String result2="";
        ArrayList<Member> memberArrayList=new ArrayList<>();
        try {
            con = daoHelper.getConnection();
            //直接修改result=fail
            stmt = con.prepareStatement("select * from Member order by MemberBalance desc;");
            result =stmt.executeQuery();
            while(result.next()){
                Member member=new Member();
                String phone = result.getString("MemberPhone");
                int id = result.getInt("MemberId");
                int level = result.getInt("MemberLevel");
                int credit = result.getInt("MemberCredit");
                String name = result.getString("MemberName");
                String email = result.getString("MemberEmail");
                member.setMemberId(id);
                member.setMemberLevel(level);
                member.setMemberCredit(credit);
                member.setMemberPhone(phone);
                member.setMemberName(name);
                member.setMemberEmail(email);
                memberArrayList.add(member);
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
        return memberArrayList;
    }
    //得到member的信息
}
