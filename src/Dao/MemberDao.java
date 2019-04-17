package Dao;

import Entity.Member;

import java.util.ArrayList;

public interface MemberDao {
    public Member isValidLogin(String membername,String password) throws Exception;
    public Member getMemberAddress(String memberanem,int memberid) throws Exception;
    public String editMemberInfo(int id,String name, String password, String phone, String email, String account) throws Exception;
    public String editMemberAddress(int id,String name,String[] Address) throws Exception;
    public String DeleteMember(int id,String name) throws Exception;
    public String Register(String name, String phone, String password, String email, String address) throws Exception;
    public Member getmemberinfo(int id) throws Exception;
    //花费前八的会员
    public ArrayList<Member> GetMemberInfo()throws Exception;
}
